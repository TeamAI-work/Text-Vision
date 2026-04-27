import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Loader2, ArrowRight, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// ── Animated polygon canvas (same as Hero) ──────────────────────────────────
function PolygonCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId
        let time = 0

        const shapes = Array.from({ length: 10 }, (_, i) => ({
            x: Math.random(), y: Math.random(),
            size: 60 + Math.random() * 180,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.003,
            sides: 3 + Math.floor(Math.random() * 4),
            driftX: (Math.random() - 0.5) * 0.0002,
            driftY: (Math.random() - 0.5) * 0.0002,
            alpha: 0.02 + Math.random() * 0.035,
            phaseOffset: i * 0.5,
        }))

        function resize() {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        function drawPolygon(cx, cy, radius, sides, rotation) {
            ctx.beginPath()
            for (let i = 0; i <= sides; i++) {
                const angle = (i * 2 * Math.PI) / sides + rotation
                const x = cx + radius * Math.cos(angle)
                const y = cy + radius * Math.sin(angle)
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
            }
            ctx.closePath()
        }

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            time += 0.01
            for (const shape of shapes) {
                shape.x += shape.driftX; shape.y += shape.driftY; shape.rotation += shape.rotSpeed
                if (shape.x < -0.2) shape.x = 1.2; if (shape.x > 1.2) shape.x = -0.2
                if (shape.y < -0.2) shape.y = 1.2; if (shape.y > 1.2) shape.y = -0.2
                const cx = shape.x * canvas.width, cy = shape.y * canvas.height
                const pulse = Math.sin(time + shape.phaseOffset) * 0.15 + 1
                drawPolygon(cx, cy, shape.size * pulse, shape.sides, shape.rotation)
                ctx.strokeStyle = `rgba(139, 168, 142, ${shape.alpha})`
                ctx.lineWidth = 1; ctx.stroke()
            }
            animId = requestAnimationFrame(render)
        }

        resize(); render()
        window.addEventListener('resize', resize)
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 opacity-40 pointer-events-none"
            aria-hidden="true"
        />
    )
}

// ── Styled input field ────────────────────────────────────────────────────────
function Field({ icon: Icon, type, value, onChange, placeholder, required }) {
    const [focused, setFocused] = useState(false)

    return (
        <div
            className="relative flex items-center rounded-xl transition-all duration-200"
            style={{
                background: "var(--charcoal)",
                border: `1px solid ${focused ? 'rgba(139,168,142,0.5)' : 'var(--border-subtle)'}`,
                boxShadow: focused ? '0 0 0 3px rgba(139,168,142,0.08)' : 'none',
            }}
        >
            <div className="pl-4 shrink-0">
                <Icon
                    size={16}
                    style={{ color: focused ? '#8BA88E' : 'var(--txt-muted)', transition: 'color 0.2s' }}
                />
            </div>
            <input
                type={type}
                required={required}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={placeholder}
                className="w-full bg-transparent py-3 pl-3 pr-4 text-sm outline-none"
                style={{
                    color: "var(--paper)",
                    caretColor: "#8BA88E",
                }}
            />
        </div>
    )
}

// ── Main Auth component ───────────────────────────────────────────────────────
export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const handleAuth = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({ email, username, password })
                if (error) throw error
                setMessage('Registration successful! Please check your email for a verification link.')

                const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
                if (signInError) throw signInError

                const { data: { user: currentUser } } = await supabase.auth.getUser()
                const { error: profileError } = await supabase
                    .from('users')
                    .insert({ user_id: currentUser.id, username })
                if (profileError) throw profileError
                navigate('/welcome')
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password })
                if (error) throw error
                navigate('/welcome')
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const switchMode = () => {
        setIsSignUp(v => !v)
        setError(null)
        setMessage(null)
        setPassword('')
    }

    return (
        <div
            className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden"
            style={{ background: "var(--obsidian)", color: "var(--paper)", fontFamily: "'Inter', sans-serif" }}
        >
            <PolygonCanvas />

            {/* Subtle sage glow blob */}
            <div
                className="absolute pointer-events-none"
                style={{
                    top: '-20%', left: '50%', transform: 'translateX(-50%)',
                    width: '60%', height: '60%',
                    background: 'radial-gradient(circle, rgba(139,168,142,0.07) 0%, transparent 70%)',
                    filter: 'blur(40px)'
                }}
            />

            <motion.div
                key={isSignUp ? 'signup' : 'signin'}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-[420px]"
            >
                {/* Brand mark */}
                <div className="flex flex-col items-center mb-10">
                    <a
                        href="/"
                        className="font-serif text-4xl tracking-tight mb-6 select-none"
                        style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "var(--paper)", letterSpacing: "-0.02em" }}
                    >
                        aura<span style={{ color: "#8BA88E" }}>.</span>
                    </a>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isSignUp ? 'h-signup' : 'h-signin'}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="text-center"
                        >
                            <h1
                                className="text-2xl mb-2"
                                style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "var(--paper)", letterSpacing: "-0.01em", lineHeight: 1.2 }}
                            >
                                {isSignUp ? 'Create your account' : 'Welcome back'}
                            </h1>
                            <p className="text-sm font-light tracking-wide" style={{ color: "var(--txt-secondary)" }}>
                                {isSignUp
                                    ? 'Start reasoning deeply with aura.'
                                    : 'Sign in to continue to your workspace.'}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Card */}
                <div
                    className="rounded-2xl p-8"
                    style={{
                        background: "var(--charcoal)",
                        border: "1px solid var(--border-subtle)",
                        boxShadow: "0 24px 60px rgba(0,0,0,0.4)"
                    }}
                >
                    <form onSubmit={handleAuth} className="flex flex-col gap-4">

                        {/* Feedback banners */}
                        <AnimatePresence mode="popLayout">
                            {error && (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-4 py-3 rounded-xl text-[13px] font-medium"
                                    style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
                                >
                                    {error}
                                </motion.div>
                            )}
                            {message && (
                                <motion.div
                                    key="message"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-4 py-3 rounded-xl text-[13px] font-medium"
                                    style={{ background: "rgba(139,168,142,0.1)", border: "1px solid rgba(139,168,142,0.25)", color: "#8BA88E" }}
                                >
                                    {message}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Input fields */}
                        <AnimatePresence>
                            {isSignUp && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <Field
                                        icon={User}
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        placeholder="Username"
                                        required
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Field
                            icon={Mail}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            required
                        />

                        <Field
                            icon={Lock}
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed group mt-1"
                            style={{
                                background: "#8BA88E",
                                color: "#0D0D0E",
                                boxShadow: "0 4px 20px rgba(139,168,142,0.2)"
                            }}
                            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#7a9a7d" }}
                            onMouseLeave={e => { e.currentTarget.style.background = "#8BA88E" }}
                        >
                            {loading ? (
                                <Loader2 size={17} className="animate-spin" />
                            ) : (
                                <>
                                    {isSignUp ? 'Create account' : 'Sign in'}
                                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
                        <span className="text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--txt-muted)" }}>or</span>
                        <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
                    </div>

                    {/* Toggle sign-in / sign-up */}
                    <p className="text-center text-sm" style={{ color: "var(--txt-secondary)" }}>
                        {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                        <button
                            onClick={switchMode}
                            className="font-medium transition-colors focus:outline-none"
                            style={{ color: "#8BA88E" }}
                            onMouseEnter={e => e.currentTarget.style.color = "#a8c8ab"}
                            onMouseLeave={e => e.currentTarget.style.color = "#8BA88E"}
                        >
                            {isSignUp ? 'Sign in' : 'Sign up'}
                        </button>
                    </p>
                </div>

                {/* Footer note */}
                <p className="text-center text-[11px] mt-6 tracking-wide" style={{ color: "var(--txt-muted)" }}>
                    By continuing you agree to our Terms of Service &amp; Privacy Policy.
                </p>
            </motion.div>
        </div>
    )
}