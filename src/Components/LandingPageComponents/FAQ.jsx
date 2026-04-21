import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const faqData = [
  { q: 'What makes Aura different from ChatGPT or Midjourney?',
    a: 'Aura combines both text and vision AI in a single unified workspace. Instead of switching between apps, you draft ideas in the text domain and seamlessly bridge them into the vision domain — all within one context-aware environment.' },
  { q: 'Is my data stored on your servers?',
    a: 'Aura is local-first by design. All processing happens on your machine by default. Cloud sync is optional and end-to-end encrypted. You own your data, always.' },
  { q: 'What AI models power Aura?',
    a: 'Aura dynamically routes between specialized models — optimized LLMs for reasoning and conversation, Diffusion-based pipelines for image generation and editing, and vector stores for semantic search across your entire workspace history.' },
  { q: 'Can I use Aura for commercial projects?',
    a: 'Yes. All outputs generated through Aura are yours to use commercially. No attribution required, no usage restrictions on the content you create.' },
  { q: 'Is there a developer API?',
    a: "Absolutely. Aura exposes a full REST and WebSocket API for programmatic access. Automate workflows, build custom integrations, or embed Aura's capabilities directly into your own applications." },
  { q: 'What platforms are supported?',
    a: 'Aura runs natively on macOS, Windows, and Linux. A web-based version is available for quick access, though the desktop app offers the best performance and full local-first capabilities.' },
];

function FAQItem({ item, isOpen, onToggle, index, isInView }) {
  return (
    <motion.div className="border-b border-[var(--border-subtle)]"
      initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="w-full flex items-center justify-between py-6 text-base text-left text-paper hover:text-sage transition-colors duration-300 group"
        onClick={onToggle} aria-expanded={isOpen}
      >
        <span>{item.q}</span>
        <motion.svg className="w-5 h-5 text-txt-muted shrink-0 ml-4 group-hover:text-sage transition-colors"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="pb-6 text-sm text-txt-secondary leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="relative py-20 md:py-32 lg:py-40" id="faq" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-paper tracking-tight">Frequently Asked</h2>
        </motion.div>

        <div className="max-w-[700px] mx-auto">
          {faqData.map((item, i) => (
            <FAQItem key={i} item={item} index={i}
              isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
