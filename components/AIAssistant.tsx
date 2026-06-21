import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Youtube, Linkedin, Instagram, Sparkles } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import LookAtCursor from './LookAtCursor';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  showSocials?: boolean;
}

const KNOWLEDGE_BASE = {
  experience: {
    keywords: ['experience', 'work', 'job', 'company', 'celebal', 'nkb', 'aipxperts', 'career', 'history', 'intern', 'legiit'],
    answer: "Oh, Arin's career journey? Prepare to be impressed! 🚀\n\n💻 Aipxperts (Feb 2026 - Present): Currently building the U.S. freelance marketplace 'Legiit'. He basically turns caffeine into code ☕ and writes cool AI matchmaking features.\n\n🎮 NKB PlayTech (Sep 2023 - Jan 2026): Shipped 8+ real-time multiplayer games. He optimized frontend performance so fast that lag gave up and went home! ⚡\n\n🎓 Celebal Technologies (2023): His React intern era. He built reusable components that were cleaner than a freshly washed plate 🧼.\n\nType 'aipxperts', 'nkb', or 'celebal' to dive into specific details!"
  },
  skills: {
    keywords: ['skills', 'technologies', 'programming', 'code', 'react', 'node', 'javascript', 'typescript', 'stack', 'mongodb', 'sql', 'css', 'html', 'laravel', 'php', 'dsa', 'java'],
    answer: "Here is Arin's inventory of digital superpowers! ⚡\n\n• React, JavaScript, & TypeScript: His absolute favorites. He talks to components like they're his best friends! ⚛️\n• PHP & Laravel: The gears behind the scenes, turning database logic into pure magic. ⚙️\n• Node.js & WebSockets: Keeping game latencies under 100ms. That is faster than you can blink! 👀\n• SQL & MongoDB: Organizing database profiles like a digital Marie Kondo. 📂"
  },
  projects: {
    keywords: ['projects', 'portfolio', 'apps', 'coinflip', 'legiit', 'games', 'qr', 'astrology', 'resume maker', 'built', 'kotibox'],
    answer: "Check out Arin's cool creations! They actually work (most of the time)! 😉\n\n• CoinFlip Game: A real-time multiplayer betting game using WebSockets. 🪙\n• Kotibox Website: Fully responsive corporate MERN portal. 🌐\n• QR Generator: Generate and download custom QR codes instantly. 📱\n• Resume Maker: Interactive resume template generator. 📝\n\nScroll up to the Projects section to run them live. Go on, click a button!"
  },
  education: {
    keywords: ['education', 'college', 'degree', 'study', 'university', 'btech', 'marks', 'cgpa', 'jaipur', 'jodhpur'],
    answer: "Ah, the schooling days! 🎒\n\n• B.Tech. in Computer Science (2020 - 2024): Survived 4 years of algorithms and exams at Global Institute of Technology, Jaipur. Graduated with a solid 7.53 CGPA! 🎓\n• Class 12: Vidhya Valley School, Jodhpur (2020) — 67.17% 🏫\n• Class 10: KPS School — 68.40% 🏫"
  },
  contact: {
    keywords: ['contact', 'email', 'phone', 'location', 'ahmedabad', 'gujarat', 'hire', 'reach', 'social', 'address', 'mail', 'number'],
    answer: "Want to chat with Arin? Here's how to reach him: 📞\n\n📧 Email: thakararinjoshi@gmail.com\n📞 Phone: +91 8290279001 (WhatsApp friendly!)\n📍 Location: Ahmedabad, Gujarat (come visit!)\n\nOr click the 'Send Message' button in the contact section below to launch the email form! ✉️"
  },
  resume: {
    keywords: ['resume', 'cv', 'download', 'pdf', 'profile'],
    answer: "Arin's resume is basically a ticket to hiring a high-performing developer! 🎫 If you want the complete PDF version, drop him a line at thakararinjoshi@gmail.com. He'll email it to you faster than a webpack hot-reload! ⚡"
  }
};

const AIAssistant: React.FC = () => {
  const { isMuted } = useAudio();
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hey there! 👋 I am Arin's digital twin bot. Ask me anything about his experience, projects, coding skills, or education!"
    }
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showDot, setShowDot] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Pulsing active green dot logic
  useEffect(() => {
    const interval = setInterval(() => {
      setShowDot(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const playAudio = (type: 'open' | 'send' | 'receive' | 'click') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const gainNode = ctx.createGain();
      gainNode.connect(ctx.destination);

      if (type === 'open') {
        [523.25, 783.99].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.connect(gainNode);
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gainNode.gain.setValueAtTime(0, now + idx * 0.05);
          gainNode.gain.linearRampToValueAtTime(0.012, now + idx * 0.05 + 0.02);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.2);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.22);
        });
      } else if (type === 'send') {
        const osc = ctx.createOscillator();
        osc.connect(gainNode);
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);
        gainNode.gain.setValueAtTime(0.008, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.045);
      } else if (type === 'receive') {
        [880, 1174.66].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.connect(gainNode);
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          gainNode.gain.setValueAtTime(0, now + idx * 0.06);
          gainNode.gain.linearRampToValueAtTime(0.015, now + idx * 0.06 + 0.015);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.18);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.2);
        });
      } else if (type === 'click') {
        const osc = ctx.createOscillator();
        osc.connect(gainNode);
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.03);
        gainNode.gain.setValueAtTime(0.01, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  const handleToggleChat = () => {
    if (!isChatOpen) {
      playAudio('open');
    } else {
      playAudio('click');
    }
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    playAudio('send');

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      playAudio('receive');

      const response = generateAIAnswer(text);
      setMessages(prev => [...prev, response]);
    }, 600);
  };

  const generateAIAnswer = (msg: string): Message => {
    const clean = msg.toLowerCase().trim();
    const words = clean.split(/[\s,?.!/]+/).filter(w => w.length >= 3);

    // Helper function for Levenshtein Distance
    const getLevenshteinDistance = (a: string, b: string): number => {
      const tmp: number[][] = [];
      for (let i = 0; i <= b.length; i++) tmp[i] = [i];
      for (let j = 0; j <= a.length; j++) tmp[0][j] = j;

      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            tmp[i][j] = tmp[i - 1][j - 1];
          } else {
            tmp[i][j] = Math.min(
              tmp[i - 1][j - 1] + 1, // substitution
              tmp[i][j - 1] + 1,     // insertion
              tmp[i - 1][j] + 1      // deletion
            );
          }
        }
      }
      return tmp[b.length][a.length];
    };

    // Helper to check if a word matches a keyword (direct substring or typo-tolerant)
    const isKeywordMatch = (userWord: string, keyword: string): boolean => {
      if (userWord === keyword) return true;
      if (userWord.includes(keyword) || keyword.includes(userWord)) return true;

      const dist = getLevenshteinDistance(userWord, keyword);
      if (keyword.length <= 5 && dist <= 1) return true;
      if (keyword.length > 5 && dist <= 2) return true;

      return false;
    };

    if (clean.match(/\b(hi|hello|hey|greetings|hola|yo|sup)\b/)) {
      return {
        sender: 'ai',
        text: "Hey there! 👋 I am Arin's digital twin bot. Ask me anything about his experience, projects, coding skills, or education!"
      };
    }

    const isAipxperts = words.some(w => isKeywordMatch(w, 'aipxperts') || isKeywordMatch(w, 'legiit'));
    if (isAipxperts) {
      return {
        sender: 'ai',
        text: "At Aipxperts, Arin works on Legiit (U.S. freelance portal) and has fun: 💻\n\n• Migrating legacy monolithic pages to modular React.js structures.\n• Creating AI-powered tools and backend logic in PHP/Laravel.\n• Optimizing complex SQL query response times."
      };
    }

    const isNkb = words.some(w => isKeywordMatch(w, 'nkb') || isKeywordMatch(w, 'playtech') || isKeywordMatch(w, 'game'));
    if (isNkb) {
      return {
        sender: 'ai',
        text: "At NKB PlayTech, Arin built multiplayer games and did some heavy lifting: 🎮\n\n• Maintained 8+ live games using React.js and WebSockets.\n• Slashed garbage collection memory overhead by 35%.\n• Maintained sub-100ms real-time synchronization pipelines."
      };
    }

    const isCelebal = words.some(w => isKeywordMatch(w, 'celebal'));
    if (isCelebal) {
      return {
        sender: 'ai',
        text: "During his React intern days at Celebal Technologies, Arin: 🎓\n\n• Created 10+ reusable components using SOLID & DRY principles.\n• Crafted pixel-perfect layouts matching Figma specs perfectly."
      };
    }

    for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
      const matchFound = words.some(userWord => 
        value.keywords.some(kw => isKeywordMatch(userWord, kw))
      );

      if (matchFound) {
        return {
          sender: 'ai',
          text: value.answer
        };
      }
    }

    return {
      sender: 'ai',
      text: "I couldn't find a direct match for your question in Arin's resume data. Feel free to explore his social channels or drop a direct message for details!",
      showSocials: true
    };
  };

  const suggestionChips = [
    { label: "💼 Experience", query: "What is Arin's work experience?" },
    { label: "🛠️ Skills", query: "What is his tech stack?" },
    { label: "🚀 Projects", query: "Show me his top projects." },
    { label: "🎓 Education", query: "Where did Arin study?" },
    { label: "📞 Contact", query: "How do I contact Arin?" }
  ];

  return (
    <>
      {/* Playful bounce animation styles injected directly */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cute-jump {
          0%, 100% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-6px) scale(0.95, 1.05); }
          50% { transform: translateY(-8px) scale(1.05, 0.95) rotate(4deg); }
          70% { transform: translateY(-6px) scale(0.98, 1.02) rotate(-4deg); }
          85% { transform: translateY(0) scale(1.05, 0.95); }
        }
        .animate-cute-jump {
          display: inline-block;
          animation: cute-jump 2.2s infinite ease-in-out;
        }
        .group:hover .animate-cute-jump {
          animation: cute-jump 0.8s infinite ease-in-out;
        }
      `}} />

      <button
        onClick={handleToggleChat}
        className="fixed bottom-8 left-8 z-40 w-11 h-11 bg-slate-900 border border-slate-800 text-white rounded-full transition-all duration-300 hover:scale-110 dark:bg-white dark:border-slate-200 dark:text-slate-900 shadow-lg flex items-center justify-center group"
        aria-label="Toggle AI Assistant"
      >
        <span className="text-xl animate-cute-jump select-none pointer-events-none">🤖</span>
        <span className={`absolute top-0 right-0 w-2.5 h-2.5 rounded-full border border-slate-900 dark:border-white bg-emerald-500 transition-opacity duration-300 ${
          showDot ? 'opacity-100' : 'opacity-40'
        }`} />
      </button>

      {isChatOpen && (
        <div className="fixed bottom-24 left-8 z-50 w-[calc(100vw-64px)] sm:w-[320px] h-[420px] bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-2xl flex flex-col backdrop-blur-xl animate-fade-in transition-all duration-300">
          
          {/* Header (No overflow-hidden on container allows robot mascot to float higher) */}
          <div className="relative p-4 bg-gradient-to-r from-violet-600 to-indigo-500 text-white flex items-center justify-between border-b border-indigo-400/20 rounded-t-3xl">
            {/* Mascot look-at-cursor floating outside the top edge */}
            <div className="absolute -top-12 left-3 pointer-events-none select-none transform scale-[0.68]">
              <LookAtCursor type="robot" className="mx-0 animate-bounce delay-300" />
            </div>

            <div className="pl-14 flex flex-col">
              <span className="text-xs font-extrabold tracking-tight">Arin's AI Assistant</span>
              <span className="text-[9px] font-mono opacity-80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Resume Bot Online
              </span>
            </div>

            <button 
              onClick={handleToggleChat}
              className="p-1 rounded-full hover:bg-white/20 transition-colors text-white/90 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-slate-950/40">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line shadow-sm border ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 border-slate-800 text-white dark:bg-white dark:border-slate-100 dark:text-slate-900 rounded-tr-none'
                      : 'bg-white border-slate-200 text-slate-850 dark:bg-slate-900 dark:border-slate-850 dark:text-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}

                  {msg.showSocials && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-2">
                      <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Quick Connections</p>
                      <div className="flex items-center gap-2">
                        <a 
                          href="https://www.linkedin.com/in/arinjoshi/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => playAudio('click')}
                          className="flex-1 p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20 text-blue-500 flex items-center justify-center gap-1.5 transition-colors font-mono text-[9px]"
                        >
                          <Linkedin size={10} /> LinkedIn
                        </a>
                        <a 
                          href="https://www.youtube.com/@ArinJoshi" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => playAudio('click')}
                          className="flex-1 p-2 rounded-lg bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 text-red-500 flex items-center justify-center gap-1.5 transition-colors font-mono text-[9px]"
                        >
                          <Youtube size={10} /> YouTube
                        </a>
                      </div>
                      <a 
                        href="https://www.instagram.com/click_by_arin/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => playAudio('click')}
                        className="p-2 rounded-lg bg-pink-500/10 hover:bg-pink-500/15 border border-pink-500/20 text-pink-500 flex items-center justify-center gap-1.5 transition-colors font-mono text-[9px] w-full"
                      >
                        <Instagram size={10} /> Instagram Handle
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start animate-pulse">
                <div className="rounded-2xl rounded-tl-none bg-white border border-slate-200 px-4 py-3 dark:bg-slate-900 dark:border-slate-850 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce delay-75" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce delay-225" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-900 bg-white/50 dark:bg-slate-950/50 overflow-x-auto flex items-center gap-2 scrollbar-none">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.query)}
                className="flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-900 dark:hover:bg-slate-850 dark:text-slate-350 text-[10px] font-semibold border border-slate-200/50 dark:border-slate-800 transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Box (Rounded bottom corners protect rounded modal borders) */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputVal);
            }}
            className="p-3 border-t border-slate-100 dark:border-slate-900 flex items-center gap-2 bg-white dark:bg-slate-950 rounded-b-3xl"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask me something..."
              className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 focus:border-indigo-500 bg-slate-50 dark:bg-slate-900/50 dark:border-slate-850 dark:focus:border-indigo-500 text-xs focus:outline-none focus:ring-0 dark:text-white dark:placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 disabled:opacity-40 disabled:hover:scale-100 transition-all hover:scale-105 flex items-center justify-center"
            >
              <Send size={12} />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

export default AIAssistant;
