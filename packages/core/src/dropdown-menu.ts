import { Keys, getNextIndex } from './utils/keyboard'

export interface DropdownMenuConfig {
  onOpenChange?: (open: boolean) => void
}

export interface DropdownMenuItem {
  id: string
  label: string
  disabled?: boolean
  type?: 'item' | 'separator' | 'label'
  shortcut?: string
  onSelect?: () => void
}

export function createDropdownMenu(items: DropdownMenuItem[], config: DropdownMenuConfig = {}) {
  const { onOpenChange } = config
  const actionItems = items.filter(i => i.type !== 'separator' && i.type !== 'label' && !i.disabled)

  return {
    getTriggerProps: (isOpen: boolean) => ({
      'aria-haspopup': 'menu' as const,
      'aria-expanded': isOpen,
      onClick: () => onOpenChange?.(!isOpen),
    }),
    getContentProps: (isOpen: boolean) => ({
      role: 'menu' as const,
      hidden: !isOpen || undefined,
    }),
    getItemProps: (item: DropdownMenuItem, isHighlighted: boolean) => ({
      role: 'menuitem' as const,
      'aria-disabled': item.disabled || undefined,
      'data-highlighted': isHighlighted || undefined,
      tabIndex: -1,
      onClick: () => {
        if (!item.disabled && item.type !== 'separator' && item.type !== 'label') {
          item.onSelect?.()
          onOpenChange?.(false)
        }
      },
    }),
    handleKeyDown: (
      e: KeyboardEvent,
      isOpen: boolean,
      highlightedIndex: number,
      onHighlightChange: (index: number) => void
    ) => {
      if (!isOpen) return

      if (e.key === Keys.ArrowDown) {
        e.preventDefault()
        onHighlightChange(getNextIndex(highlightedIndex, actionItems.length, 'next'))
      } else if (e.key === Keys.ArrowUp) {
        e.preventDefault()
        onHighlightChange(getNextIndex(highlightedIndex, actionItems.length, 'prev'))
      } else if (e.key === Keys.Enter || e.key === Keys.Space) {
        e.preventDefault()
        const item = actionItems[highlightedIndex]
        if (item) {
          item.onSelect?.()
          onOpenChange?.(false)
        }
      } else if (e.key === Keys.Escape) {
        e.preventDefault()
        onOpenChange?.(false)
      } else if (e.key === Keys.Home) {
        e.preventDefault()
        onHighlightChange(0)
      } else if (e.key === Keys.End) {
        e.preventDefault()
        onHighlightChange(actionItems.length - 1)
      }
    },
  }
}
