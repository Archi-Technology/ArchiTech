"use client"

import { useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Label } from "./ui/label"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "../lib/utils"

interface FormMultiSelectProps {
  label: string
  placeholder: string
  options: { value: string; label: string }[]
  value?: string[]
  onChange?: (value: string[]) => void
  required?: boolean
}

export function FormMultiSelect({ label, placeholder, options, value = [], onChange, required }: FormMultiSelectProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (selectedValue: string) => {
    const newValue = value.includes(selectedValue)
      ? value.filter((item) => item !== selectedValue)
      : [...value, selectedValue]
    onChange?.(newValue)
  }

  const handleRemove = (valueToRemove: string) => {
    onChange?.(value.filter((item) => item !== valueToRemove))
  }

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-10 px-3 py-2"
          >
            <div className="flex flex-wrap gap-1">
              {value.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                value.map((item) => {
                  const option = options.find((opt) => opt.value === item)
                  return (
                    <Badge key={item} variant="secondary" className="mr-1">
                      {option?.label}
                      <button
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleRemove(item)
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onClick={() => handleRemove(item)}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  )
                })
              )}
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem key={option.value} value={option.value} onSelect={() => handleSelect(option.value)}>
                    <Check className={cn("mr-2 h-4 w-4", value.includes(option.value) ? "opacity-100" : "opacity-0")} />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
