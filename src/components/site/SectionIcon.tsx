import {
  Archive,
  Award,
  Factory,
  Globe,
  Layers,
  type LucideIcon,
  Scissors,
  Settings2,
  Shield,
  ShoppingBag,
  Truck,
  Wheat,
} from 'lucide-react'
import React from 'react'

/**
 * Site Pages store an icon by name, because a component reference cannot round-trip
 * through the CMS. The Site Page fields only offer names that appear here, so a
 * selected icon always resolves.
 */
const icons: Record<string, LucideIcon> = {
  archive: Archive,
  award: Award,
  factory: Factory,
  globe: Globe,
  layers: Layers,
  scissors: Scissors,
  'settings-2': Settings2,
  shield: Shield,
  'shopping-bag': ShoppingBag,
  truck: Truck,
  wheat: Wheat,
}

export const SectionIcon: React.FC<{ className?: string; name: string }> = ({
  className,
  name,
}) => {
  const Icon = icons[name]

  return Icon ? <Icon aria-hidden className={className} /> : null
}
