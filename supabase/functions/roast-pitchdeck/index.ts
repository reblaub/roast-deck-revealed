
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

    // Create a prompt for the AI assistant
    const prompt = `
    You are a brutally honest VC (venture capitalist) reviewing a startup pitch deck. 
    Your job is to critically assess and humorously roast the pitch deck of the startup.
    
    Be specific, witty, blunt but also constructive. Focus on these key areas:
    - Executive Summary: Is it clear what the business does? Is the value proposition compelling?
    - Market Size: Are TAM/SAM/SOM calculations reasonable or outlandishly optimistic?
    - Competitive Analysis: Have they missed obvious competitors or overestimated their advantages?
    - Go-to-Market Strategy: Is the strategy realistic or just wishful thinking?
    - Financial Projections: Are the numbers believable or pure fantasy?
    - Team: Do they have relevant experience or are they overconfident beginners?
    
    For each area, provide:
    1. A brutal but humorous critique
    2. A helpful tip on how to improve
    
    Your tone should be scathingly funny but with actual substance - like a comedy roast that teaches.
    Remember, you're roasting a pitch deck for a startup called "${pitchdeck.file_path?.split('-').slice(1).join('-') || 'Unknown Startup'}".
    `;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using a cost-effective model
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: 'Please roast this pitch deck thoroughly and humorously.' }
        ],
        temperature: 0.8, // Add some creativity
        max_tokens: 800, // Limit response length
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
        return {
          section,
          feedback: match ? match[1].trim() : `No specific feedback for ${section}`,
          tip: `Tip for improving ${section}...` // Default tip
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
