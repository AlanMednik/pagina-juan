/**
 * Reusable animated bike decorations for section backgrounds.
 * Usage: <BikeBg type="wheel" position="left" />
 */
import { motion } from 'framer-motion'

type BikeBgProps = {
  type?: 'wheel' | 'chain' | 'wrench' | 'gear'
  position?: 'left' | 'right' | 'center'
  size?: number
  opacity?: number
  speed?: number
}

export const BikeBg = ({
  type = 'wheel',
  position = 'right',
  size = 400,
  opacity = 0.04,
  speed = 25,
}: BikeBgProps) => {
  const posClass =
    position === 'left'
      ? 'left-[-100px] top-1/2 -translate-y-1/2'
      : position === 'right'
      ? 'right-[-100px] top-1/2 -translate-y-1/2'
      : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'

  return (
    <div
      className={`absolute ${posClass} pointer-events-none select-none z-0`}
      style={{ opacity }}
    >
      {type === 'wheel' && <WheelSVG size={size} speed={speed} />}
      {type === 'gear' && <GearSVG size={size} speed={speed} />}
      {type === 'wrench' && <WrenchSVG size={size} />}
      {type === 'chain' && <ChainSVG size={size} />}
    </div>
  )
}

/* ── Bike Wheel ── */
const WheelSVG = ({ size, speed }: { size: number; speed: number }) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 100 100" fill="none"
    animate={{ rotate: 360 }}
    transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
  >
    <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
    <circle cx="50" cy="50" r="6" stroke="white" strokeWidth="2" />
    <circle cx="50" cy="50" r="2.5" fill="white" />
    {Array.from({ length: 16 }).map((_, i) => {
      const a = (i * 22.5 * Math.PI) / 180
      return (
        <line key={i}
          x1={50 + 6 * Math.cos(a)} y1={50 + 6 * Math.sin(a)}
          x2={50 + 39 * Math.cos(a)} y2={50 + 39 * Math.sin(a)}
          stroke="white" strokeWidth={i % 2 === 0 ? '1' : '0.4'}
        />
      )
    })}
  </motion.svg>
)

/* ── Sprocket / Gear ── */
const GearSVG = ({ size, speed }: { size: number; speed: number }) => (
  <motion.svg
    width={size} height={size} viewBox="0 0 100 100" fill="none"
    animate={{ rotate: -360 }}
    transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
  >
    <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" />
    <circle cx="50" cy="50" r="12" stroke="white" strokeWidth="2" />
    {Array.from({ length: 10 }).map((_, i) => {
      const a = (i * 36 * Math.PI) / 180
      const r1 = 30, r2 = 40
      return (
        <line key={i}
          x1={50 + r1 * Math.cos(a)} y1={50 + r1 * Math.sin(a)}
          x2={50 + r2 * Math.cos(a)} y2={50 + r2 * Math.sin(a)}
          stroke="white" strokeWidth="4" strokeLinecap="round"
        />
      )
    })}
  </motion.svg>
)

/* ── Wrench (floating oscillate) ── */
const WrenchSVG = ({ size }: { size: number }) => (
  <motion.svg
    width={size * 0.5} height={size} viewBox="0 0 40 100" fill="none"
    animate={{ rotate: [0, 15, -15, 0], y: [0, -15, 15, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  >
    {/* Handle */}
    <rect x="17" y="20" width="6" height="60" rx="3" stroke="white" strokeWidth="1.5" />
    {/* Head */}
    <ellipse cx="20" cy="16" rx="10" ry="8" stroke="white" strokeWidth="1.5" />
    <ellipse cx="20" cy="16" rx="4" ry="3" stroke="white" strokeWidth="1" />
  </motion.svg>
)

/* ── Chain links (slow drift) ── */
const ChainSVG = ({ size }: { size: number }) => (
  <motion.svg
    width={size} height={size * 0.3} viewBox="0 0 200 60" fill="none"
    animate={{ x: [0, -40, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
  >
    {Array.from({ length: 8 }).map((_, i) => (
      <g key={i} transform={`translate(${i * 26}, 0)`}>
        <rect x="0" y="18" width="22" height="24" rx="12" stroke="white" strokeWidth="1.5" />
        <rect x="6" y="24" width="10" height="12" rx="6" stroke="white" strokeWidth="1" />
      </g>
    ))}
  </motion.svg>
)
