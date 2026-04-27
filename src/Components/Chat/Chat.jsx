import {
  useState,
  useRef,
  useEffect,
  useCallback
} from "react";
import {
  Sparkles,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import {
  motion,
  AnimatePresence
} from "framer-motion";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import ShareModal from "./ShareModal";
import { MODELS, DEFAULT_MODEL } from "../../config/models";

// ─── Main Chat component ──────────────────────────────────────────────────────
export default function Chat({ 
  activeChat, 
  messages = [], 
  onSendMessage, 
  isThinking = false, 
  thinkingText, 
  onViewThinking,
  selectedModel,
  setSelectedModel,
  hideHeader = false
}) {
  const endOfMessagesRef = useRef(null);
  const [copiedText, setCopiedText] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [modelChange, setModelChange] = useState(false);
  const models = MODELS;

  const modelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        setModelChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const copyToClipboard = useCallback(async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  }, []);

  const openShare = useCallback(() => setShareOpen(true), []);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {!hideHeader && (
        <div
          className="py-4 pl-5 relative flex gap-2.5 text-center align-middle items-center select-none"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <div
            ref={modelRef}
            onClick={() => setModelChange(!modelChange)}
            className="flex items-center gap-2 transition-all p-2 px-3 rounded-xl cursor-pointer relative z-10"
            style={{
              color: "var(--paper)",
              border: "1px solid transparent",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--overlay-medium)";
              e.currentTarget.style.borderColor = "var(--border-medium)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            <div className="text-[17px] font-medium flex items-center gap-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif", letterSpacing: "-0.01em" }}>
              aura<span style={{ color: "#8BA88E" }}>.</span>
              <span className="text-[11px] font-normal px-2 py-0.5 rounded-full" style={{ color: "var(--txt-secondary)", fontFamily: "Inter, sans-serif", background: "var(--overlay-subtle)" }}>
                {MODELS.find(m => m.id === selectedModel)?.shortName || ""}
              </span>
            </div>
            <div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${modelChange ? "rotate-180" : ""}`}
                style={{ color: "var(--txt-muted)" }}
              />
            </div>
          </div>

          <AnimatePresence>
            {modelChange && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.2 }}
                ref={modelRef}
                className="absolute top-full left-4 mt-2 z-50 backdrop-blur-xl rounded-xl shadow-2xl p-2 min-w-[260px]"
                style={{
                  background: "var(--charcoal)",
                  border: "1px solid var(--border-medium)"
                }}
              >
                <div className="flex flex-col gap-1">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      className="flex items-center gap-3 transition-all p-3 rounded-lg cursor-pointer relative group"
                      style={{
                        color: "var(--paper)",
                        background: selectedModel === model.id ? "var(--overlay-medium)" : "transparent",
                        border: selectedModel === model.id ? "1px solid var(--border-medium)" : "1px solid transparent"
                      }}
                      onMouseEnter={e => { if (selectedModel !== model.id) e.currentTarget.style.background = "var(--overlay-subtle)"; }}
                      onMouseLeave={e => { if (selectedModel !== model.id) e.currentTarget.style.background = "transparent"; }}
                      onClick={() => { setModelChange(false); setSelectedModel(model.id); }}
                    >
                      <div className="flex flex-col text-left">
                        <span className="text-[14px] font-medium" style={{ color: "var(--paper)" }}>{model.name}</span>
                        <span className="text-[11px] line-clamp-1" style={{ color: "var(--txt-muted)" }}>
                          {model.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="flex-1 w-full overflow-hidden relative flex flex-col">
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-1 flex flex-col items-center justify-center px-4 w-full"
            >
              <div className="w-full max-w-3xl flex flex-col items-center gap-8 -translate-y-12">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ rotate: -10, scale: 0.9 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="p-5 rounded-3xl mb-6"
                    style={{
                      background: "var(--overlay-medium)",
                      border: "1px solid var(--border-medium)"
                    }}
                  >
                    <Sparkles size={44} style={{ color: "#8BA88E" }} />
                  </motion.div>
                  <h2
                    className="text-4xl mb-3 tracking-tight text-center"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "var(--paper)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
                  >
                    How can I help you?
                  </h2>
                  <p className="text-center text-base font-light tracking-wide" style={{ color: "var(--txt-secondary)" }}>
                    Start a conversation or ask me anything.
                  </p>
                </div>

                <div className="w-full">
                  <ChatInput
                    onSend={(val, mode) => onSendMessage(val, selectedModel, mode)}
                    disabled={isThinking}
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chat-active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col w-full overflow-hidden"
            >
              <div
                className="flex-1 w-full overflow-y-auto"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "var(--border-medium) transparent"
                }}
              >
                <div className="w-full max-w-3xl mx-auto pt-6 pb-8 px-4 flex flex-col gap-6">
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <MessageBubble
                        key={msg.id}
                        msg={msg}
                        copiedText={copiedText}
                        onCopy={copyToClipboard}
                        onShare={openShare}
                        onViewThinking={onViewThinking}
                      />
                    ))}
                  </AnimatePresence>

                  {/* AI Thinking Bubble */}
                  <AnimatePresence>
                    {isThinking && (
                      <motion.div
                        key="thinking"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex gap-4 w-full justify-start items-start"
                      >
                        <div
                          className="flex items-center gap-2"
                        // style={{ background: "var(--overlay-subtle)", border: "1px solid var(--border-subtle)" }}
                        >
                          <span
                            className="flex items-center gap-1.5 font-medium animate-thinking-glow text-sm"
                            style={{ color: "var(--paper)" }}
                          >
                            Thinking...
                            <ChevronRight size={16} style={{ color: "var(--txt-muted)" }} />
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={endOfMessagesRef} className="h-4" />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="w-full shrink-0 px-4 pb-3 pt-2"
                style={{ background: "linear-gradient(to top, var(--obsidian) 60%, transparent)" }}
              >
                <ChatInput
                  onSend={(val, mode) => onSendMessage(val, selectedModel, mode)}
                  disabled={isThinking}
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        chatId={activeChat?.id}
        chatTitle={activeChat?.name}
      />
    </div>
  );
}