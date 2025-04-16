import React from "react"
import "./textarea.css"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return <textarea className={`textarea ${className || ""}`} ref={ref} {...props} />
})

Textarea.displayName = "Textarea"
