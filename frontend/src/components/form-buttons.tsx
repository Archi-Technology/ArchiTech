"use client"

import { Button } from "./ui/button"

interface FormButtonsProps {
  onNext?: () => void
  onCancel?: () => void
  nextDisabled?: boolean
  nextLoading?: boolean
}

export function FormButtons({ onNext, onCancel, nextDisabled, nextLoading }: FormButtonsProps) {
  return (
    <div className="flex justify-between pt-6">
      <Button
        onClick={onNext}
        disabled={nextDisabled || nextLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg"
      >
        {nextLoading ? "Loading..." : "next"}
      </Button>
      <Button
        variant="outline"
        onClick={onCancel}
        className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 px-8 py-2 rounded-lg"
      >
        Cancel
      </Button>
    </div>
  )
}
