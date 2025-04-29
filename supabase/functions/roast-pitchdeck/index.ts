
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

// The Assistant ID should come from an environment variable
// This way you can easily switch to a different assistant as you improve it
const assistantId = Deno.env.get('OPENAI_ASSISTANT_ID') || '';
if (!assistantId) {
  console.error("OpenAI Assistant ID not found!");
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

    const fileName = pitchdeck.file_path?.split('-').slice(1).join('-') || 'Unknown Startup';
    
    // Start a new thread
    const threadResponse = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v1'
      },
      body: JSON.stringify({})
    });
    
    if (!threadResponse.ok) {
      const errorData = await threadResponse.text();
      console.error("Thread creation error:", errorData);
      return new Response(JSON.stringify({ error: "Failed to create thread" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const threadData = await threadResponse.json();
    const threadId = threadData.id;
    
    console.log("Created thread:", threadId);
    
    // Add a message to the thread
    const messageResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v1'
      },
      body: JSON.stringify({
        role: "user",
        content: `I need you to roast my pitch deck for "${fileName}". 
Please provide brutally honest feedback on these key areas:
- Executive Summary
- Market Size
- Competitive Analysis
- Go-to-Market Strategy
- Financial Projections
- Team

Each area should have a critique and a tip for improvement.`
      })
    });
    
    if (!messageResponse.ok) {
      const errorData = await messageResponse.text();
      console.error("Message creation error:", errorData);
      return new Response(JSON.stringify({ error: "Failed to create message" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    console.log("Added message to thread");
    
    // Run the assistant on the thread
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v1'
      },
      body: JSON.stringify({
        assistant_id: assistantId
      })
    });
    
    if (!runResponse.ok) {
      const errorData = await runResponse.text();
      console.error("Run creation error:", errorData);
      return new Response(JSON.stringify({ error: "Failed to run assistant" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const runData = await runResponse.json();
    const runId = runData.id;
    
    console.log("Started run:", runId);
    
    // Poll for completion
    let runStatus = runData.status;
    let maxAttempts = 60; // 5 minutes maximum (checking every 5 seconds)
    let attempts = 0;
    
    while (runStatus !== "completed" && runStatus !== "failed" && runStatus !== "expired" && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      const checkRunResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v1'
        }
      });
      
      if (!checkRunResponse.ok) {
        console.error("Error checking run status");
        attempts++;
        continue;
      }
      
      const checkRunData = await checkRunResponse.json();
      runStatus = checkRunData.status;
      console.log("Run status:", runStatus);
      attempts++;
    }
    
    if (runStatus !== "completed") {
      console.error("Run did not complete successfully. Final status:", runStatus);
      return new Response(JSON.stringify({ error: "Assistant did not complete the analysis" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Get the messages (the response)
    const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v1'
      }
    });
    
    if (!messagesResponse.ok) {
      const errorData = await messagesResponse.text();
      console.error("Error fetching messages:", errorData);
      return new Response(JSON.stringify({ error: "Failed to retrieve assistant response" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const messagesData = await messagesResponse.json();
    
    // Get the assistant's response (the last message from the assistant)
    const assistantMessages = messagesData.data.filter(msg => msg.role === "assistant");
    
    if (assistantMessages.length === 0) {
      return new Response(JSON.stringify({ error: "No response from assistant" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Get the most recent assistant message
    const assistantMessage = assistantMessages[0];
    
    // Extract the content from the message
    const roastContent = assistantMessage.content[0].text.value;
    
    // Structure the roast feedback
    // This is similar to the previous implementation but uses the assistant's response
    const fullRoast = roastContent;
    
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
        // Try to find this section in the roast content
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
        
        // Extract the tip if it exists
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
