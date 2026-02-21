export const Keys = {
  Enter: 'Enter',
  Space: ' ',
  Escape: 'Escape',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Home: 'Home',
  End: 'End',
  Tab: 'Tab',
} as const

export type KeyboardDirection = 'horizontal' | 'vertical' | 'both'

export function getNextIndex(
  current: number,
  total: number,
  direction: 'next' | 'prev',
  loop = true
): number {
  if (direction === 'next') {
    const next = current + 1
    return next >= total ? (loop ? 0 : current) : next
  }
  const prev = current - 1
  return prev < 0 ? (loop ? total - 1 : current) : prev
}

export function handleArrowNavigation(
  event: KeyboardEvent,
  currentIndex: number,
  totalItems: number,
  orientation: KeyboardDirection,
  onIndexChange: (index: number) => void,
  loop = true
): void {
  const nextKeys = orientation === 'horizontal' ? [Keys.ArrowRight] : orientation === 'vertical' ? [Keys.ArrowDown] : [Keys.ArrowRight, Keys.ArrowDown]
  const prevKeys = orientation === 'horizontal' ? [Keys.ArrowLeft] : orientation === 'vertical' ? [Keys.ArrowUp] : [Keys.ArrowLeft, Keys.ArrowUp]

  if (nextKeys.includes(event.key as any)) {
    event.preventDefault()
    onIndexChange(getNextIndex(currentIndex, totalItems, 'next', loop))
  } else if (prevKeys.includes(event.key as any)) {
    event.preventDefault()
    onIndexChange(getNextIndex(currentIndex, totalItems, 'prev', loop))
  } else if (event.key === Keys.Home) {
    event.preventDefault()
    onIndexChange(0)
  } else if (event.key === Keys.End) {
    event.preventDefault()
    onIndexChange(totalItems - 1)
  }
}
