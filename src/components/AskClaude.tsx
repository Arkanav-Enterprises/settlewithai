"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "How does deployment work?",
  "Is my data secure with Claude?",
  "What does your process look like?",
  "Do I need AI expertise?",
  "What departments can use AI?",
];

export function AskClaude() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isNearBottom = useRef(true);

  /* Check if scroll is near the bottom (within 80px) */
  const checkNearBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }, []);

  /* Auto-scroll only if user hasn't scrolled up */
  const maybeScrollToBottom = useCallback(() => {
    if (isNearBottom.current) {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }
  }, []);

  useEffect(() => {
    maybeScrollToBottom();
  }, [messages, maybeScrollToBottom]);

  /* Track user scroll to detect manual scroll-up */
  const handleScroll = useCallback(() => {
    const near = checkNearBottom();
    isNearBottom.current = near;
    setUserScrolledUp(!near);
  }, [checkNearBottom]);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
      isNearBottom.current = true;
      setUserScrolledUp(false);
    }
  }, []);

  /* Auto-resize textarea to content */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [input]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setStreaming(true);
    /* Re-engage auto-scroll on new send */
    isNearBottom.current = true;
    setUserScrolledUp(false);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    /* Smooth-scroll the chat container into view after expansion */
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) throw new Error("Chat request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let partial = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        partial += decoder.decode(value, { stream: true });
        const text = partial;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: text };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again or reach out through the contact form below.",
        };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  }

  const hasMessages = messages.length > 0;

  return (
    <section
      id="ask"
      className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 py-20 md:py-28"
    >
      <div className="max-w-[960px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2
            className="text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.12] mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Questions about how this works for you?
          </h2>
          <p className="text-text-muted text-[1.05rem] leading-relaxed">
            Our clients get Claude&apos;s most powerful models. This is a
            lightweight preview &mdash; imagine what the full version does.
          </p>
        </div>

        {/* Messages — expands smoothly when chatting */}
        <div
          ref={containerRef}
          className={`relative mb-4 transition-[height] duration-500 ease-out ${
            hasMessages ? "h-[50vh] md:h-[420px]" : "h-0"
          }`}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={`absolute inset-0 space-y-5 pr-1 ${hasMessages ? "overflow-y-auto overscroll-contain" : "overflow-hidden"}`}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(217,119,87,0.4) transparent",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "user" ? (
                  <div className="font-styrene max-w-[80%] px-5 py-3 rounded-2xl rounded-br-md bg-text text-bg text-[15px] leading-relaxed">
                    {msg.content}
                  </div>
                ) : (
                  <div className="font-styrene max-w-[90%] text-[15px] leading-[1.7] text-text">
                    <div className="[&>p]:mb-3 [&>p:last-child]:mb-0 [&>ul]:mb-3 [&>ul]:ml-4 [&>ul]:list-disc [&>ol]:mb-3 [&>ol]:ml-4 [&>ol]:list-decimal [&_strong]:font-medium">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content || "\u2026"}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Scroll-to-bottom button — appears when user scrolls up */}
          {userScrolledUp && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center shadow-md hover:bg-accent/90 transition-colors z-10"
              aria-label="Scroll to bottom"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 3v8m0 0l3-3m-3 3L4 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Input */}
        <div className="relative bg-white/60 border border-border-light rounded-xl p-3 focus-within:border-text/30 transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask anything about our services..."
            rows={1}
            className="w-full bg-transparent text-text text-[15px] leading-relaxed resize-none outline-none placeholder:text-text-faint placeholder:font-styrene pr-12"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || streaming}
            className="absolute right-3 bottom-3 w-8 h-8 flex items-center justify-center rounded-lg bg-text text-bg disabled:opacity-30 hover:bg-[#30302e] transition-colors"
            aria-label="Send message"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="rotate-[-90deg]"
            >
              <path
                d="M8 3L8 13M8 3L4 7M8 3L12 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Suggestion pills */}
        {!hasMessages && (
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {SUGGESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-[13px] text-text-muted px-4 py-2 rounded-full border border-border-light hover:border-text/30 hover:text-text transition-colors duration-200"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
