import React from "react"
import "./button.css"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    return (
      <button className={`button ${variant} ${size} ${className || ""}`} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"
