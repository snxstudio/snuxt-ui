import { useEffect, useRef } from 'react'
import { cn, trapFocus, lockScroll } from '@snx-ui/core'
import { useDialog } from './hooks/use-dialog'

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean
  children: React.ReactNode
}

export function Dialog({ open: controlledOpen, onOpenChange, modal = true, children }: DialogProps) {
  const dialog = useDialog({ modal })
  const isOpen = controlledOpen ?? dialog.open
  const setOpen = onOpenChange ?? dialog.setOpen
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen || !modal) return
    const unlock = lockScroll()
    return unlock
  }, [isOpen, modal])

  useEffect(() => {
    if (!isOpen || !contentRef.current) return
    const el = contentRef.current
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      trapFocus(el, e)
    }
    el.addEventListener('keydown', handler)
    return () => el.removeEventListener('keydown', handler)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div className="snx-dialog-overlay" onClick={() => setOpen(false)} />
      <div ref={contentRef} className="snx-dialog-content" role="dialog" aria-modal={modal}>
        {children}
        <button
          className="snx-dialog-close"
          aria-label="Close"
          onClick={() => setOpen(false)}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('snx-dialog-header', className)} {...props} />
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('snx-dialog-footer', className)} {...props} />
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('snx-dialog-title', className)} {...props} />
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('snx-dialog-description', className)} {...props} />
}

export { useDialog } from './hooks/use-dialog'
