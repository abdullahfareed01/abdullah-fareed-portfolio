"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type Message = { id: string; role: "user" | "assistant"; content: string };

const suggestions = [
  "What are you building right now?",
  "Which technologies do you use?",
  "What kind of opportunity are you looking for?",
];

function renderAnswer(content: string) {
  return content.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part,
  );
}

export default function DigitalTwinChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("chat") === "open") setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 80);
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const panel = document.querySelector<HTMLElement>(".twin-panel");
      const focusable = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      launchRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, pending, open]);

  async function sendConversation(nextMessages: Message[]) {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(-11).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data: { answer?: string; error?: string } = await response.json();
      if (!response.ok || !data.answer) throw new Error(data.error || "Something went wrong. Please try again.");
      const answer = data.answer;
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: answer }]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;
    const nextMessages = [...messages, { id: crypto.randomUUID(), role: "user" as const, content }];
    setMessages(nextMessages);
    setDraft("");
    void sendConversation(nextMessages);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(draft);
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send(draft);
    }
  }

  return (
    <>
      <button ref={launchRef} className="twin-launcher" type="button" onClick={() => setOpen(true)} aria-label="Open Abdullah's AI digital twin chat">
        <span className="twin-launcher-icon">AF<span>.</span></span>
        <span className="twin-launcher-copy"><small>MEET MY DIGITAL TWIN</small><strong>Ask about my career</strong></span>
        <span className="twin-launcher-arrow" aria-hidden="true">↗</span>
      </button>

      {open && (
        <div className="twin-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section className="twin-panel" role="dialog" aria-modal="true" aria-labelledby="twin-title" aria-describedby="twin-description">
            <header className="twin-header">
              <div className="twin-avatar">AF<span>.</span></div>
              <div className="twin-heading"><span>ABDULLAH FAREED / AI PROFILE</span><h2 id="twin-title">Digital twin <i>● ONLINE</i></h2></div>
              <button className="twin-close" type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
            </header>
            <p id="twin-description" className="sr-only">An AI profile based on Abdullah Fareed&apos;s LinkedIn information. For direct contact, email Abdullah.</p>

            <div className="twin-conversation" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversation">
              {messages.length === 0 && (
                <div className="twin-welcome">
                  <span className="twin-welcome-index">01 / A CONVERSATION WITH MY AI PROFILE</span>
                  <div className="twin-welcome-mark">AF<span>.</span></div>
                  <h3>Curious about<br /><em>my journey?</em></h3>
                  <p>Ask about my skills, education, Neighbour Alerts, or what I&apos;m looking to do next.</p>
                  <div className="twin-suggestions" aria-label="Suggested questions">
                    {suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => send(suggestion)} disabled={pending}>{suggestion}<span aria-hidden="true">↗</span></button>)}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`twin-message twin-message-${message.role}`}>
                  {message.role === "assistant" && <span className="twin-message-avatar" aria-hidden="true">AF<span>.</span></span>}
                  <div className="twin-message-content"><span className="twin-message-label">{message.role === "user" ? "YOU" : "DIGITAL TWIN"}</span><p>{message.role === "assistant" ? renderAnswer(message.content) : message.content}</p></div>
                </div>
              ))}

              {pending && <div className="twin-message twin-message-assistant"><span className="twin-message-avatar" aria-hidden="true">AF<span>.</span></span><div className="twin-message-content"><span className="twin-message-label">DIGITAL TWIN</span><div className="twin-typing" aria-label="Thinking"><span /><span /><span /></div></div></div>}
              {error && <div className="twin-error" role="alert"><span>{error}</span><button type="button" onClick={() => void sendConversation(messages)} disabled={pending}>Retry ↗</button></div>}
              <div ref={endRef} />
            </div>

            <div className="twin-compose">
              {messages.length > 0 && <button type="button" className="twin-new-chat" onClick={() => { setMessages([]); setError(""); }} disabled={pending}>↺ Start a new chat</button>}
              <form onSubmit={onSubmit}>
                <label className="sr-only" htmlFor="twin-input">Ask about Abdullah&apos;s career</label>
                <textarea id="twin-input" ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={onKeyDown} placeholder="Ask me anything about my career..." rows={2} maxLength={700} disabled={pending} />
                <button type="submit" disabled={pending || !draft.trim()} aria-label="Send message">↗</button>
              </form>
              <div className="twin-compose-note"><span>AI PROFILE BASED ON ABDULLAH&apos;S LINKEDIN</span><a href="mailto:abdullahfareedssuet@gmail.com">TALK TO ABDULLAH ↗</a></div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
