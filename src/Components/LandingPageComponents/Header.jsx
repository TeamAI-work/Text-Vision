import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const nav = useNavigate()
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const { scrollY } = useScroll();

  const bgColor = theme === 'dark' ? '13,13,14' : '251,251,249';
  const headerBg = useTransform(scrollY, [0, 80], [`rgba(${bgColor},0)`, `rgba(${bgColor},0.85)`]);
  const headerPadY = useTransform(scrollY, [0, 80], [28, 14]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const isLight = document.documentElement.classList.contains('light');
    const newTheme = isLight ? 'dark' : 'light';
    
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

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

        <div className="flex items-center gap-6 md:gap-10">
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
          </nav>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 border border-[var(--border-medium)] rounded-full text-txt-secondary hover:text-paper hover:border-sage transition-all duration-300 flex items-center justify-center"
              aria-label="Toggle theme"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </motion.button>

            <motion.button
              onClick={() => nav("/auth")}
              className="hidden sm:block text-sm font-medium px-6 py-2.5 border border-[var(--border-medium)] rounded-full text-paper tracking-wide hover:bg-sage hover:border-sage hover:text-obsidian transition-all duration-300"
              id="header-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
            </motion.button>

            <button
              className="flex md:hidden flex-col gap-[5px] p-1 ml-2"
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
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="md:hidden absolute top-full left-0 right-0 bg-obsidian backdrop-blur-xl border-b border-[var(--border-subtle)] px-5 pb-6 pt-2 flex flex-col gap-4"
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
              onClick={()=>{nav('/auth')}}
              className="text-sm font-medium px-6 py-2.5 border border-[var(--border-medium)] rounded-full text-paper w-full mt-2 hover:bg-sage hover:text-obsidian transition-colors"
            >
              Get Started
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
