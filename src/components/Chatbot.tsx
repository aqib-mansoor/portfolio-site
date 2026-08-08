import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface QuickReply {
  label: string;
  queryText: string;
  keywords: string[];
  response: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi there! 👋 I'm Aqib's Virtual Assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies: QuickReply[] = [
    {
      label: '🚀 Core Skills',
      queryText: 'What are your core skills?',
      keywords: ['skills', 'technologies', 'stack', 'languages', 'tools', 'react', 'node', 'laravel', 'php', 'javascript', 'typescript', 'database', 'mysql', 'mongodb'],
      response: "Aqib is a Full-Stack developer. His core stack includes React, React Native, Node.js (Express), PHP (Laravel), and MySQL. He also works with TypeScript, TailwindCSS, and Cloud/API solutions!"
    },
    {
      label: '📞 Contact Details',
      queryText: 'How can I contact you?',
      keywords: ['contact', 'email', 'phone', 'call', 'message', 'reach', 'gmail', 'linkedin', 'github'],
      response: "You can reach Aqib via email at aqibmansoor40@gmail.com or call/WhatsApp at +92 318 5952411. He's also active on LinkedIn: https://www.linkedin.com/in/aqib248 and GitHub: https://github.com/aqib248"
    },
    {
      label: '💼 Availability',
      queryText: 'Are you available for work?',
      keywords: ['freelance', 'work', 'hire', 'job', 'available', 'project', 'contract', 'opportunities'],
      response: "Yes! Aqib is currently open to full-time opportunities, freelance contracts, and web/mobile app development projects. Let's connect to discuss your ideas!"
    },
    {
      label: '📍 Location',
      queryText: 'Where are you located?',
      keywords: ['location', 'where', 'country', 'city', 'live', 'pakistan', 'rawalpindi'],
      response: "Aqib is based in Rawalpindi, Pakistan, and is comfortable working remotely with global clients across different time zones."
    }
  ];

  const handleSendMessage = (text: string, sender: 'user' | 'bot' = 'user') => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender,
      text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMessage]);

    if (sender === 'user') {
      simulateBotResponse(text);
    }
  };

  const simulateBotResponse = (userText: string) => {
    setIsTyping(true);

    const cleanText = userText.toLowerCase().trim();

    // 1. Greeting check
    const greetings = ['hi', 'hello', 'hey', 'hola', 'greetings', 'morning', 'afternoon', 'sup', 'yo'];
    const isGreeting = greetings.some(g => {
      const regex = new RegExp(`\\b${g}\\b`, 'i');
      return regex.test(cleanText);
    });

    // 2. Help check
    const helpWords = ['help', 'what can you do', 'features', 'option', 'guide'];
    const isHelp = helpWords.some(h => cleanText.includes(h));

    // 3. Projects check
    const projectWords = ['project', 'portfolio', 'work', 'apps', 'websites', 'nexus', 'crypto', 'foodie', 'delivery', 'apply daddy', 'bannu gul', 'show me'];
    const isProjects = projectWords.some(p => cleanText.includes(p));

    // 4. Experience check
    const experienceWords = ['experience', 'resume', 'history', 'job', 'company', 'worked', 'background', 'career', 'education', 'studies'];
    const isExperience = experienceWords.some(e => cleanText.includes(e));

    let botResponse = '';

    if (isGreeting) {
      botResponse = "Hello! 👋 I'm Aqib's virtual assistant. I can tell you about his skills, projects, work experience, location, or how to contact him. How can I help you today?";
    } else if (isHelp) {
      botResponse = "I'm here to help you learn more about Aqib! You can ask me about:\n• 🚀 His Core Skills & Tech Stack\n• 💻 His Key Projects & portfolio details\n• 💼 His Availability for hire/freelance\n• 📍 His Location & timezone\n• 📞 How to Contact him";
    } else if (isProjects) {
      botResponse = "Aqib has built several impressive projects including:\n• Nexus Crypto Hub (Real-time tracking with GSAP & CoinGecko)\n• FoodieExpress (Full multi-vendor delivery system with Customer, Vendor, Rider & Admin apps)\n• Apply Daddy (Automated job tracker)\n• Bannu Gul BP (Restaurant system)\n\nYou can view details on the 'Projects' tab! Which one would you like to discuss?";
    } else if (isExperience) {
      botResponse = "Aqib is a skilled Full-Stack developer who builds responsive, fast, and easy-to-use applications. He has hands-on experience designing databases, building APIs, and launching apps. You can view his complete education and work history on the 'Resume' tab!";
    } else {
      // Check quick replies keywords
      let bestMatch: QuickReply | null = null;
      for (const reply of quickReplies) {
        const match = reply.keywords.some((keyword) => cleanText.includes(keyword));
        if (match) {
          bestMatch = reply;
          break;
        }
      }

      botResponse = bestMatch 
        ? bestMatch.response 
        : "I'm a simple assistant, but I can tell you that Aqib is a Full-Stack developer specializing in React, Node.js, and Laravel. You can ask me about his 'skills', 'projects', 'contact details', 'location', or 'availability'! Or feel free to email him directly at aqibmansoor40@gmail.com.";
    }

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      handleSendMessage(botResponse, 'bot');
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      {/* Chat window */}
      {isOpen && (
        <div className="chat-window" role="dialog" aria-label="Chat assistant">
          <div className="chat-header">
            <div className="bot-profile">
              <div className="bot-avatar-wrapper">
                <img src="/assets/images/my-avatar.png" alt="Aqib Mansoor" className="bot-avatar" />
                <span className="online-indicator"></span>
              </div>
              <div className="bot-info">
                <h4>Aqib Mansoor (AI)</h4>
                <p>Online</p>
              </div>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                <p className="message-text">{msg.text}</p>
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            
            {isTyping && (
              <div className="message-bubble bot typing">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Grid */}
          <div className="quick-replies-container">
            {quickReplies.map((qr, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onClick={() => handleSendMessage(qr.queryText)}
              >
                {qr.label}
              </button>
            ))}
          </div>

          <form 
            className="chat-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (inputValue.trim()) {
                handleSendMessage(inputValue);
                setInputValue('');
              }
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="chat-input"
              aria-label="Message text input"
            />
            <button type="submit" className="send-btn" aria-label="Send message">
              <ion-icon name="send-outline" aria-hidden="true"></ion-icon>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        className={`chatbot-fab ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
        ) : (
          <div className="fab-content">
            <img src="/assets/images/3d-bot.png" alt="Chat Assistant" className="bot-img-icon" />
            <span className="fab-pulse"></span>
          </div>
        )}
      </button>
    </div>
  );
};
