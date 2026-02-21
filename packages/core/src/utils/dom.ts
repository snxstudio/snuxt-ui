export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )
  return Array.from(elements)
}

export function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  const focusable = getFocusableElements(container)
  if (focusable.length === 0) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.key === 'Tab') {
    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }
}

export function createClickOutsideHandler(
  element: HTMLElement,
  callback: () => void
): () => void {
  const handler = (event: MouseEvent) => {
    if (!element.contains(event.target as Node)) {
      callback()
    }
  }
  document.addEventListener('mousedown', handler)
  return () => document.removeEventListener('mousedown', handler)
}

export function lockScroll(): () => void {
  const scrollY = window.scrollY
  const body = document.body
  body.style.position = 'fixed'
  body.style.top = `-${scrollY}px`
  body.style.width = '100%'
  body.style.overflow = 'hidden'

  return () => {
    body.style.position = ''
    body.style.top = ''
    body.style.width = ''
    body.style.overflow = ''
    window.scrollTo(0, scrollY)
  }
}
