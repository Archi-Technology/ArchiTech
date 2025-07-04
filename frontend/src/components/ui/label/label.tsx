import React from "react"
import "./label.css"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return <label className={`label ${className || ""}`} ref={ref} {...props} />
})

Label.displayName = "Label"
