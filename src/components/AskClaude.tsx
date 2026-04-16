"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PixelPet } from "./PixelPet";

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

const STORAGE_KEY = "settle-chat-messages";

function loadMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveMessages(msgs: Message[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(JSON.stringify(msgs.slice(-4)))};path=/;max-age=604800;SameSite=Lax`;
  } catch {
    /* storage full or blocked — fail silently */
  }
}

export function AskClaude() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputWrapRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isNearBottom = useRef(true);
  const hasMessages = messages.length > 0;

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    const saved = loadMessages();
    if (saved.length) setMessages(saved);
    setHydrated(true);
  }, []);

  /* Persist to localStorage + cookie on change */
  useEffect(() => {
    if (hydrated) saveMessages(messages);
  }, [messages, hydrated]);

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

  /* No auto-resize — textarea has a fixed height */

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setStreaming(true);
    isNearBottom.current = true;
    setUserScrolledUp(false);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    /* Scroll input into view after the container finishes expanding (500ms transition) */
    setTimeout(() => {
      inputWrapRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 550);

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

  return (
    <section
      id="ask"
      className="relative z-20 max-w-[1280px] mx-auto px-6 lg:px-10 py-20 md:py-28"
    >
      <div className="max-w-[960px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          {hasMessages ? (
            <div className="liquid-glass px-4 py-2 !rounded-xl">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setMessages([]);
                    saveMessages([]);
                  }}
                  className="font-styrene text-[11px] text-red-500/70 hover:text-red-500 transition-colors"
                >
                  Reset Chat
                </button>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="font-styrene text-[12px] text-text-muted">
                    Chatting with <span className="text-accent">Settle AI</span>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Messages — expands smoothly when chatting */}
        <div
          ref={containerRef}
          className={`relative mb-4 transition-[height] duration-500 ease-out ${
            hasMessages ? "h-[360px]" : "h-0"
          }`}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={`absolute inset-0 space-y-5 pr-1 ${hasMessages ? "overflow-y-auto" : "overflow-hidden"}`}
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
        <div
          ref={inputWrapRef}
          className={`relative bg-white/60 rounded-2xl px-4 py-3.5 transition-all duration-300 ${
            !hasMessages
              ? "max-w-[640px] mx-auto shadow-[0_0.25rem_1.25rem_rgba(0,0,0,0.035),0_0_0_0.5px_rgba(0,0,0,0.06)] hover:shadow-[0_0.25rem_1.25rem_rgba(0,0,0,0.035),0_0_0_0.5px_rgba(0,0,0,0.12)] focus-within:shadow-[0_0.25rem_1.25rem_rgba(0,0,0,0.075),0_0_0_0.5px_rgba(0,0,0,0.12)] border border-transparent glow-border"
              : "border border-border-light focus-within:border-text/30"
          }`}
        >
          {/* Pixel pet walks along the top edge of the input — decorative,
             only in empty state so it doesn't distract during chat. */}
          {!hasMessages && <PixelPet scale={4} />}
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
            rows={hasMessages ? 1 : 4}
            className={`w-full bg-transparent text-text text-[15px] leading-relaxed resize-none outline-none placeholder:text-text-faint placeholder:font-styrene pr-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${!hasMessages ? "h-[120px]" : ""}`}
          />
          {/* Bottom row: pills (horizontal scroll) + send button */}
          <div className="flex items-center gap-2 mt-2">
            {!hasMessages && (
              <div className="flex-1 overflow-x-auto no-scrollbar flex gap-2 min-w-0">
                {SUGGESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="font-styrene text-[12px] text-text-muted px-3 py-1.5 rounded-full border border-border-light hover:border-text/30 hover:text-text transition-colors duration-200 whitespace-nowrap shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || streaming}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-text text-bg disabled:opacity-30 hover:bg-[#30302e] transition-colors ml-auto"
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
        </div>
      </div>
    </section>
  );
}
