import { Keys, getNextIndex } from './utils/keyboard'

export interface SelectConfig {
  onValueChange?: (value: string) => void
  onOpenChange?: (open: boolean) => void
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export function createSelect(options: SelectOption[], config: SelectConfig = {}) {
  const { onValueChange, onOpenChange } = config

  return {
    getTriggerProps: (isOpen: boolean, selectedValue: string | null) => {
      const selectedOption = options.find(o => o.value === selectedValue)
      return {
        role: 'combobox' as const,
        'aria-expanded': isOpen,
        'aria-haspopup': 'listbox' as const,
        'aria-label': selectedOption?.label || 'Select an option',
        onClick: () => onOpenChange?.(!isOpen),
        onKeyDown: (e: KeyboardEvent) => {
          if (e.key === Keys.Enter || e.key === Keys.Space) {
            e.preventDefault()
            onOpenChange?.(!isOpen)
          } else if (e.key === Keys.ArrowDown) {
            e.preventDefault()
            onOpenChange?.(true)
          }
        },
      }
    },
    getListProps: () => ({
      role: 'listbox' as const,
    }),
    getOptionProps: (
      option: SelectOption,
      isHighlighted: boolean,
      selectedValue: string | null,
      _highlightedIndex: number
    ) => ({
      role: 'option' as const,
      'aria-selected': option.value === selectedValue,
      'aria-disabled': option.disabled || undefined,
      'data-highlighted': isHighlighted || undefined,
      id: `select-option-${option.value}`,
      onClick: () => {
        if (!option.disabled) {
          onValueChange?.(option.value)
          onOpenChange?.(false)
        }
      },
    }),
    getContentProps: (isOpen: boolean) => ({
      hidden: !isOpen || undefined,
    }),
    handleKeyDown: (
      e: KeyboardEvent,
      isOpen: boolean,
      highlightedIndex: number,
      onHighlightChange: (index: number) => void
    ) => {
      if (!isOpen) return

      const enabledOptions = options.filter(o => !o.disabled)

      if (e.key === Keys.ArrowDown) {
        e.preventDefault()
        const next = getNextIndex(highlightedIndex, enabledOptions.length, 'next')
        onHighlightChange(next)
      } else if (e.key === Keys.ArrowUp) {
        e.preventDefault()
        const prev = getNextIndex(highlightedIndex, enabledOptions.length, 'prev')
        onHighlightChange(prev)
      } else if (e.key === Keys.Enter || e.key === Keys.Space) {
        e.preventDefault()
        const option = enabledOptions[highlightedIndex]
        if (option) {
          onValueChange?.(option.value)
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
        onHighlightChange(enabledOptions.length - 1)
      }
    },
  }
}
