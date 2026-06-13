"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  locale: string;
}

export function ChatWidget({ locale }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const t = useCallback(
    (en: string, it: string) => (locale === "it" ? it : en),
    [locale]
  );

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          role: "assistant",
          content: t(
            "Hello! I'm Vera, your AI leather sourcing assistant. How can I help you find the perfect material today?",
            "Ciao! Sono Vera, il tuo assistente IA per la ricerca di pelli. Come posso aiutarti a trovare il materiale perfetto oggi?"
          ),
        },
      ]);
    }
  }, [locale, t, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    // Create a placeholder for the assistant response
    const assistantId = (Date.now() + 1).toString();

    // Abort any existing request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      // Build the history payload (exclude welcome message id, keep role/content only)
      const apiMessages = updatedMessages.map(({ role, content }) => ({
        role,
        content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || `Request failed (${response.status})`);
      }

      // Process the SSE stream
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream available.");

      const decoder = new TextDecoder();
      let assistantContent = "";

      // Add the assistant message placeholder
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setIsTyping(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        const lines = text.split("\n");

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;

          const payload = trimmed.slice(6); // Remove "data: " prefix
          if (payload === "[DONE]") break;

          try {
            const parsed = JSON.parse(payload);
            if (parsed.error) {
              throw new Error(parsed.error);
            }
            if (parsed.content) {
              assistantContent += parsed.content;
              // Update the assistant message with streamed content
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantId
                    ? { ...msg, content: assistantContent }
                    : msg
                )
              );
            }
          } catch (parseErr) {
            // Skip malformed SSE chunks silently
            if (parseErr instanceof Error && parseErr.message !== "Stream interrupted.") {
              // Only throw if it's a real error from our API
              if ((parseErr as { message: string }).message) {
                // continue gracefully
              }
            }
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // User cancelled — do nothing
        return;
      }

      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(errorMessage);

      // Remove the empty assistant placeholder if it exists
      setMessages((prev) => prev.filter((msg) => msg.id !== assistantId));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-stone-900 text-white shadow-elevated hover:scale-105 hover:bg-stone-800 transition-all duration-300 group cursor-pointer",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
        aria-label="Open chat"
      >
        <svg className="w-6 h-6 transition-transform group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
        {/* Notification dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-accent border-2 border-white rounded-full"></span>
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 left-6 z-50 w-full max-w-[360px] bg-white rounded-2xl shadow-elevated border border-stone-200 overflow-hidden flex flex-col transition-all duration-300 ease-out origin-bottom-left",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
        style={{ height: "550px", maxHeight: "calc(100vh - 48px)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-stone-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm">Vera AI</h3>
              <p className="text-[10px] text-white/60">
                {t("Virtual Sourcing Assistant", "Assistente Virtuale")}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex max-w-[85%] animate-fade-in-up",
                msg.role === "user" ? "ml-auto justify-end" : "mr-auto justify-start"
              )}
            >
              <div
                className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-accent text-white rounded-tr-sm"
                    : "bg-white text-stone-800 border border-stone-200 shadow-sm rounded-tl-sm"
                )}
              >
                {msg.content}
                {/* Blinking cursor for streaming assistant messages */}
                {msg.role === "assistant" && msg.content === "" && !isTyping && (
                  <span className="inline-block w-1.5 h-4 bg-stone-400 animate-pulse ml-0.5 align-middle rounded-sm" />
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex max-w-[85%] mr-auto justify-start animate-fade-in">
              <div className="p-4 rounded-2xl rounded-tl-sm bg-white border border-stone-200 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="flex max-w-[85%] mr-auto justify-start animate-fade-in">
              <div className="p-3 rounded-2xl rounded-tl-sm bg-red-50 text-red-700 border border-red-200 text-sm">
                ⚠️ {error}
                <button
                  onClick={() => setError(null)}
                  className="ml-2 text-red-500 underline text-xs hover:text-red-700"
                >
                  {t("Dismiss", "Chiudi")}
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-stone-200">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("Ask Vera anything...", "Chiedi qualsiasi cosa a Vera...")}
              className="flex-1 px-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
            />
            <Button
              type="submit"
              size="sm"
              className="w-9 h-9 rounded-full p-0 flex items-center justify-center flex-shrink-0"
              disabled={!input.trim() || isTyping}
            >
              <svg className="w-4 h-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
