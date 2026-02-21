export interface DrawerConfig {
  side?: 'left' | 'right' | 'top' | 'bottom'
  onOpenChange?: (open: boolean) => void
}

export function createDrawer(config: DrawerConfig = {}) {
  const { side = 'right', onOpenChange } = config

  return {
    getOverlayProps: () => ({
      'aria-hidden': true as const,
      onClick: () => onOpenChange?.(false),
    }),
    getContentProps: (isOpen: boolean) => ({
      role: 'dialog' as const,
      'aria-modal': true,
      hidden: !isOpen || undefined,
      onKeyDown: (e: KeyboardEvent) => {
        if (e.key === 'Escape') onOpenChange?.(false)
      },
    }),
    getCloseProps: () => ({
      'aria-label': 'Close',
      onClick: () => onOpenChange?.(false),
    }),
    side,
  }
}
