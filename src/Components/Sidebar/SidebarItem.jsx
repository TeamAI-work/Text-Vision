import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, Plus } from "lucide-react";

export function ActionMenu({ onRename, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -5 }}
      className="absolute top-8 right-0 text-sm p-1.5 rounded-xl shadow-xl w-32 flex flex-col gap-1 z-50 origin-top-right backdrop-blur-md"
      style={{
        background: "var(--charcoal)",
        border: "1px solid var(--border-medium)",
        color: "var(--paper)"
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onRename(); }}
        className="text-left px-3 py-2 rounded-lg cursor-pointer transition-all w-full font-medium text-sm"
        style={{ color: "var(--txt-secondary)" }}
        onMouseEnter={e => { e.currentTarget.style.background = "var(--overlay-subtle)"; e.currentTarget.style.color = "var(--paper)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--txt-secondary)"; }}
      >
        Rename
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="text-left px-3 py-2 rounded-lg cursor-pointer transition-all w-full font-medium text-sm"
        style={{ color: "#f87171" }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        Delete
      </button>
    </motion.div>
  );
}

export default function SidebarItem({
  icon: Icon,
  label,
  isActive,
  onClick,
  onRename,
  onDelete,
  children,
  className = "",
  iconColor = "sage",
  isRenaming,
  renamingValue,
  setRenamingValue,
  onRenameSubmit,
  onRenameCancel,
  onnewprojectchat,
  projctId,
  isproject,
  isExpanded
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-1 cursor-pointer w-full py-2 px-2 rounded-xl transition-all relative ${className}`}
      style={{
        background: isActive ? "var(--overlay-medium)" : "transparent",
        border: isActive ? "1px solid var(--border-subtle)" : "1px solid transparent"
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "var(--overlay-subtle)"; }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
    >
      {children}
      <div className="flex items-center gap-2 flex-1 min-w-0 pr-1">
        {Icon && (
          <Icon
            size={14}
            strokeWidth={2}
            className="shrink-0 transition-colors"
            style={{ color: isActive ? "#8BA88E" : "var(--txt-muted)" }}
          />
        )}

        {isRenaming ? (
          <input
            autoFocus
            className="outline-none bg-transparent w-full truncate cursor-text text-sm pb-px"
            style={{
              color: "var(--paper)",
              borderBottom: "1px solid rgba(139,168,142,0.5)"
            }}
            type="text"
            value={renamingValue}
            onChange={(e) => setRenamingValue(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter") onRenameSubmit();
              else if (e.key === "Escape") onRenameCancel();
            }}
            onBlur={onRenameSubmit}
          />
        ) : (
          <span
            className="outline-none bg-transparent w-full truncate cursor-pointer text-sm transition-colors"
            style={{ color: isActive ? "var(--paper)" : "var(--txt-secondary)" }}
          >
            {label || 'Untitled'}
          </span>
        )}
      </div>

      <div className="flex justify-center">
        {isproject && isExpanded && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onnewprojectchat(projctId);
            }}
            className="p-1.5 opacity-0 group-hover:opacity-100 rounded-lg shrink-0 transition-all"
            style={{ color: "var(--txt-muted)" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.background = "var(--overlay-medium)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--txt-muted)"; e.currentTarget.style.background = "transparent"; }}
          >
            <Plus size={14} />
          </div>
        )}

        <button
          className="p-1.5 opacity-0 group-hover:opacity-100 rounded-lg shrink-0 transition-all"
          style={{ color: "var(--txt-muted)" }}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.background = "var(--overlay-medium)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--txt-muted)"; e.currentTarget.style.background = "transparent"; }}
        >
          <MoreHorizontal size={14} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <ActionMenu
            onRename={() => { setMenuOpen(false); onRename(); }}
            onDelete={() => { setMenuOpen(false); onDelete(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
