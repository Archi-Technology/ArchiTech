"use client"

import type React from "react"
import { useState } from "react"

interface FormMultiSelectProps {
  label: string
  placeholder: string
  values: string[]
  onChange: (values: string[]) => void
  suggestions?: string[]
  required?: boolean
  error?: string
}

export function FormMultiSelect({
  label,
  placeholder,
  values,
  onChange,
  suggestions = [],
  required,
  error,
}: FormMultiSelectProps) {
  const [inputValue, setInputValue] = useState("")

  const addValue = (value: string) => {
    if (value.trim() && !values.includes(value.trim())) {
      onChange([...values, value.trim()])
      setInputValue("")
    }
  }

  const removeValue = (valueToRemove: string) => {
    onChange(values.filter((v) => v !== valueToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addValue(inputValue)
    }
  }

  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      <div className="multi-select-container">
        <div className="multi-select-input-row">
          <input
            type="text"
            className={`form-input multi-select-input ${error ? "error" : ""}`}
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            className="add-button"
            onClick={() => addValue(inputValue)}
            disabled={!inputValue.trim()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        {values.length > 0 && (
          <div className="badges-container">
            {values.map((value) => (
              <div key={value} className="badge">
                {value}
                <button type="button" className="badge-remove" onClick={() => removeValue(value)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        {suggestions.length > 0 && (
          <div className="suggestions-container">
            {suggestions
              .filter((s) => !values.includes(s))
              .map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="suggestion-button"
                  onClick={() => addValue(suggestion)}
                >
                  + {suggestion}
                </button>
              ))}
          </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}
