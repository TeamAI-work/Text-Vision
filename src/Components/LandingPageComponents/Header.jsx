import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 80], ['rgba(13,13,14,0)', 'rgba(13,13,14,0.85)']);
  const headerPadY = useTransform(scrollY, [0, 80], [28, 14]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { name: 'Thinker', id: 'workspace' },
    { name: 'Analyst', id: 'vision-workspace' },
    { name: 'Workflow', id: 'working' },
    { name: 'Features', id: 'features' }
  ];

  const scrollToFooter = () => {
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ backgroundColor: headerBg }}
      id="aura-header"
    >
      {scrolled && (
        <div className="absolute inset-0 backdrop-blur-xl border-b border-[var(--border-subtle)]" />
      )}
      <motion.div
        className="relative z-10 max-w-[1200px] mx-auto flex items-center justify-between px-5 md:px-10 lg:px-16"
        style={{ paddingTop: headerPadY, paddingBottom: headerPadY }}
      >
        <a href="#" className="font-serif text-2xl tracking-tight text-paper" aria-label="Aura Studio Home">
          aura<span className="text-sage">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-9" id="header-nav">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={`#${item.id}`}
              className="text-sm font-medium text-txt-secondary tracking-wide hover:text-paper transition-colors duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.button
            onClick={scrollToFooter}
            className="text-sm font-medium px-6 py-2.5 border border-[var(--border-medium)] rounded-full text-paper tracking-wide hover:bg-sage hover:border-sage hover:text-obsidian transition-all duration-300"
            id="header-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Early Access
          </motion.button>
        </nav>

        <button
          className="flex md:hidden flex-col gap-[5px] p-1"
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          id="mobile-menu-toggle"
        >
          <motion.span className="block w-[22px] h-[1.5px] bg-paper"
            animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span className="block w-[22px] h-[1.5px] bg-paper"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span className="block w-[22px] h-[1.5px] bg-paper"
            animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="md:hidden absolute top-full left-0 right-0 bg-obsidian/95 backdrop-blur-xl border-b border-[var(--border-subtle)] px-5 pb-6 pt-2 flex flex-col gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <a key={item.name} href={`#${item.id}`}
                className="text-sm font-medium text-txt-secondary tracking-wide py-2 hover:text-sage transition-colors"
                onClick={() => setMobileOpen(false)}
              >{item.name}</a>
            ))}
            <button
              onClick={scrollToFooter}
              className="text-sm font-medium px-6 py-2.5 border border-[var(--border-medium)] rounded-full text-paper w-full mt-2 hover:bg-sage hover:text-obsidian transition-colors"
            >
              Get Early Access
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
