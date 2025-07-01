"use client"

import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface FormInputProps {
  label: string
  placeholder: string
  value?: string
  onChange?: (value: string) => void
  required?: boolean
}

export function FormInput({ label, placeholder, value, onChange, required }: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)} className="w-full" />
    </div>
  )
}
