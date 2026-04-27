import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GmsLogo from './GmsLogo';


export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const navigate = useNavigate()

  const red = "#FF0000"

  const links = [
    { name: 'Solutions', href: '#' },
    { name: 'Terms & Services', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Contact GMS', href: '/contact-support' }
  ];

  return (
    <section className="relative pt-20 md:pt-32 pb-10 text-center" id="footer" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">

        <motion.h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-paper mb-5 tracking-tight"
          initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >Ready to unlock your data?</motion.h2>

        <motion.p className="text-base text-txt-secondary mb-12"
          initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >Join the early access program and experience the future of AI-native intelligence.</motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center max-w-[440px] mx-auto mb-28 border border-[var(--border-medium)] rounded-full focus-within:border-sage transition-colors duration-300 p-1 bg-obsidian"
          id="cta-form"
          initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <input type="email" placeholder="your@email.com" aria-label="Email address" id="cta-email"
            className="flex-1 rounded-full px-5 py-3.5 text-sm text-paper bg-transparent placeholder:text-txt-muted w-full sm:w-auto text-center sm:text-left"
          />
          <button type="button" id="cta-submit"
            className="px-7 py-3.5 bg-sage text-obsidian rounded-full text-sm font-medium whitespace-nowrap hover:bg-sage-dim hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 w-[calc(100%-8px)] sm:w-auto shadow-lg"
          >Get Early Access</button>
        </motion.div>

        {/* Footer Bottom Bar */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border-medium)] to-transparent mb-8" />

        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6 w-full"
          initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          {/* Branding */}
          <div className="flex items-center gap-3">
            <GmsLogo />
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            {links.map((link) => (
              link.name === 'Solutions' ? (
                <span key={link.name}
                  className="text-xs text-txt-muted hover:text-paper transition-colors duration-300 tracking-wide cursor-pointer">
                  <a href="#workspace">
                    {link.name}
                  </a>
                </span>
              ) : (
                <span
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    navigate(link.href)
                  }}
                  className="text-xs text-txt-muted hover:text-paper transition-colors duration-300 tracking-wide">
                  {link.name}
                </span>
              )
            ))}
          </div>

          {/* LinkedIn + Copyright */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-txt-muted/50 tracking-wider">&copy; {new Date().getFullYear()} GMS</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
