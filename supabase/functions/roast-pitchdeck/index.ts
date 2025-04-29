
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a Supabase client
const supabaseUrl = "https://rezxqmrmoauenjzfqmmw.supabase.co";
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Get OpenAI API key from environment variable
const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || '';
if (!openAIApiKey) {
  console.error("OpenAI API key not found!");
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pitchdeckId } = await req.json();
    
    if (!pitchdeckId) {
      return new Response(JSON.stringify({ error: "Missing pitch deck ID" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Fetch the pitch deck information
    const { data: pitchdeck, error: fetchError } = await supabaseAdmin
      .from('uploaded_pitchdecks')
      .select('*')
      .eq('id', pitchdeckId)
      .single();

    if (fetchError || !pitchdeck) {
      console.error("Error fetching pitch deck:", fetchError);
      return new Response(JSON.stringify({ error: "Pitch deck not found" }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create a Jean de la Rochebrochard-inspired prompt
    const prompt = `
    You are Jean de La Rochebrochard, the CEO of Kima Ventures, known for your direct, no-nonsense approach to pitch deck reviews.
    
    As Jean, you're blunt, sometimes sarcastic, and you've seen thousands of pitch decks, so you can immediately spot the BS. You focus on substance over style and have no patience for inflated metrics, vague value propositions, or unrealistic business plans.
    
    You're reviewing a pitch deck for "${pitchdeck.file_path?.split('-').slice(1).join('-') || 'Unknown Startup'}" and need to provide brutally honest feedback in your distinctive voice.
    
    Address these key areas with your characteristic directness:
    - Executive Summary: Cut through the fluff and tell them if their core proposition makes any sense.
    - Market Size: Challenge any inflated TAM claims - you hate the "if we get 1% of China" approach.
    - Competitive Analysis: Point out competitors they've conveniently ignored or advantages they've overstated.
    - Go-to-Market Strategy: Evaluate if they have a realistic plan or just wishful thinking.
    - Financial Projections: Call out hockey stick projections without solid backing.
    - Team: Assess whether they have relevant experience or just fancy titles.
    
    For each area, provide:
    1. A brutally honest critique in Jean's voice - direct, sometimes cutting, but always substantive
    2. A straightforward tip on how to improve - you're tough, but you want founders to succeed if they have something real
    
    Your tone is skeptical, direct, and occasionally witty, but with practical advice. You sound like a busy VC who has no time to waste on pleasantries but wants to see good companies succeed.
    `;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',  // Using a more powerful model for better mimicry
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: 'Please review this pitch deck as Jean de La Rochebrochard of Kima Ventures.' }
        ],
        temperature: 0.9, // Higher temperature for more character-specific output
        max_tokens: 1000, // Allow for longer, more detailed feedback
      }),
    });

    const openaiData = await response.json();
    
    if (!openaiData.choices || openaiData.choices.length === 0) {
      console.error("OpenAI API error:", openaiData);
      return new Response(JSON.stringify({ error: "Failed to generate roast" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get the AI assistant's response
    const roastContent = openaiData.choices[0].message.content;

    // Structure the roast feedback
    const structuredRoast = {
      summary: roastContent.substring(0, 200) + "...", // Short preview
      fullRoast: roastContent,
      sections: [
        "Executive Summary",
        "Market Size",
        "Competitive Analysis",
        "Go-to-Market Strategy", 
        "Financial Projections",
        "Team"
      ].map(section => {
        const sectionPattern = new RegExp(`${section}[:\\s]+(.*?)(?=(?:${[
          "Executive Summary",
          "Market Size",
          "Competitive Analysis",
          "Go-to-Market Strategy",
          "Financial Projections",
          "Team"
        ].join('|')})|$)`, 'si');
        
        const match = roastContent.match(sectionPattern);
        const feedback = match ? match[1].trim() : `No specific feedback for ${section}`;
        
        // Extract the Pro Tip if it exists
        let tip = '';
        if (feedback) {
          const tipMatch = feedback.match(/Pro [Tt]ip:?\s*(.*?)(?=\n|$)/s) || 
                          feedback.match(/Tip:?\s*(.*?)(?=\n|$)/s);
          tip = tipMatch ? tipMatch[1].trim() : `Improve your ${section.toLowerCase()} with more concrete data and clear explanations.`;
        }
        
        return {
          section,
          feedback: feedback.replace(/Pro [Tt]ip:?\s*(.*?)(?=\n|$)/g, '').trim(),
          tip
        };
      })
    };

    // Save the roast to the database
    const { data: savedRoast, error: saveError } = await supabaseAdmin
      .from('ai_roasts')
      .insert({
        pitchdeck_id: pitchdeckId,
        roast_content: structuredRoast
      })
      .select();

    if (saveError) {
      console.error("Error saving roast:", saveError);
      return new Response(JSON.stringify({ error: "Failed to save roast" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      roast: structuredRoast,
      id: savedRoast[0].id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error in roast-pitchdeck function:", error);
    return new Response(JSON.stringify({ error: error.message || "Unknown error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
