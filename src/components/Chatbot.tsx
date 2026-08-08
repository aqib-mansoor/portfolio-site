import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_qyxo0t7';
const EMAILJS_NOTIFY_TEMPLATE = 'template_ok5gzzn';
const EMAILJS_REPLY_TEMPLATE = 'template_w03n8bv';
const EMAILJS_PUBLIC_KEY = 'odOHlRNwPe0NnIw5t';

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

interface ChatbotProps {
  setActiveTab?: (tab: string) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default to muted so audio doesn't startle
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Conversational Form States
  const [formStep, setFormStep] = useState<'idle' | 'name' | 'email' | 'message' | 'confirm'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
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
      keywords: ['contact', 'email', 'phone', 'call', 'message', 'reach', 'gmail', 'linkedin', 'github', 'hire'],
      response: "You can reach Aqib via email at aqibmansoor40@gmail.com or call/WhatsApp at +92 318 5952411. He's also active on LinkedIn: https://www.linkedin.com/in/aqib248 and GitHub: https://github.com/aqib-mansoor"
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

  // Set up Speech Recognition (Web Speech API)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        // Automatically send after capturing voice
        setTimeout(() => {
          handleSendMessage(transcript);
        }, 500);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Text to Speech
  const speakText = (text: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    // Clean text: strip URLs and special Markdown symbols
    const cleanText = text
      .replace(/https?:\/\/[^\s]+/g, '')
      .replace(/[#*•_]/g, '')
      .trim();
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    window.speechSynthesis.speak(utterance);
  };

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
      if (formStep !== 'idle') {
        handleFormStep(text);
      } else {
        simulateBotResponse(text);
      }
    } else {
      // Speak bot responses if audio is not muted
      speakText(text);
    }
  };

  // Gemini API helper call
  const callGeminiAPI = async (userText: string): Promise<string | null> => {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!GEMINI_API_KEY) return null;

    const models = ['gemini-flash-latest', 'gemini-3.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

    for (const model of models) {
      try {
        const systemInstruction = `You are Aqib Mansoor's virtual assistant. Aqib is a Full-Stack developer based in Rawalpindi, Pakistan. 
His tech stack includes React, React Native, Node.js (Express), PHP (Laravel), MySQL, TypeScript, TailwindCSS.
Key projects: 
- Nexus Crypto Hub (Real-time crypto tracker with GSAP/CoinGecko)
- FoodieExpress (Multi-vendor delivery system with Customer, Vendor, Rider and Admin applications)
- Apply Daddy (Automated job tracker)
- Bannu Gul BP (Restaurant system)
His email is aqibmansoor40@gmail.com. Phone/WhatsApp is +92 318 5952411.
LinkedIn: https://www.linkedin.com/in/aqib248
GitHub: https://github.com/aqib-mansoor
He is open to full-time work, remote contracts, and freelance projects.
Keep your answers professional, friendly, and concise. Short answers are preferred.`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: systemInstruction },
                  { text: `User message: ${userText}` }
                ]
              }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) return reply;
        } else {
          const errData = await response.json().catch(() => ({}));
          console.warn(`Gemini Model ${model} failed, trying next:`, errData);
        }
      } catch (err) {
        console.error(`Gemini API Error with model ${model}:`, err);
      }
    }
    return null;
  };

  // Handle step-by-step contact collection conversational flow
  const handleFormStep = async (text: string) => {
    setIsTyping(true);
    let botResponse = '';
    let nextStep: 'idle' | 'name' | 'email' | 'message' | 'confirm' = formStep;

    setTimeout(async () => {
      setIsTyping(false);

      if (formStep === 'name') {
        const name = text.trim();
        setFormData((prev) => ({ ...prev, name }));
        botResponse = `Thanks, ${name}! Now, what is your email address?`;
        nextStep = 'email';
      } else if (formStep === 'email') {
        const email = text.trim();
        // Basic email check
        if (!email.includes('@') || !email.includes('.')) {
          botResponse = "Hmm, that doesn't look like a valid email. Please enter a valid email address:";
          nextStep = 'email';
        } else {
          setFormData((prev) => ({ ...prev, email }));
          botResponse = "Got it! What message would you like to send to Aqib?";
          nextStep = 'message';
        }
      } else if (formStep === 'message') {
        const message = text.trim();
        const updatedData = { ...formData, message };
        setFormData(updatedData);
        botResponse = `Please review your message:\n\n👤 Name: ${updatedData.name}\n✉️ Email: ${updatedData.email}\n💬 Message: ${updatedData.message}\n\nWould you like to send this?`;
        nextStep = 'confirm';
      } else if (formStep === 'confirm') {
        const choice = text.toLowerCase().trim();
        if (choice === 'yes' || choice === 'confirm' || choice === 'send' || choice.includes('confirm')) {
          setIsTyping(true);
          try {
            const templateParams = {
              from_name: formData.name,
              from_email: formData.email,
              to_name: formData.name,
              to_email: formData.email,
              email: formData.email,
              name: formData.name,
              message: formData.message,
              services: 'Conversational Chatbot Form',
            };

            await emailjs.send(
              EMAILJS_SERVICE_ID,
              EMAILJS_NOTIFY_TEMPLATE,
              templateParams,
              { publicKey: EMAILJS_PUBLIC_KEY }
            );
            await emailjs.send(
              EMAILJS_SERVICE_ID,
              EMAILJS_REPLY_TEMPLATE,
              templateParams,
              { publicKey: EMAILJS_PUBLIC_KEY }
            );

            botResponse = "✅ Awesome! Your message has been sent successfully. Aqib will get back to you shortly!";
          } catch (err) {
            console.error("Chatbot submit error:", err);
            botResponse = "❌ Sorry, there was an issue sending your message. Please try again or email Aqib directly at aqibmansoor40@gmail.com.";
          } finally {
            setIsTyping(false);
          }
          nextStep = 'idle';
          setFormData({ name: '', email: '', message: '' });
        } else if (choice === 'cancel' || choice === 'no' || choice.includes('cancel')) {
          botResponse = "Understood. The draft has been discarded. How else can I help you today?";
          nextStep = 'idle';
          setFormData({ name: '', email: '', message: '' });
        } else {
          botResponse = "Please confirm: Would you like to send your message? Type **confirm** / **yes** to send, or **cancel** to abort.";
          nextStep = 'confirm';
        }
      }

      setFormStep(nextStep);
      handleSendMessage(botResponse, 'bot');
    }, 1000);
  };

  const simulateBotResponse = async (userText: string) => {
    setIsTyping(true);

    const cleanText = userText.toLowerCase().trim();

    // Try page/tab navigation triggers
    if (setActiveTab) {
      if (cleanText.includes('project') || cleanText.includes('portfolio') || cleanText.includes('websites') || cleanText.includes('apps')) {
        setActiveTab('projects');
      } else if (cleanText.includes('skill') || cleanText.includes('resume') || cleanText.includes('education') || cleanText.includes('study')) {
        setActiveTab('resume');
      } else if (cleanText.includes('experience') || cleanText.includes('work') || cleanText.includes('job') || cleanText.includes('career')) {
        setActiveTab('experience');
      } else if (cleanText.includes('contact') || cleanText.includes('email') || cleanText.includes('phone') || cleanText.includes('message') || cleanText.includes('hire')) {
        setActiveTab('contact');
      } else if (cleanText.includes('about') || cleanText.includes('bio') || cleanText.includes('who are you')) {
        setActiveTab('about');
      }
    }

    // Try Gemini API first
    const geminiReply = await callGeminiAPI(userText);
    if (geminiReply) {
      setIsTyping(false);
      handleSendMessage(geminiReply, 'bot');
      return;
    }

    // Local Fallback Response Engine
    const greetings = ['hi', 'hello', 'hey', 'hola', 'greetings', 'morning', 'afternoon', 'sup', 'yo'];
    const isGreeting = greetings.some(g => {
      const regex = new RegExp(`\\b${g}\\b`, 'i');
      return regex.test(cleanText);
    });

    const helpWords = ['help', 'what can you do', 'features', 'option', 'guide'];
    const isHelp = helpWords.some(h => cleanText.includes(h));

    const projectWords = ['project', 'portfolio', 'work', 'apps', 'websites', 'nexus', 'crypto', 'foodie', 'delivery', 'apply daddy', 'bannu gul', 'show me'];
    const isProjects = projectWords.some(p => cleanText.includes(p));

    const experienceWords = ['experience', 'resume', 'history', 'job', 'company', 'worked', 'background', 'career', 'education', 'studies'];
    const isExperience = experienceWords.some(e => cleanText.includes(e));

    const contactFormTriggers = ['form', 'hire', 'send message', 'message you', 'email you', 'contact'];
    const isContactFormTrigger = contactFormTriggers.some(c => cleanText.includes(c));

    let botResponse = '';

    if (isGreeting) {
      botResponse = "Hello! 👋 I'm Aqib's virtual assistant. I can tell you about his skills, projects, work experience, location, or how to contact him. How can I help you today?";
    } else if (isHelp) {
      botResponse = "I'm here to help you learn more about Aqib! You can ask me about:\n• 🚀 His Core Skills & Tech Stack\n• 💻 His Key Projects & portfolio details\n• 💼 His Availability for hire/freelance\n• 📍 His Location & timezone\n• 📞 How to Contact him";
    } else if (isProjects) {
      botResponse = "Aqib has built several impressive projects including:\n• Nexus Crypto Hub (Real-time tracking with GSAP & CoinGecko)\n• FoodieExpress (Full multi-vendor delivery system with Customer, Vendor, Rider & Admin apps)\n• Apply Daddy (Automated job tracker)\n• Bannu Gul BP (Restaurant system)\n\nI have switched your tab to the 'Projects' page so you can explore them! Which one would you like to discuss?";
    } else if (isExperience) {
      botResponse = "Aqib is a skilled Full-Stack developer who builds responsive, fast, and easy-to-use applications. I've switched your page to show his complete history! You can view his education and work history on the page.";
    } else if (isContactFormTrigger) {
      botResponse = "I'd love to help you get in touch with Aqib! Let's get some details first. What is your name?";
      setFormStep('name');
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
            {/* Audio Toggle Button */}
            <button 
              className="chat-audio-btn" 
              onClick={() => {
                setIsMuted(!isMuted);
                if (!isMuted) window.speechSynthesis.cancel();
              }}
              title={isMuted ? "Unmute Bot Audio" : "Mute Bot Audio"}
              aria-label={isMuted ? "Unmute audio response" : "Mute audio response"}
            >
              <ion-icon name={isMuted ? "volume-mute-outline" : "volume-high-outline"} aria-hidden="true"></ion-icon>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                <p className="message-text" style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
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
            {formStep === 'confirm' ? (
              <>
                <button className="quick-reply-btn" onClick={() => handleSendMessage('confirm')}>
                  ✅ Confirm & Send
                </button>
                <button className="quick-reply-btn" onClick={() => handleSendMessage('cancel')}>
                  ❌ Cancel
                </button>
              </>
            ) : (
              quickReplies.map((qr, index) => (
                <button
                  key={index}
                  className="quick-reply-btn"
                  onClick={() => handleSendMessage(qr.queryText)}
                >
                  {qr.label}
                </button>
              ))
            )}
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
              placeholder={isListening ? "Listening..." : "Ask a question..."}
              className="chat-input"
              aria-label="Message text input"
              disabled={isListening}
            />
            {/* Microphone Button */}
            <button 
              type="button" 
              className={`mic-btn ${isListening ? 'listening' : ''}`}
              onClick={toggleListening}
              title="Speak to Assistant"
              aria-label="Voice input speech to text"
            >
              <ion-icon name={isListening ? "mic-off-outline" : "mic-outline"} aria-hidden="true"></ion-icon>
            </button>
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
