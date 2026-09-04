'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import { useTheme } from '@/providers/Theme'

/**
 * A compact, explicit control for the public site's colour scheme. The first
 * render is intentionally neutral so it agrees with the server HTML; the
 * current theme is read only after hydration.
 */
export const ThemeToggle: React.FC<Omit<ButtonProps, 'children' | 'onClick'>> = ({ className, ...props }) => {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && theme === 'dark'
  const nextTheme = isDark ? 'light' : 'dark'
  const label = mounted ? `Switch to ${nextTheme} mode` : 'Toggle colour theme'

  return (
    <Button
      {...props}
      aria-label={label}
      className={className}
      onClick={() => setTheme(nextTheme)}
      size="icon-sm"
      title={label}
      type="button"
      variant="ghost"
    >
      {isDark ? <SunIcon aria-hidden /> : <MoonIcon aria-hidden />}
      <span className="sr-only">{label}</span>
    </Button>
  )
}
