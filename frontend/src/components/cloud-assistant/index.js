'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { Label } from '../ui/label/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group/radio-group';
import './index.css';
import { saveUserContext } from '../../services/userService';
import { Textarea } from '../ui/textarea/textarea';
const questions = [
    {
        id: 1,
        text: 'What is the main purpose of your application?',
        type: 'radio',
        options: [
            'Web Server/Application Hosting',
            'Database Server',
            'Data Processing/Analytics',
            'Machine Learning/AI',
            'Gaming Server',
        ],
        name: 'mainPurpose',
    },
    {
        id: 2,
        text: 'What are the expected resource demands of your application?',
        type: 'radio',
        options: [
            'CPU-intensive (high processing power needed)',
            'Memory-intensive (needs a lot of RAM)',
            'I/O-intensive (reads and writes a lot of data)',
            'Graphics Processing (requires a GPU)',
            'Balanced (moderate needs across resources)',
        ],
        name: 'resourceDemands',
    },
    {
        id: 3,
        text: "Where are the majority of your application's users located or where do you anticipate the most traffic?",
        type: 'radio',
        options: [
            'North America',
            'Europe',
            'Asia-Pacific',
            'South America',
            'India',
        ],
        name: 'regions',
    },
    {
        id: 4,
        text: 'Does your application have any specific software dependencies or licensing requirements that might influence the choice of operating system?',
        type: 'radio',
        options: [
            'Requires Windows-specific features (.NET, etc.)',
            'Works best with a specific Linux distribution',
            'No specific OS requirements',
            'Needs specific licensed software',
        ],
        name: 'softwareDependencies',
    },
    {
        id: 5,
        text: 'What is your approximate budget considerations for the virtual machine?',
        type: 'radio',
        options: [
            'Cost-sensitive (looking for the most affordable option)',
            'Balanced cost and performance',
            'Performance is the priority, cost is less of a concern',
        ],
        name: 'budgetConsiderations',
    },
    {
        id: 6,
        text: 'Do you have any specific preferences or familiarity with a particular operating system?',
        type: 'radio',
        options: [
            'Familiar with Linux (Ubuntu, CentOS, etc.)',
            'Familiar with Windows Server',
            'No preference',
        ],
        name: 'osDependencies',
    },
    {
        id: 7,
        text: 'Tell us more about your application, its architecture, and any specific requirements or constraints you have in mind.',
        type: 'textarea',
        name: 'generalDescription',
    },
];
export function CloudAssistantPopup({ onClose }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const handleNext = async () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
        else {
            // Submit answers or perform final action
            console.log('All answers:', answers);
            await saveUserContext(answers);
            onClose();
        }
    };
    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };
    const handleAnswerChange = (value) => {
        setAnswers({
            ...answers,
            [questions[currentQuestion].name]: value,
        });
    };
    const currentQuestionData = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;
    // For radio buttons, convert boolean back to string for display
    const getCurrentValue = () => {
        const value = answers[currentQuestionData.name];
        return value || '';
    };
    // Check if the "Next" button should be disabled
    const isNextDisabled = () => {
        const value = answers[currentQuestionData.name];
        if (currentQuestionData.type === 'radio') {
            return value === undefined; // Disable if no radio option is selected
        }
        return !value; // Disable if input/textarea is empty
    };
    return (_jsxs("div", { className: "popup-container", children: [_jsx("div", { className: "popup-header", children: _jsxs("div", { className: "popup-title", children: [_jsx("div", { className: "popup-icon", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }), _jsx("path", { d: "M10 4v4" }), _jsx("path", { d: "M2 8h20" }), _jsx("path", { d: "M6 4v4" })] }) }), _jsx("h2", { children: "Adam - Cloud Architecture Assistant" })] }) }), _jsxs("div", { className: "popup-content", children: [_jsx("h3", { className: "question-text", children: currentQuestionData.text }), currentQuestionData.type === 'input' && (_jsx(Input, { value: getCurrentValue(), onChange: (e) => handleAnswerChange(e.target.value), placeholder: "Type your answer here", className: "text-input" })), currentQuestionData.type === 'textarea' && (_jsx(Textarea, { value: getCurrentValue(), onChange: (e) => handleAnswerChange(e.target.value), placeholder: "Type your answer here", className: "text-input textarea" })), currentQuestionData.type === 'radio' && (_jsx(RadioGroup, { value: getCurrentValue(), onValueChange: handleAnswerChange, className: "radio-options", children: currentQuestionData.options?.map((option) => (_jsxs("div", { className: `radio-option-container ${getCurrentValue() === option ? 'selected' : ''}`, onClick: () => handleAnswerChange(option), children: [_jsx(RadioGroupItem, { value: option, id: `option-${option}` }), _jsx(Label, { htmlFor: `option-${option}`, className: "radio-label", children: option })] }, option))) }))] }), _jsxs("div", { className: "popup-footer", children: [_jsx(Button, { variant: "outline", onClick: currentQuestion === 0 ? onClose : handlePrevious, children: currentQuestion === 0 ? 'Close' : 'Back' }), _jsxs("div", { className: "question-counter", children: ["Question ", currentQuestion + 1, " of ", questions.length] }), _jsx(Button, { onClick: handleNext, disabled: isNextDisabled(), children: isLastQuestion ? 'Submit' : 'Next' })] })] }));
}
//# sourceMappingURL=index.js.map