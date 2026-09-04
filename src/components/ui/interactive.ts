import { cva, type VariantProps } from 'class-variance-authority'

const textLinkVariants = cva(
  'group/link inline-flex items-center gap-2 rounded-[0.7rem] text-sm font-medium text-[color:var(--link-color,currentColor)] transition-[color,opacity,transform] duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring/45 motion-reduce:transition-none [&>[data-slot=link-label]]:relative [&>[data-slot=link-label]]:after:absolute [&>[data-slot=link-label]]:after:right-0 [&>[data-slot=link-label]]:after:bottom-[-0.18em] [&>[data-slot=link-label]]:after:h-px [&>[data-slot=link-label]]:after:w-full [&>[data-slot=link-label]]:after:origin-left [&>[data-slot=link-label]]:after:scale-x-0 [&>[data-slot=link-label]]:after:rounded-full [&>[data-slot=link-label]]:after:bg-[color:var(--link-underline,currentColor)] [&>[data-slot=link-label]]:after:transition-transform [&>[data-slot=link-label]]:after:duration-200 hover:[&>[data-slot=link-label]]:after:scale-x-100 focus-visible:[&>[data-slot=link-label]]:after:scale-x-100 motion-reduce:[&>[data-slot=link-label]]:after:transition-none [&>[data-slot=link-icon]]:transition-transform [&>[data-slot=link-icon]]:duration-200 hover:[&>[data-slot=link-icon]]:translate-x-0.5 focus-visible:[&>[data-slot=link-icon]]:translate-x-0.5 motion-reduce:[&>[data-slot=link-icon]]:transform-none',
  {
    variants: {
      tone: {
        default:
          'text-foreground/88 [--link-color:var(--color-foreground)] [--link-underline:var(--color-accent)] hover:text-foreground',
        muted:
          'text-muted-foreground [--link-color:var(--color-muted-foreground)] [--link-underline:var(--color-primary)] hover:text-foreground',
        primary:
          'text-primary [--link-color:var(--color-primary)] [--link-underline:var(--color-accent)] hover:text-[color-mix(in_oklab,var(--color-primary)_88%,black)]',
        inverse:
          'text-primary-foreground/88 [--link-color:var(--color-primary-foreground)] [--link-underline:color-mix(in_oklab,var(--color-primary-foreground)_88%,var(--color-accent))] hover:text-primary-foreground',
      },
    },
    defaultVariants: {
      tone: 'default',
    },
  },
)

const iconButtonVariants = cva(
  'group/icon-button inline-flex items-center justify-center rounded-full border border-transparent text-foreground transition-[background-color,border-color,color,box-shadow,transform] duration-[160ms] outline-none focus-visible:ring-3 focus-visible:ring-ring/45 active:scale-[0.97] motion-reduce:transition-none motion-reduce:transform-none [&_svg]:shrink-0',
  {
    variants: {
      tone: {
        default:
          'bg-secondary/75 text-secondary-foreground shadow-[0_1px_0_rgba(116,74,38,0.08)] [@media(hover:hover)_and_(pointer:fine)]:hover:border-primary/15 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_10px_24px_rgba(116,74,38,0.12)]',
        subtle: 'bg-transparent text-muted-foreground hover:bg-accent/70 hover:text-foreground',
        inverse: 'bg-white/12 text-primary-foreground hover:bg-white/20 hover:text-white',
      },
      size: {
        sm: 'size-9',
        md: 'size-10',
        lg: 'size-11',
      },
    },
    defaultVariants: {
      tone: 'default',
      size: 'md',
    },
  },
)

const interactiveCardClassName =
  'group/card relative overflow-hidden rounded-[1.35rem] border border-border/90 bg-card/96 transition-[border-color,background-color,box-shadow,transform] duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:border-primary/25 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-card [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_18px_42px_rgba(92,60,35,0.12)] focus-within:-translate-y-0.5 focus-within:border-primary/30 focus-within:shadow-[0_18px_42px_rgba(92,60,35,0.12)] motion-reduce:transition-none motion-reduce:transform-none'

type TextLinkVariants = VariantProps<typeof textLinkVariants>
type IconButtonVariants = VariantProps<typeof iconButtonVariants>

export {
  iconButtonVariants,
  interactiveCardClassName,
  textLinkVariants,
  type IconButtonVariants,
  type TextLinkVariants,
}
