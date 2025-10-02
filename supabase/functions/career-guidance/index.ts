import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, studentData } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'API configuration error. Please contact support.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const fullPrompt = `You are an AI Career Guidance Counselor. Based on the following student profile, provide personalized career advice for their question.

Student Profile:
- Name: ${studentData.name}
- Education: ${studentData.education}
- Interests: ${studentData.interests.join(", ")}
- Skills: ${studentData.skills.join(", ")}
- Career Goals: ${studentData.careerGoals}

Student Question: ${prompt}

Please provide a helpful, encouraging, and specific response that addresses their question while considering their profile. Keep the response conversational and actionable.`;

    console.log('Calling Gemini API with prompt length:', fullPrompt.length);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status}`, errorText);
      return new Response(
        JSON.stringify({ error: `AI service error: ${response.status}` }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    const generatedText = data.candidates[0]?.content?.parts[0]?.text || 
      "I apologize, but I couldn't generate a response at this time. Please try again.";

    console.log('Successfully generated response, length:', generatedText.length);

    return new Response(
      JSON.stringify({ generatedText }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in career-guidance function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
