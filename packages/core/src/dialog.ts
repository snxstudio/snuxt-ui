export interface DialogConfig {
  modal?: boolean
  onOpenChange?: (open: boolean) => void
}

export function createDialog(config: DialogConfig = {}) {
  const { modal = true, onOpenChange } = config

  return {
    getTriggerProps: (isOpen: boolean) => ({
      'aria-haspopup': 'dialog' as const,
      'aria-expanded': isOpen,
      onClick: () => onOpenChange?.(!isOpen),
    }),
    getContentProps: (isOpen: boolean) => ({
      role: 'dialog' as const,
      'aria-modal': modal,
      hidden: !isOpen || undefined,
      onKeyDown: (e: KeyboardEvent) => {
        if (e.key === 'Escape') onOpenChange?.(false)
      },
    }),
    getOverlayProps: () => ({
      'aria-hidden': true as const,
      onClick: () => onOpenChange?.(false),
    }),
    getCloseProps: () => ({
      'aria-label': 'Close',
      onClick: () => onOpenChange?.(false),
    }),
  }
}
