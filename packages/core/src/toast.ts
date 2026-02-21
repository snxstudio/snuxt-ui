export interface ToastConfig {
  duration?: number
}

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export interface ToastState {
  toasts: Toast[]
}

let toastCounter = 0

export function createToastManager(config: ToastConfig = {}) {
  const { duration: defaultDuration = 5000 } = config
  const listeners = new Set<(state: ToastState) => void>()
  let state: ToastState = { toasts: [] }

  function notify() {
    for (const listener of listeners) {
      listener(state)
    }
  }

  function addToast(toast: Omit<Toast, 'id'>): string {
    const id = `toast-${++toastCounter}`
    const newToast: Toast = { id, ...toast }
    state = { toasts: [...state.toasts, newToast] }
    notify()

    const dur = toast.duration ?? defaultDuration
    if (dur > 0) {
      setTimeout(() => removeToast(id), dur)
    }

    return id
  }

  function removeToast(id: string) {
    state = { toasts: state.toasts.filter(t => t.id !== id) }
    notify()
  }

  function subscribe(listener: (state: ToastState) => void): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return {
    addToast,
    removeToast,
    subscribe,
    getState: () => state,
  }
}

// Singleton for simple usage
const defaultManager = createToastManager()

export const toast = {
  default: (title: string, description?: string) =>
    defaultManager.addToast({ title, description, variant: 'default' }),
  success: (title: string, description?: string) =>
    defaultManager.addToast({ title, description, variant: 'success' }),
  destructive: (title: string, description?: string) =>
    defaultManager.addToast({ title, description, variant: 'destructive' }),
  custom: (t: Omit<Toast, 'id'>) => defaultManager.addToast(t),
  dismiss: (id: string) => defaultManager.removeToast(id),
  subscribe: defaultManager.subscribe,
  getState: defaultManager.getState,
}
