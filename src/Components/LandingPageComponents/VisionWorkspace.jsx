import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Reveal } from './useScrollReveal';
import image from "../../assets/image.png"

export default function VisionWorkspace() {
  const containerRef = useRef(null);
  const isImageInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section className="relative py-20 md:py-32 lg:py-40 bg-elevated" id="vision-workspace">
      <div className="vision-gradient-top" />
      <div className="vision-gradient-bottom" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-16 relative z-10 w-full">
            <p className="text-xs font-medium text-sage tracking-[0.15em] uppercase mb-5">multimodal intelligence</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-paper mb-4 tracking-tight">Vision Engine</h2>
            <p className="text-base text-txt-secondary max-w-[550px] mx-auto">
              Chat directly with your visual data. Upload complex architectures,
              handwritten notes, or UI mockups and let the reasoning engine extract precise structured data instantly.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="relative max-w-[900px] mx-auto mb-16 rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-slate shadow-2xl grid grid-cols-1 lg:grid-cols-2"
            ref={containerRef} id="analysis-container"
          >
            {/* Left: Image Viewer */}
            <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] bg-obsidian relative flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-txt-muted bg-white/[0.03] px-3 py-1.5 rounded-lg border border-[var(--border-subtle)]">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                  architecture-v2.png
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-sage animate-pulse shadow-[0_0_8px_rgba(139,168,142,0.8)]" />
              </div>

              <div className="relative rounded-xl overflow-hidden border border-[var(--border-medium)] flex-grow aspect-square lg:aspect-auto min-h-[300px]">
                <img src={image} alt="Architecture Diagram" className="absolute inset-0 w-full h-full object-cover opacity-80" draggable={false} />

                {/* AI Detection Bounding Box */}
                {isImageInView && (
                  <motion.div className="absolute border-[1.5px] border-sage bg-sage/10 rounded-md backdrop-blur-[1px]"
                    initial={{ top: '25%', left: '35%', width: '30%', height: '20%', opacity: 0 }}
                    animate={{ top: '35%', left: '20%', width: '45%', height: '35%', opacity: 1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  >
                    <div className="absolute -top-3 -right-2 bg-sage text-obsidian text-[9px] font-bold px-1.5 py-0.5 rounded shadow">DB CLUSTER</div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right: Chat Output */}
            <div className="p-6 lg:p-8 flex flex-col justify-end bg-slate relative">
              <div className="flex flex-col gap-5 overflow-hidden">

                <motion.div className="flex items-start gap-3 flex-row-reverse"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isImageInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-xs font-medium text-txt-secondary shrink-0">Y</div>
                  <div className="px-4 py-3 bg-sage/10 text-paper text-[13px] leading-relaxed rounded-2xl max-w-[85%] border border-sage/15 shadow-sm">
                    Can you identify the core database components in this diagram and extract them as JSON?
                  </div>
                </motion.div>

                <motion.div className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isImageInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <div className="w-7 h-7 rounded-full bg-[var(--sage-glow)] border border-sage/30 flex text-sage items-center justify-center text-xs font-bold shrink-0">A</div>
                  <div className="px-4 py-3.5 bg-white/[0.03] border border-[var(--border-subtle)] text-[#d4d4d8] text-[13px] leading-relaxed rounded-2xl max-w-[90%] shadow-sm w-full">
                    <p className="mb-3 text-txt-secondary">I see a schematic of the Transformer architecture, which is the foundational engine that allows me to process your prompts and generate these words through a dual-stack system of Encoders (to "read" and understand you) and Decoders (to "write" my response).
                      <br /> <br /> The image highlights the Multi-Head Attention blocks, which act like my internal spotlight, allowing me to focus on the most important words in your message regardless of how long or complex it is.</p>

                    {/* <div className="bg-obsidian rounded-xl border border-[var(--border-subtle)] overflow-hidden">
                      <div className="px-3 py-1.5 text-[10px] text-txt-muted border-b border-[var(--border-subtle)] flex items-center justify-between">
                        <span>json</span>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      </div>
                      <pre className="p-3 font-mono text-[11px] text-sage overflow-x-auto">
{`{
  "cluster": {
    "primary": "PostgreSQL",
    "cache": "Redis",
    "storage": "S3 Bucket"
  },
  "status": "active",
  "nodes": 3
}`}
                      </pre>
                    </div> */}
                  </div>
                </motion.div>

              </div>

              {/* Fake typing indicator bar */}
              <motion.div className="mt-6 pt-5 border-t border-[var(--border-subtle)]"
                initial={{ opacity: 0 }}
                animate={isImageInView ? { opacity: 1 } : {}}
                transition={{ delay: 2 }}
              >
                <div className="w-full h-10 bg-obsidian rounded-full border border-[var(--border-medium)] flex items-center px-4 gap-2">
                  <span className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  <span className="text-txt-muted text-[11px] font-mono ml-2">Waiting for next prompt...</span>
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
