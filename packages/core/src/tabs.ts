import { handleArrowNavigation } from './utils/keyboard'

export interface TabsConfig {
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export interface TabItem {
  value: string
  disabled?: boolean
}

export function createTabs(items: TabItem[], config: TabsConfig = {}) {
  const { onValueChange } = config

  return {
    getListProps: () => ({
      role: 'tablist' as const,
    }),
    getTriggerProps: (value: string, activeValue: string) => {
      const index = items.findIndex(item => item.value === value)
      const isActive = value === activeValue
      const item = items[index]

      return {
        role: 'tab' as const,
        'aria-selected': isActive,
        'aria-controls': `tabpanel-${value}`,
        id: `tab-${value}`,
        tabIndex: isActive ? 0 : -1,
        disabled: item?.disabled || false,
        onClick: () => {
          if (!item?.disabled) onValueChange?.(value)
        },
        onKeyDown: (e: KeyboardEvent) => {
          const enabledItems = items.filter(i => !i.disabled)
          const currentEnabledIndex = enabledItems.findIndex(i => i.value === value)
          handleArrowNavigation(
            e,
            currentEnabledIndex,
            enabledItems.length,
            'horizontal',
            (newIndex) => {
              const newItem = enabledItems[newIndex]
              onValueChange?.(newItem.value)
            }
          )
        },
      }
    },
    getPanelProps: (value: string, activeValue: string) => ({
      role: 'tabpanel' as const,
      id: `tabpanel-${value}`,
      'aria-labelledby': `tab-${value}`,
      hidden: value !== activeValue || undefined,
      tabIndex: 0,
    }),
  }
}
