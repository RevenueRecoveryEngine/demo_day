'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface Props { text: string; className?: string; style?: React.CSSProperties }

export default function MaskedText({ text, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.3'] })
  const y = useTransform(scrollYProgress, [0, 1], ['100%', '0%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <div ref={ref} style={{ overflow: 'hidden', display: 'inline-block', ...style }} className={className}>
      <motion.span style={{ display: 'inline-block', y, opacity }}>
        {text}
      </motion.span>
    </div>
  )
}
