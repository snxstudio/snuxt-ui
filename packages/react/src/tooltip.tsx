import { cn } from '@snx-ui/core'
import { useTooltip } from './hooks/use-tooltip'

export interface TooltipProps {
  content: React.ReactNode
  delay?: number
  children: React.ReactElement
  className?: string
  side?: 'top' | 'bottom'
}

export function Tooltip({ content, delay, children, className, side = 'top' }: TooltipProps) {
  const tooltip = useTooltip({ delay })

  const positionClasses = side === 'top'
    ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
    : 'top-full left-1/2 -translate-x-1/2 mt-2'

  return (
    <div className="relative inline-flex" {...tooltip.getTriggerProps()}>
      {children}
      {tooltip.open && (
        <div
          className={cn('snx-tooltip-content absolute', positionClasses, className)}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  )
}

export { useTooltip } from './hooks/use-tooltip'
