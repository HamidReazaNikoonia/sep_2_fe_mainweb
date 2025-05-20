import clsx from "clsx"
import React, { useState } from "react"

interface CollapsibleProps {
  children: React.ReactNode
  defaultOpen?: boolean,
  className?: any
}

export const Collapsible: React.FC<CollapsibleProps> = ({ children, defaultOpen = true, className }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={clsx(className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { isOpen, setIsOpen })
        }
        return child
      })}
    </div>
  )
}

interface CollapsibleTriggerProps {
  children: React.ReactNode
  isOpen?: boolean
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  className?: any
}

export const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({ children, isOpen, setIsOpen, className }) => {
  return (
    <div
      className={clsx(className, 'cursor-pointer')}
      onClick={() => setIsOpen && setIsOpen(!isOpen)}
    >
      {children}
    </div>
  )
}

interface CollapsibleContentProps {
  children: React.ReactNode
  isOpen?: boolean
  className?: any
}

export const CollapsibleContent: React.FC<CollapsibleContentProps> = ({ children, isOpen, className }) => {
  if (!isOpen) return null

  return <div className={clsx(className, 'collapsible-content')}>{children}</div>
}

