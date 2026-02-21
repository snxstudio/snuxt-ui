import { useInView } from '../hooks/useInView'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge?: React.ReactNode
}

export function SectionHeader({ title, subtitle, badge }: SectionHeaderProps) {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className="text-center mb-12"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 700ms ease-out, transform 700ms ease-out',
      }}
    >
      {badge && <div className="mb-4 flex justify-center">{badge}</div>}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}
