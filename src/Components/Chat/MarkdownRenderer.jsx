import React, { useContext, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";
import TableBlock from "./TableBlock";

export const TableContext = React.createContext(false);

export function useMarkdownComponents() {
  return useMemo(
    () => ({
      code({ node, inline, className, children, ...props }) {
        const inTable = useContext(TableContext);
        const match = /language-(\w+)/.exec(className || "");
        const lang = match ? match[1] : null;
        const content = String(children).replace(/\n$/, "");
        const isOneLine = !content.includes("\n");
        const isShort = content.length < 60;

        // Force inline rendering for short content even if markdown said it's a block
        // We do this for plain text, null language, or explicitly marked "text" blocks.
        const isPlain = !lang || lang === "text" || lang === "markdown" || lang === "txt";
        const shouldBeInline = inline || (isOneLine && isShort && isPlain);

        // If it's a multi-line block, or a long block, or a labeled language block (not plain),
        // we use the full CodeBlock.
        if (!shouldBeInline && (inTable || !inline)) {
          return <CodeBlock language={lang || "text"}>{children}</CodeBlock>;
        }

        return (
          <code
            className="font-sans text-[0.875em] bg-theme-primary/15 dark:bg-gray-500/50 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-md font-medium break-all"
            {...props}
          >
            {content}
          </code>
        );
      },
      ul({ children }) {
        return (
          <ul className="my-2 p-0 list-none flex flex-col gap-1.5 [&_ul]:mt-1 [&_ul]:mb-1 [&_ul]:ml-2 [&_ul]:pl-3 [&_ul]:border-l-2 [&_ul]:border-theme-primary/20 dark:[&_ul]:border-theme-primary/15">
            {children}
          </ul>
        );
      },
      ol({ children }) {
        return (
          <ol className="my-2 p-0 list-none flex flex-col gap-1.5 [&_ol]:mt-1 [&_ol]:mb-1 [&_ol]:ml-2 [&_ol]:pl-3 [&_ol]:border-l-2 [&_ol]:border-theme-primary/20 dark:[&_ol]:border-theme-primary/15">
            {children}
          </ol>
        );
      },
      li({ children, index, ordered }) {
        return (
          <li className="flex items-start gap-2.5 px-2.5 py-[5px] rounded-lg list-none transition-colors">
            {ordered ? (
              <span className="shrink-0 min-w-[22px] h-[22px] flex items-center justify-center text-[11px] font-semibold text-theme-primary bg-theme-primary/15 dark:bg-theme-primary/10 border border-theme-primary/20 dark:border-theme-primary/15 rounded-md font-sans tracking-[-0.3px] mt-px">
                {`${(index ?? 0) + 1}.`}
              </span>
            ) : (
              <span className="shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-linear-to-br from-theme-primary to-theme-secondary shadow-[0_0_6px_rgba(27,208,150,0.35)]" />
            )}
            <span className="flex-1 leading-[1.6]">{children}</span>
          </li>
        );
      },
      h1({ children }) {
        return <h1 className="text-2xl font-bold mt-5 mb-2 leading-tight" style={{ color: "var(--paper)", fontFamily: "inherit" }}>{children}</h1>;
      },
      h2({ children }) {
        return <h2 className="text-xl font-semibold mt-4 mb-2 leading-tight" style={{ color: "var(--paper)", fontFamily: "inherit" }}>{children}</h2>;
      },
      h3({ children }) {
        return <h3 className="text-lg font-semibold mt-3 mb-1.5 leading-snug" style={{ color: "var(--paper)", fontFamily: "inherit" }}>{children}</h3>;
      },
      h4({ children }) {
        return <h4 className="text-base font-semibold mt-3 mb-1" style={{ color: "var(--txt-secondary)", fontFamily: "inherit" }}>{children}</h4>;
      },
      h5({ children }) {
        return <h5 className="text-sm font-semibold mt-2 mb-1" style={{ color: "var(--txt-secondary)", fontFamily: "inherit" }}>{children}</h5>;
      },
      h6({ children }) {
        return <h6 className="text-xs font-semibold uppercase tracking-wider mt-2 mb-1" style={{ color: "var(--txt-muted)", fontFamily: "inherit" }}>{children}</h6>;
      },
      p({ children }) {
        return <p className="leading-[1.75] my-2" style={{ color: "var(--txt-secondary)", fontFamily: "inherit" }}>{children}</p>;
      },
      table({ children }) {
        return (
          <TableContext.Provider value={true}>
            <TableBlock>{children}</TableBlock>
          </TableContext.Provider>
        );
      },
      tr({ children }) {
        return <tr className="border-b border-gray-200 dark:border-theme-border last:border-b-0">{children}</tr>;
      },
      td({ children }) {
        return <td className="px-3 py-2 text-left border-r border-gray-200 dark:border-theme-border last:border-r-0">{children}</td>;
      },
      th({ children }) {
        return <th className="px-3 py-2 text-left border-r border-gray-200 dark:border-theme-border last:border-r-0 bg-gray-500/2 dark:bg-white/5 font-semibold text-theme-secondary">{children}</th>;
      },
    }),
    []
  );
}

export default function MarkdownRenderer({ content }) {
  const mdComponents = useMarkdownComponents();
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
      {content}
    </ReactMarkdown>
  );
}
