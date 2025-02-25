import axios from 'axios';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, questionContext, systemPrompt } = req.body;
    
    // Construct message to send to Claude
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `[Question ${questionContext.questionNumber}]
${questionContext.questionText}

Options:
A. ${questionContext.options[0]}
B. ${questionContext.options[1]}
C. ${questionContext.options[2]}
D. ${questionContext.options[3]}

This is a ${questionContext.questionType} question.

User's question: ${message}`
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );
    
    res.status(200).json({ response: response.data.content[0].text });
  } catch (error) {
    console.error('Error calling Claude API:', error.message);
    // Return a more detailed error message for debugging
    res.status(500).json({ 
      error: 'Failed to get response from Claude',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
} 