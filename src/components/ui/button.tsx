import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import { Slot } from 'radix-ui'

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[1rem] border border-transparent bg-clip-padding text-sm font-medium text-center transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-[160ms] outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:not-aria-[haspopup]:scale-[0.97] disabled:pointer-events-none disabled:scale-100 disabled:opacity-55 disabled:saturate-50 motion-reduce:transition-none motion-reduce:transform-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-[160ms] motion-reduce:[&_svg]:transition-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[var(--interaction-shadow)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[color-mix(in_oklab,var(--color-primary)_92%,white)] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[var(--interaction-shadow-strong)] focus-visible:border-primary/30',
        outline:
          'border-border/90 bg-secondary/70 text-secondary-foreground shadow-[0_1px_0_rgba(116,74,38,0.06)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:border-primary/20 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/70 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[var(--interaction-shadow)] aria-expanded:border-primary/20 aria-expanded:bg-accent/70 aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:[@media(hover:hover)_and_(pointer:fine)]:hover:bg-input/50',
        secondary:
          'bg-accent text-accent-foreground shadow-[0_1px_0_rgba(116,74,38,0.06)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[color-mix(in_oklab,var(--color-accent)_84%,white)] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[var(--interaction-shadow)] aria-expanded:bg-accent aria-expanded:text-accent-foreground',
        ghost:
          'text-foreground/80 hover:bg-accent/75 hover:text-foreground aria-expanded:bg-accent/75 aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'h-auto rounded-[0.7rem] border-transparent bg-transparent px-0 py-0 text-primary shadow-none hover:bg-transparent hover:text-[color-mix(in_oklab,var(--color-primary)_88%,black)] focus-visible:ring-offset-0 [&>span]:relative [&>span]:after:absolute [&>span]:after:right-0 [&>span]:after:bottom-[-0.18em] [&>span]:after:h-px [&>span]:after:w-full [&>span]:after:origin-left [&>span]:after:scale-x-0 [&>span]:after:rounded-full [&>span]:after:bg-accent [&>span]:after:transition-transform [&>span]:after:duration-200 hover:[&>span]:after:scale-x-100 focus-visible:[&>span]:after:scale-x-100 motion-reduce:[&>span]:after:transition-none hover:[&_svg]:translate-x-0.5 focus-visible:[&_svg]:translate-x-0.5',
      },
      size: {
        default:
          'h-10 px-4 py-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        xs: "h-7 rounded-[0.8rem] px-2.5 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-9 rounded-[0.95rem] px-3.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5',
        lg: 'h-12 px-5 py-3 text-[0.95rem] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',
        icon: 'size-10 rounded-full',
        'icon-xs':
          "size-7 rounded-full in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-9 rounded-full in-data-[slot=button-group]:rounded-md',
        'icon-lg': 'size-11 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<ButtonProps> = ({ asChild = false, className, size, variant, ...props }) => {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
