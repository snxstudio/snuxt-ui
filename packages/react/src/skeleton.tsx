import { cn } from '@snx-ui/core'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('snx-skeleton', className)} {...props} />
}
