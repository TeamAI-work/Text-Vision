import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const fullText = "Extract clarity from documents. Derive insight from images. All in one studio.";

export default function Philosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const characters = Array.from(fullText);

  return (
    <section
      className="relative py-20 md:py-32 lg:py-40 flex items-center justify-center min-h-[80vh]"
      id="philosophy"
      ref={containerRef}
    >
      <motion.div className="max-w-[800px] mx-auto px-5 md:px-10 lg:px-16" style={{ y }}>
        <p
          className="font-serif text-3xl md:text-4xl lg:text-5xl leading-snug text-paper max-w-[680px] mx-auto text-center tracking-tight"
          ref={ref}
        >
          {characters.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.02, // Reduced delay for character-by-character
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* If the character is a space, render a non-breaking space entity */}
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </section>
  );
}
