import React, { useState, useRef, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Send, Plus, Paperclip, Lightbulb, Telescope, Globe, X } from "lucide-react";
import { FEATURE_MODELS } from "../../config/models";

const ChatInput = memo(function ChatInput({ onSend, disabled, selectedModel, setSelectedModel }) {
  const [value, setValue] = useState("");
  const [uploadModel, setUploadModel] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [deepThinking, setDeepThinking] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const uploadRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    const mode = thinking ? "thinking" : deepThinking ? "research" : webSearch ? "web" : "default";
    onSend(value, mode);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmpty = value.trim() === "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (uploadRef.current && !uploadRef.current.contains(event.target)) {
        setUploadModel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-3xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="backdrop-blur-xl px-2 py-1 rounded-2xl transition-all"
        style={{
          background: "var(--slate)",
          border: "1px solid var(--border-medium)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.35)"
        }}
      >
        <div className="relative flex items-center justify-between gap-2">
          {/* Upload / feature picker */}
          <button
            onClick={() => setUploadModel(!uploadModel)}
            className="p-3 rounded-full transition-colors shrink-0"
            style={{ color: "var(--txt-muted)" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.background = "var(--overlay-subtle)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--txt-muted)"; e.currentTarget.style.background = "transparent"; }}
          >
            <Plus size={20} />
          </button>

          <textarea
            autoFocus
            rows={1}
            placeholder="Ask anything..."
            className="w-full bg-transparent resize-none outline-none overflow-y-auto max-h-40 min-h-[44px] py-2.5 text-[15px]"
            style={{
              color: "var(--paper)",
              caretColor: "#8BA88E",
              scrollbarWidth: "none"
            }}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleSend}
            disabled={disabled}
            className="p-2.5 rounded-full flex justify-center items-center transition-all shrink-0 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            style={isEmpty || disabled ? {
              color: "var(--txt-muted)",
              background: "transparent"
            } : {
              color: "var(--obsidian)",
              background: "#8BA88E",
              boxShadow: "0 2px 16px rgba(139,168,142,0.25)"
            }}
          >
            <Send size={18} />
          </button>

          {/* Upload / feature dropdown */}
          <div
            ref={uploadRef}
            className={`absolute ${uploadModel ? "" : "hidden"} -top-52 px-3 py-4 left-0 z-50 rounded-2xl shadow-2xl flex flex-col gap-2`}
            style={{
              background: "var(--charcoal)",
              border: "1px solid var(--border-medium)"
            }}
          >
            <div>
              <input id="file-upload" type="file" className="hidden" accept=".jpg, .png, .jpeg" />
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors"
                style={{ color: "var(--txt-secondary)" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--overlay-subtle)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <Paperclip size={15} /> Add Photos & Files
              </label>
            </div>
            <div style={{ height: "1px", background: "var(--border-subtle)" }} />
            <div
              onClick={() => {
                setDeepThinking(false);
                if (!thinking) {
                  setThinking(true);
                  setSelectedModel(FEATURE_MODELS.THINKING);
                  setUploadModel(false);
                }
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors"
              style={{ color: "var(--txt-secondary)" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--overlay-subtle)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <Lightbulb size={15} /> Thinking
            </div>
            <div
              onClick={() => {
                setThinking(false);
                if (!deepThinking) {
                  setDeepThinking(true);
                  setSelectedModel(FEATURE_MODELS.RESEARCH);
                  setUploadModel(false);
                }
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors"
              style={{ color: "var(--txt-secondary)" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--overlay-subtle)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <Telescope size={15} /> Deep Research
            </div>
            <div
              onClick={() => {
                if (!webSearch) {
                  setWebSearch(true);
                  setSelectedModel(FEATURE_MODELS.WEB_SEARCH);
                  setUploadModel(false);
                }
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors"
              style={{ color: "var(--txt-secondary)" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--overlay-subtle)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <Globe size={15} /> Web Search
            </div>
          </div>
        </div>

        {/* Active mode chips */}
        {(thinking || deepThinking || webSearch) && (
          <div className="flex justify-start gap-2 shrink mt-2 px-10 pb-1">
            {thinking && (
              <div
                className="flex items-center gap-2 px-2.5 py-1 rounded-full cursor-pointer text-xs transition-colors"
                style={{ background: "rgba(139,168,142,0.15)", color: "#8BA88E", border: "1px solid rgba(139,168,142,0.25)" }}
              >
                <Lightbulb size={13} /> Thinking
                <X size={13} onClick={() => { setThinking(false); setSelectedModel(FEATURE_MODELS.DEFAULT); }} />
              </div>
            )}
            {deepThinking && (
              <div
                className="flex items-center gap-2 px-2.5 py-1 rounded-full cursor-pointer text-xs transition-colors"
                style={{ background: "rgba(139,168,142,0.12)", color: "#8BA88E", border: "1px solid rgba(139,168,142,0.2)" }}
              >
                <Telescope size={13} /> Deep Research
                <X size={13} onClick={() => { setDeepThinking(false); setSelectedModel(FEATURE_MODELS.DEFAULT); }} />
              </div>
            )}
            {webSearch && (
              <div
                className="flex items-center gap-2 px-2.5 py-1 rounded-full cursor-pointer text-xs transition-colors"
                style={{ background: "rgba(139,168,142,0.12)", color: "#8BA88E", border: "1px solid rgba(139,168,142,0.2)" }}
              >
                <Globe size={13} /> Web Search
                <X size={13} onClick={() => { setWebSearch(false); setSelectedModel(FEATURE_MODELS.DEFAULT); }} />
              </div>
            )}
          </div>
        )}
      </motion.div>

      <div className="text-center mt-3">
        <span className="text-[11px] font-medium" style={{ color: "var(--txt-muted)" }}>
          aura can make mistakes. Verify critical information.
        </span>
      </div>
    </div>
  );
});

export default ChatInput;
