"use client"

interface FormSelectProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  required?: boolean
  error?: string
}

export function FormSelect({ label, placeholder, value, onChange, options, required, error }: FormSelectProps) {
  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      <select
        className={`form-select ${error ? "error" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}
