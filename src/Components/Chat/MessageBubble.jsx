import React, { memo } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Check, Copy, Share } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";

const MessageBubble = memo(function MessageBubble({ msg, copiedText, onCopy, onShare, onViewThinking }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-4 w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className="min-w-0 max-w-[78%]">
        {/* View thinking chip — only for AI messages that have thinking content */}
        {!isUser && msg.thinking && (
          <button
            onClick={() => onViewThinking?.(msg.thinking)}
            className="mb-2.5 flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full transition-all group"
            style={{
              color: "#8BA88E",
              background: "rgba(139,168,142,0.08)",
              border: "1px solid rgba(139,168,142,0.2)"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(139,168,142,0.14)"; e.currentTarget.style.borderColor = "rgba(139,168,142,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(139,168,142,0.08)"; e.currentTarget.style.borderColor = "rgba(139,168,142,0.2)"; }}
          >
            <BrainCircuit size={12} className="group-hover:rotate-12 transition-transform" />
            View thinking
          </button>
        )}

        {/* Message bubble */}
        <div
          className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed w-full overflow-x-auto ${isUser ? "rounded-tr-sm" : "rounded-tl-sm"}`}
          style={isUser ? {
            background: "var(--slate)",
            color: "var(--paper)",
            border: "1px solid var(--border-medium)"
          } : {
            background: "transparent",
            color: "var(--paper)"
          }}
        >
          <div className="whitespace-pre-wrap wrap-break-word min-w-0">
            <MarkdownRenderer content={msg.content} />
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-1.5 flex gap-0.5">
          <button
            className="p-2 rounded-xl transition-all"
            style={{ color: "var(--txt-muted)" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.background = "var(--overlay-subtle)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--txt-muted)"; e.currentTarget.style.background = "transparent"; }}
            onClick={() => onCopy(msg.content, msg.id)}
            title="Copy message"
          >
            {copiedText === msg.id ? <Check size={15} style={{ color: "#8BA88E" }} /> : <Copy size={15} />}
          </button>
          <button
            className="p-2 rounded-xl transition-all"
            style={{ color: "var(--txt-muted)" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.background = "var(--overlay-subtle)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--txt-muted)"; e.currentTarget.style.background = "transparent"; }}
            onClick={onShare}
            title="Share message"
          >
            <Share size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

export default MessageBubble;