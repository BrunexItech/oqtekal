import { cn } from '@/lib/cn'

/**
 * Honesty marker: shown on any item still ticked "Sample content" in the admin,
 * so placeholder people, quotes and results are never presented as real.
 */
export const SampleBadge = ({ show, className }: { show?: boolean | null; className?: string }) =>
  show ? (
    <span
      title="Sample content — will be replaced with real information"
      className={cn(
        'inline-flex items-center rounded-full border border-dashed border-current/50 px-2 py-0.5 text-[0.65rem] font-medium tracking-wider uppercase',
        className,
      )}
    >
      Sample
    </span>
  ) : null
