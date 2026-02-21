export interface PopoverConfig {
  onOpenChange?: (open: boolean) => void
}

export function createPopover(config: PopoverConfig = {}) {
  const { onOpenChange } = config

  return {
    getTriggerProps: (isOpen: boolean) => ({
      'aria-haspopup': true as const,
      'aria-expanded': isOpen,
      onClick: () => onOpenChange?.(!isOpen),
    }),
    getContentProps: (isOpen: boolean) => ({
      role: 'dialog' as const,
      hidden: !isOpen || undefined,
      onKeyDown: (e: KeyboardEvent) => {
        if (e.key === 'Escape') onOpenChange?.(false)
      },
    }),
  }
}
