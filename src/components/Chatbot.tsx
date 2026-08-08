import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface QuickReply {
  label: string;
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
      keywords: ['skills', 'technologies', 'stack', 'languages', 'tools'],
      response: "Aqib is a Full-Stack developer. His core stack includes React, React Native, Node.js (Express), PHP (Laravel), and MySQL. He also works with TypeScript, TailwindCSS, and Cloud/API solutions!"
    },
    {
      label: '📞 Contact Details',
      keywords: ['contact', 'email', 'phone', 'call', 'message', 'reach'],
      response: "You can reach Aqib via email at aqibmansoor40@gmail.com or call/WhatsApp at +92 318 5952411. He's also active on LinkedIn: https://www.linkedin.com/in/aqib248"
    },
    {
      label: '💼 Availability',
      keywords: ['freelance', 'work', 'hire', 'job', 'available', 'project'],
      response: "Yes! Aqib is currently open to full-time opportunities, freelance contracts, and web/mobile app development projects. Let's connect to discuss your ideas!"
    },
    {
      label: '📍 Location',
      keywords: ['location', 'where', 'country', 'city', 'live'],
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

    // Analyze the message to find the best match
    const cleanText = userText.toLowerCase();
    let bestMatch: QuickReply | null = null;

    for (const reply of quickReplies) {
      const match = reply.keywords.some((keyword) => cleanText.includes(keyword));
      if (match) {
        bestMatch = reply;
        break;
      }
    }

    const botResponse = bestMatch 
      ? bestMatch.response 
      : "I'm a simple assistant, but I can tell you that Aqib is a Full-Stack developer specializing in React, Node.js, and Laravel. You can ask me about his 'skills', 'contact details', 'location', or 'availability'! Or feel free to drop him an email directly at aqibmansoor40@gmail.com.";

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      handleSendMessage(botResponse, 'bot');
    }, 1200);
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
                onClick={() => handleSendMessage(qr.label.replace(/[^a-zA-Z0-9\s/]/g, '').trim())}
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
