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
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* Scroll the messages container (not the page) to the bottom */
  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  /* Position the custom scrollbar thumb */
  const updateThumb = useCallback(() => {
    const el = scrollRef.current;
    const thumb = thumbRef.current;
    if (!el || !thumb) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight <= clientHeight) {
      thumb.style.opacity = "0";
      return;
    }
    const thumbH = Math.max(24, (clientHeight / scrollHeight) * clientHeight);
    const maxTop = clientHeight - thumbH;
    const top = (scrollTop / (scrollHeight - clientHeight)) * maxTop;
    thumb.style.opacity = "1";
    thumb.style.height = `${thumbH}px`;
    thumb.style.transform = `translateY(${top}px)`;
  }, []);

  useEffect(() => {
    scrollToBottom();
    updateThumb();
  }, [messages, scrollToBottom, updateThumb]);

  /* Update thumb on scroll */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateThumb, { passive: true });
    return () => el.removeEventListener("scroll", updateThumb);
  }, [updateThumb]);

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

    /* Optimistically add an empty assistant message we'll stream into */
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

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
        <div className="text-center mb-10">
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

        {/* Messages — scrolls internally, page stays pinned */}
        {hasMessages && (
          <div className="relative mb-6">
            <div
              ref={scrollRef}
              className="max-h-[480px] overflow-y-auto space-y-5 scroll-smooth overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                          {msg.content || "…"}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Custom scrollbar — orange pill on the right edge */}
            <div
              ref={thumbRef}
              className="absolute right-0 top-0 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-200 pointer-events-none"
            />
          </div>
        )}

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

        {/* Suggestion pills — visible when no conversation yet */}
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
