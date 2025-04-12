import React from "react"
import "./input.css"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", ...props }, ref) => {
  return <input type={type} className={`input ${className || ""}`} ref={ref} {...props} />
})

Input.displayName = "Input"
