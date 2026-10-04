import { cn } from '@/lib/cn'

/** Brand spinner: a gradient arc on a faint track. */
export const Spinner = ({ className, label }: { className?: string; label?: string }) => (
  <span
    role={label ? 'status' : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
    className={cn('relative inline-block size-9', className)}
  >
    <svg
      viewBox="0 0 36 36"
      className="absolute inset-0 size-full animate-spin [animation-duration:0.9s]"
    >
      <defs>
        <linearGradient id="oq-spinner" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2FA8FF" />
          <stop offset="1" stopColor="#064DFB" />
        </linearGradient>
      </defs>
      <circle
        cx="18"
        cy="18"
        r="15"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="2.5"
      />
      <circle
        cx="18"
        cy="18"
        r="15"
        fill="none"
        stroke="url(#oq-spinner)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="26 68"
      />
    </svg>
  </span>
)

/**
 * Sits underneath a large image: a shimmer and spinner that the photo simply paints over once it
 * arrives. Pure CSS — nothing to get stuck, and no delay to the first paint.
 * Put it before the image inside the same positioned container; pass the image's z-layer if it has one.
 */
export const ImageLoading = ({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'dark'
  className?: string
}) => (
  <span
    aria-hidden
    className={cn(
      'absolute inset-0 grid place-items-center overflow-hidden',
      tone === 'dark' ? 'bg-[#0d1220] text-white' : 'bg-surface-2 text-fg',
      className,
    )}
  >
    <span className="absolute inset-0 animate-[shimmer_1.6s_ease-in-out_infinite] bg-[linear-gradient(100deg,transparent_20%,rgb(255_255_255/0.08)_50%,transparent_80%)] bg-[length:200%_100%]" />
    <Spinner className="size-8 opacity-80" />
  </span>
)
