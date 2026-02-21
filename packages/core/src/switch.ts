export interface SwitchConfig {
  onCheckedChange?: (checked: boolean) => void
}

export function createSwitch(config: SwitchConfig = {}) {
  const { onCheckedChange } = config

  return {
    getSwitchProps: (checked: boolean, disabled = false) => ({
      role: 'switch' as const,
      'aria-checked': checked,
      'aria-disabled': disabled || undefined,
      tabIndex: disabled ? -1 : 0,
      onClick: () => {
        if (!disabled) onCheckedChange?.(!checked)
      },
      onKeyDown: (e: KeyboardEvent) => {
        if (disabled) return
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          onCheckedChange?.(!checked)
        }
      },
    }),
  }
}
