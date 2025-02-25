import React, { useState, useRef, useEffect } from 'react';
import '../styles/StudyHelper.css';

// Define proper types for the question object
interface QuestionOption {
  options: string[];
  question: string;
  correctAnswer: string;
  explanation: string[];
}

interface StudyHelperProps {
  currentQuestion: QuestionOption;
  questionIndex: number;
}

const StudyHelper: React.FC<StudyHelperProps> = ({ currentQuestion, questionIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'assistant'}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Add welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hi there! I'm your SAT strategy assistant. I can help explain question-solving techniques, heuristics, and strategies for this section. What would you like help with?",
          sender: 'assistant'
        }
      ]);
    }
  }, [isOpen, messages.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = input.trim();
    setMessages([...messages, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Prepare context about the current question to send to the API
      const questionContext = {
        questionText: currentQuestion.question,
        questionNumber: questionIndex + 1,
        questionType: currentQuestion.explanation[0].replace("<strong>", "").replace("</strong>", ""),
        options: currentQuestion.options,
        correctAnswer: currentQuestion.correctAnswer
      };
      
      // Development fallback if needed
      if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_SIMULATION === 'true') {
        console.log("Development mode: Using simulated responses");
        setTimeout(() => {
          const simulatedResponse = getSimulatedResponse(userMessage, currentQuestion);
          setMessages(prev => [...prev, { text: simulatedResponse, sender: 'assistant' }]);
          setIsLoading(false);
        }, 1500);
        return;
      }
      
      // Make API request to Claude - using the absolute URL to the server API endpoint
      console.log("Calling Claude API via server endpoint");
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/chat';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          questionContext,
          systemPrompt: `You are an expert SAT tutor specializing in strategic approaches to test-taking.
          Your goal is to help students understand the underlying patterns and heuristics that make questions predictable and easy to solve.
          Focus on teaching time-saving shortcuts, pattern recognition, and strategic elimination techniques rather than just content knowledge.
          
          When explaining strategies:
          - Emphasize pattern recognition 
          - Teach elimination techniques
          - Show how to save time with shortcuts
          - Point out common traps students fall into
          - Provide concrete step-by-step approaches
          
          Be encouraging, engaging, and use relatable examples to make your explanations memorable.
          Your responses should be concise yet thorough, around 3-4 paragraphs maximum.
          
          For the current SAT Writing question about "${questionContext.questionType}", provide specific heuristics that apply.`
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.response) {
        throw new Error('No response data received from API');
      }
      
      // Add assistant's response to chat
      setMessages(prev => [...prev, { text: data.response, sender: 'assistant' }]);
    } catch (error) {
      console.error('Error calling Claude API:', error);
      
      // Provide a user-friendly error message with proper type checking
      setMessages(prev => [...prev, { 
        text: `I'm having trouble connecting to my brain right now. Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 
        sender: 'assistant' 
      }]);
      
      // Then add a follow-up message with generic help
      setTimeout(() => {
        const genericHelp = getGenericHelpForQuestionType(currentQuestion);
        setMessages(prev => [...prev, { 
          text: genericHelp, 
          sender: 'assistant' 
        }]);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to provide generic advice when API is unavailable
  const getGenericHelpForQuestionType = (question: QuestionOption) => {
    const questionType = question.explanation[0].replace("<strong>", "").replace("</strong>", "");
    
    if (questionType.includes("Vocabulary in Context")) {
      return "For vocabulary in context questions, try replacing the word with each answer choice and see which one maintains the meaning. Don't rely on dictionary definitions alone - context is key!";
    } else if (questionType.includes("Sentence Boundaries")) {
      return "When dealing with sentence boundaries, check if each sentence has both a subject and a verb. Watch for fragments, run-ons, and comma splices. These are the most common sentence structure errors tested.";
    } else if (questionType.includes("Transitions")) {
      return "For transitions, focus on the relationship between the sentences before and after the transition. Is it a contrast, cause/effect, example, or continuation? Match this relationship to the appropriate transition word.";
    } else {
      return "Remember to use the process of elimination and look for patterns. SAT questions often test the same concepts in predictable ways!";
    }
  };

  // Simulated responses for demo/development without API
  const getSimulatedResponse = (userMessage: string, question: QuestionOption) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes("hint") || lowerCaseMessage.includes("help")) {
      return "Look for keywords in the passage that give context clues about the meaning. What action is the city council taking regarding the bridge? Are they stopping it or allowing it to move forward?";
    } else if (lowerCaseMessage.includes("strategy") || lowerCaseMessage.includes("approach")) {
      return "For vocabulary-in-context questions, always replace the word with each answer choice in the sentence. The correct answer should maintain both the grammatical structure and the intended meaning of the sentence.";
    } else if (lowerCaseMessage.includes("hard") || lowerCaseMessage.includes("difficult")) {
      return "This type of question can be tricky because 'sanctioned' has two almost opposite meanings! It can mean 'approved' or 'punished'. That's why context is crucial - look at what the city council is doing overall.";
    } else {
      return "To solve this efficiently, replace 'sanctioned' with each answer choice and see which one makes sense in context. Since the passage mentions 'citing economic benefits', the city council is likely approving rather than punishing the construction.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="study-helper">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Strategy Assistant</h3>
            <button className="close-button" onClick={toggleChat}>×</button>
          </div>
          <div className="chat-messages" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="message assistant loading">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask about strategy or this question..."
              disabled={isLoading}
            />
            <button onClick={sendMessage} disabled={isLoading || !input.trim()}>
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
      <button 
        className={`chat-toggle ${isOpen ? 'open' : ''}`} 
        onClick={toggleChat}
        aria-label="Strategy Assistant"
      >
        {isOpen ? '✕' : '?'}
      </button>
    </div>
  );
};

export default StudyHelper; 