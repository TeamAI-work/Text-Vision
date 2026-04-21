import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const shapes = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random(), y: Math.random(),
      size: 80 + Math.random() * 200,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.003,
      sides: 3 + Math.floor(Math.random() * 4),
      driftX: (Math.random() - 0.5) * 0.0002,
      driftY: (Math.random() - 0.5) * 0.0002,
      alpha: 0.02 + Math.random() * 0.04,
      phaseOffset: i * 0.5,
    }));

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

    function drawPolygon(cx, cy, radius, sides, rotation) {
      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const angle = (i * 2 * Math.PI) / sides + rotation;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      for (const shape of shapes) {
        shape.x += shape.driftX; shape.y += shape.driftY; shape.rotation += shape.rotSpeed;
        if (shape.x < -0.2) shape.x = 1.2; if (shape.x > 1.2) shape.x = -0.2;
        if (shape.y < -0.2) shape.y = 1.2; if (shape.y > 1.2) shape.y = -0.2;
        const cx = shape.x * canvas.width, cy = shape.y * canvas.height;
        const pulse = Math.sin(time + shape.phaseOffset) * 0.15 + 1;
        drawPolygon(cx, cy, shape.size * pulse, shape.sides, shape.rotation);
        ctx.strokeStyle = `rgba(139, 168, 142, ${shape.alpha})`;
        ctx.lineWidth = 1; ctx.stroke();
      }
      animId = requestAnimationFrame(render);
    }

    resize(); render();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden" id="hero">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" aria-hidden="true" />

      <motion.div className="relative z-10 text-center"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal tracking-tighter leading-none text-paper">
          Deep text<span className="text-sage">.</span> Sharp vision<span className="text-sage">.</span>
        </h1>
        <motion.p className="mt-6 text-base md:text-lg text-txt-secondary font-light tracking-widest"
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Your data, finally understood.
        </motion.p>
      </motion.div>

      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-txt-muted"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <span className="text-xs tracking-[0.15em] uppercase">Scroll to Explore</span>
        <div className="w-5 h-5 border-r border-b border-txt-muted animate-bounce-chevron" />
      </motion.div>
    </section>
  );
}
