import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './useScrollReveal';

export default function TextWorkspace() {
  const sectionRef = useRef(null);
  const mockupRef = useRef(null);
  const isMockupInView = useInView(mockupRef, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const mockupY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section className="relative py-20 md:py-32 lg:py-40" id="workspace" ref={sectionRef}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="lg:sticky lg:top-[140px] self-start lg:pr-10">
          <Reveal>
            <p className="text-xs font-medium text-sage tracking-[0.15em] uppercase mb-5">text domain</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-paper mb-6 tracking-tight">The Thinker</h2>
            <p className="text-base text-txt-secondary leading-relaxed max-w-[400px]">
              A deep reasoning engine built for complex thought. Draft long-form
              content, debug intricate code, explore mathematical proofs — all
              within a context-aware workspace that remembers every thread.
            </p>
          </Reveal>
        </div>

        <motion.div ref={mockupRef} style={{ y: mockupY }} className="w-full max-w-[460px] mx-auto lg:ml-auto">
          <motion.div className="bg-slate rounded-2xl border border-[var(--border-subtle)] overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 60, rotateY: -5 }}
            animate={isMockupInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div className="px-4 py-3 border-b border-[var(--border-subtle)] flex items-center gap-1.5 bg-obsidian/50">
              <div className="w-2 h-2 rounded-full dot-red opacity-80" />
              <div className="w-2 h-2 rounded-full dot-yellow opacity-80" />
              <div className="w-2 h-2 rounded-full dot-green opacity-80" />
            </div>

            <div className="p-4 flex flex-col gap-4 max-h-[480px] overflow-y-auto chat-scrollbar">
              <div className="flex gap-2.5 items-start flex-row-reverse">
                <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-semibold bg-[var(--overlay-medium)] text-txt-secondary">Y</div>
                <div className="px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed max-w-[85%] bg-sage/10 text-paper border border-sage/15">
                  Explain the core concept behind the transformer attention mechanism.
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-semibold bg-[var(--sage-glow)] text-sage border border-sage/30">A</div>
                <div className="px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed max-w-[85%] bg-[var(--overlay-subtle)] text-paper border border-[var(--border-subtle)]">
                  <p>The self-attention mechanism computes weighted relationships between all positions in a sequence, allowing the model to dynamically focus on the most relevant parts of the input context.</p>

                  <div className="mt-3 mb-1 px-4 py-3 bg-[var(--overlay-subtle)] rounded-xl border border-[var(--border-subtle)] font-serif text-base text-paper text-center tracking-wide">
                    Attention(Q, K, V) = softmax(QKᵀ / √dₖ) · V
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 items-start flex-row-reverse">
                <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-semibold bg-[var(--overlay-medium)] text-txt-secondary">Y</div>
                <div className="px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed max-w-[85%] bg-sage/10 text-paper border border-sage/15">
                  What's the computational complexity?
                </div>
              </div>

              <motion.div className="mt-2 bg-elevated border border-[var(--border-medium)] rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={isMockupInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="px-3 py-2 text-[10px] font-medium text-sage tracking-wider uppercase border-b border-[var(--border-subtle)] flex items-center gap-1.5 bg-obsidian/40">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16v16H4z" /><path d="M4 9h16" />
                  </svg>
                  Context Sources
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[var(--overlay-subtle)] rounded-lg text-[12px] text-txt-secondary">
                    <svg className="w-3.5 h-3.5 text-sage shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
                    </svg>
                    attention_is_all_you_need.pdf
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[var(--overlay-subtle)] rounded-lg text-[12px] text-txt-secondary">
                    <svg className="w-3.5 h-3.5 text-sage shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                    Previous chat: &quot;Neural Architecture Basics&quot;
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
