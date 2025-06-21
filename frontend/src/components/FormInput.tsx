"use client"

interface FormInputProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  error?: string
}

export function FormInput({ label, placeholder, value, onChange, required, error }: FormInputProps) {
  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      <input
        type="text"
        className={`form-input ${error ? "error" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}
