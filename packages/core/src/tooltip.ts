export interface TooltipConfig {
  delay?: number
  onOpenChange?: (open: boolean) => void
}

export function createTooltip(config: TooltipConfig = {}) {
  const { delay = 700, onOpenChange } = config
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  function clearDelay() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  function openWithDelay() {
    clearDelay()
    timeoutId = setTimeout(() => {
      onOpenChange?.(true)
    }, delay)
  }

  function close() {
    clearDelay()
    onOpenChange?.(false)
  }

  return {
    getTriggerProps: () => ({
      onMouseEnter: () => openWithDelay(),
      onMouseLeave: () => close(),
      onFocus: () => openWithDelay(),
      onBlur: () => close(),
    }),
    getContentProps: (isOpen: boolean) => ({
      role: 'tooltip' as const,
      hidden: !isOpen || undefined,
    }),
    destroy: () => clearDelay(),
  }
}
