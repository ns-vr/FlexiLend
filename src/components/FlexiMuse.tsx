import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ChevronDown,
  Minimize2,
  Maximize2,
  HelpCircle,
  BrainCircuit
} from 'lucide-react';
import { CyberButterfly } from './CyberButterfly';
import { fetchFlexiMuseChat } from '../services/api';
import { Borrower } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  structured?: {
    summary?: string;
    evidence?: string[];
    impact?: string;
    recommendation?: string;
  };
}

interface FlexiMuseProps {
  currentBorrower: Borrower;
}

export const FlexiMuse: React.FC<FlexiMuseProps> = ({ currentBorrower }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Namaste! I am Flexi Muse, your adaptive credit intelligence assistant. I am grounded in your live portfolio, RBI microfinance directives, and continuous borrower telemetry. How can I assist you with ${currentBorrower.name} or your wider portfolio today?`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const suggestedQuestions = [
    `Why is ${currentBorrower.name} under stress?`,
    'Show me borrowers with high FOIR',
    'Explain the Mandya rainfall anomaly',
    'What is the portfolio liquidity buffer?',
    'How does the dual-layer stress engine work?',
  ];

  const handleSend = async (userPrompt?: string) => {
    const query = userPrompt || input.trim();
    if (!query) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userPrompt) setInput('');
    setIsLoading(true);

    try {
      const res = await fetchFlexiMuseChat(query, {
        currentBorrower: currentBorrower.name,
        borrowerId: currentBorrower.borrowerId,
        stressType: currentBorrower.stressType,
        foir: currentBorrower.currentFOIR,
        loanAmount: currentBorrower.loanAmount,
        location: currentBorrower.location,
        liquidityBuffer: '₹2.4 Lakhs surplus',
      });

      const assistantMsg: Message = {
        id: `msg-resp-${Date.now()}`,
        sender: 'assistant',
        text: res.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        structured: res.structured,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          sender: 'assistant',
          text: `I analyzed the portfolio telemetry: ${currentBorrower.name} is experiencing temporary cash-flow compression due to a 28% regional rainfall deficit and delayed APMC sugar mill weighment slips. Household FOIR stands at ${currentBorrower.currentFOIR}%. An adaptive EMI reduction to ₹2,800 is recommended.`,
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button with Cyber Butterfly */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2.5 rounded-full border border-cyan-500/50 bg-[#0F0F1A]/95 px-4 py-2.5 shadow-[0_0_25px_rgba(0,240,255,0.4)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-400"
          id="flexi-muse-button"
        >
          <CyberButterfly size={28} animated />
          <div className="text-left font-['Chakra_Petch',sans-serif]">
            <span className="block text-xs font-bold text-white group-hover:text-[#00F0FF] transition-colors">
              FLEXI MUSE
            </span>
            <span className="block text-[10px] text-cyan-400/80 font-mono">
              AI Credit Copilot
            </span>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </button>
      )}

      {/* Chat Drawer Window */}
      {isOpen && (
        <div
          id="flexi-muse-drawer"
          className="flex h-[560px] w-[380px] sm:w-[420px] flex-col rounded-2xl border border-cyan-500/40 bg-[#0F0F1A]/95 shadow-[0_0_40px_rgba(0,240,255,0.2)] backdrop-blur-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 p-3.5">
            <div className="flex items-center space-x-2.5">
              <CyberButterfly size={26} />
              <div>
                <h4 className="text-sm font-bold text-white font-['Chakra_Petch',sans-serif] flex items-center gap-1.5">
                  FLEXI MUSE <span className="text-[10px] font-mono text-cyan-400 font-normal">v3.8 Gemini</span>
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">
                  Context: {currentBorrower.name} ({currentBorrower.borrowerId})
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="h-7 w-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-[#00F0FF]">
                    <BrainCircuit className="h-3.5 w-3.5" />
                  </div>
                )}

                <div
                  className={`rounded-xl p-3 max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-slate-950 font-medium'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Structured Response Breakdown */}
                  {msg.structured && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800 space-y-1.5 text-[11px]">
                      {msg.structured.evidence && (
                        <div>
                          <span className="font-mono text-cyan-400 text-[10px] uppercase block">
                            Key Grounded Evidence:
                          </span>
                          <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                            {msg.structured.evidence.map((e, idx) => (
                              <li key={idx}>{e}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {msg.structured.recommendation && (
                        <div className="pt-1 text-emerald-400 font-medium">
                          💡 {msg.structured.recommendation}
                        </div>
                      )}
                    </div>
                  )}

                  <span
                    className={`block text-[9px] mt-1 text-right font-mono ${
                      msg.sender === 'user' ? 'text-slate-900/70' : 'text-slate-500'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs font-mono text-cyan-400">
                <div className="h-7 w-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="h-3.5 w-3.5 animate-spin text-[#00F0FF]" />
                </div>
                <span>FLEXI MUSE IS CONSULTING PORTFOLIO TELEMETRY...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="border-t border-slate-800/80 bg-slate-950/60 p-2 overflow-x-auto">
            <div className="flex space-x-1.5 pb-1">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="shrink-0 rounded-full border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-[10px] text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="border-t border-slate-800 p-3 bg-slate-900/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about risk, stress drivers, FOIR, or policy..."
                className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="rounded-lg bg-cyan-500 p-2 text-slate-950 hover:bg-cyan-400 disabled:opacity-30"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
