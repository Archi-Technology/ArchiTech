"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from '../ui/button/button'
import { Input } from '../ui/input/input'
import { Label } from '../ui/label/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group/radio-group'
import { Textarea } from '../ui/textarea/textarea'
import "./index.css"
import { saveUserContext } from "../../services/userService"


export interface IUserContext{
    descOfProject: string;
    highAvailbility: boolean;
    securityHighConcern: boolean;
    connectDifferentCloudP: boolean;
    amountOfUsers: string;
    budget: string;
    regulations: string;
}

type Question = {
    id: number
    text: string
    type: "input" | "textarea" | "radio"
    options?: string[]
    name: keyof IUserContext
  }

const questions: Question[] = [
  {
    id: 1,
    text: "Tell me a little bit about your company and what services are you planning on delivering through your environment",
    type: "textarea",
    name: "descOfProject",
  },
  {
    id: 2,
    text: "Does your environment require redundancy and high availability?",
    type: "radio",
    options: ["Yes", "No"],
    name: 'highAvailbility',
  },
  {
    id: 3,
    text: "Are you required to comply with local/regional regulations? If so, please provide their identifiers/specifications",
    type: "textarea",
    name: "regulations",
  },
  {
    id: 4,
    text: "Is security a high concern for your environment?",
    type: "radio",
    options: ["Yes", "No"],
    name: "securityHighConcern",
  },
  {
    id: 5,
    text: "How many users are expected to interact with your environment?",
    type: "input",
    name: "amountOfUsers",
  },
  {
    id: 6,
    text: "Do you plan on connecting to other cloud service providers/on premise networks?",
    type: "radio",
    options: ["Yes", "No"],
    name: "connectDifferentCloudP",
  },
  {
    id: 7,
    text: "What is the budget allocated for the environment?",
    type: "input",
    name: "budget",
  },
]

export function CloudAssistantPopup({ onClose }: { onClose: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Partial<IUserContext>>({})

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Submit answers or perform final action
      console.log("All answers:", answers);
      await saveUserContext(answers);
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleAnswerChange = (value: string) => {
    const currentQuestionType = questions[currentQuestion].type

    // Convert radio answers to boolean
    if (currentQuestionType === "radio") {
      setAnswers({
        ...answers,
        [questions[currentQuestion].name]: value === "Yes",
      })
    } else {
      setAnswers({
        ...answers,
        [questions[currentQuestion].name]: value,
      })
    }
  }

  const currentQuestionData = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  // For radio buttons, convert boolean back to string for display
  const getCurrentValue = () => {
    const value = answers[currentQuestionData.name]
    if (currentQuestionData.type === "radio") {
      return value === true ? "Yes" : value === false ? "No" : ""
    }
    return (value as string) || ""
  }

  // Check if the "Next" button should be disabled
  const isNextDisabled = () => {
    const value = answers[currentQuestionData.name]
    if (currentQuestionData.type === "radio") {
      return value === undefined // Disable if no radio option is selected
    }
    return !value // Disable if input/textarea is empty
  }

  return (
    <div className="popup-container">
      <div className="popup-header">
        <div className="popup-title">
          <div className="popup-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M10 4v4" />
              <path d="M2 8h20" />
              <path d="M6 4v4" />
            </svg>
          </div>
          <h2>Adam - Cloud Architecture Assistant</h2>
        </div>
      </div>

      <div className="popup-content">
        <h3 className="question-text">{currentQuestionData.text}</h3>

        {currentQuestionData.type === "input" && (
          <Input
            value={getCurrentValue()}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your answer here"
            className="text-input"
          />
        )}

        {currentQuestionData.type === "textarea" && (
          <Textarea
            value={getCurrentValue()}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your answer here"
            className="text-area"
          />
        )}

        {currentQuestionData.type === "radio" && (
          <RadioGroup value={getCurrentValue()} onValueChange={handleAnswerChange} className="radio-options">
            {currentQuestionData.options?.map((option) => (
              <div
                key={option}
                className={`radio-option-container ${getCurrentValue() === option ? "selected" : ""}`}
                onClick={() => handleAnswerChange(option)} // Ensure clicking the container triggers the change
              >
                <RadioGroupItem value={option} id={`option-${option}`} />
                <Label htmlFor={`option-${option}`} className="radio-label">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>

      <div className="popup-footer">
        <Button variant="outline" onClick={currentQuestion === 0 ? onClose : handlePrevious}>
          {currentQuestion === 0 ? "Close" : "Back"}
        </Button>
        <div className="question-counter">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <Button onClick={handleNext} disabled={isNextDisabled()}>{isLastQuestion ? "Submit" : "Next"}</Button>
      </div>
    </div>
  )
}
