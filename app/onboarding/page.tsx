"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"

export default function OnboardingPage() {
  const { completeOnboarding, isLoading } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 2
  const [answers, setAnswers] = useState({
    employeeCount: "",
    revenue: ""
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const stepConfig = {
    1: {
      title: "Size & Financial Thresholds",
      description: "Provide information about your organization's size and financial status to determine applicable NIS2 cybersecurity requirements."
    },
    2: {
      title: "Sector Classification",
      description: "Select your organization's primary sector to receive industry-specific cybersecurity standards and risk assessment."
    }
  }

  const currentConfig = stepConfig[currentStep as keyof typeof stepConfig]

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Dark Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-12 flex-col justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-button bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-h4 text-white font-semibold">NIS2 Demo</span>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h1 className="text-display-md text-white font-bold leading-tight">
            Strengthen Your Cybersecurity
          </h1>
          <p className="text-body-lg text-slate-300 max-w-lg">
            Assess your organization's cybersecurity level under the NIS2 directive.
            Enhance your security with comprehensive analysis and personalized recommendations.
          </p>
        </div>

        {/* Footer */}
        <p className="text-body-sm text-slate-500">
          © 2026 NIS2 Demo. All rights reserved.
        </p>
      </div>

      {/* Right Side - Form Area */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-xl space-y-10">
          {/* Header: Step Indicator + Title + Description */}
          <div>
            <p className="text-[13px] text-primary font-medium uppercase tracking-wider mb-4">
              STEP {currentStep} OF {totalSteps}
            </p>

            <h2 className="text-h2 font-semibold tracking-tight mb-3">{currentConfig.title}</h2>
            <p className="text-body-md text-muted-foreground">
              {currentConfig.description}
            </p>
          </div>

          {/* Form Area */}
          <div className="space-y-6">
            {currentStep === 1 && (
              <>
                {/* Question 1: Employee Count */}
                <div className="space-y-3">
                  <p className="text-body-md font-medium text-foreground">
                    Does your organization have more than 50 employees?
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      data-slot="toggle-group-item"
                      data-variant="card"
                      data-state={answers.employeeCount === "yes" ? "on" : "off"}
                      onClick={() => setAnswers({...answers, employeeCount: "yes"})}
                      className="!px-6 !w-auto !h-10 !min-h-10"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      data-slot="toggle-group-item"
                      data-variant="card"
                      data-state={answers.employeeCount === "no" ? "on" : "off"}
                      onClick={() => setAnswers({...answers, employeeCount: "no"})}
                      className="!px-6 !w-auto !h-10 !min-h-10"
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Question 2: Revenue */}
                <div className="space-y-3">
                  <p className="text-body-md font-medium text-foreground">
                    Does your annual revenue or balance sheet total exceed 10 Million Euros?
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      data-slot="toggle-group-item"
                      data-variant="card"
                      data-state={answers.revenue === "yes" ? "on" : "off"}
                      onClick={() => setAnswers({...answers, revenue: "yes"})}
                      className="!px-6 !w-auto !h-10 !min-h-10"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      data-slot="toggle-group-item"
                      data-variant="card"
                      data-state={answers.revenue === "no" ? "on" : "off"}
                      onClick={() => setAnswers({...answers, revenue: "no"})}
                      className="!px-6 !w-auto !h-10 !min-h-10"
                    >
                      No
                    </button>
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <div className="min-h-[200px]">
                {/* Step 2 form içeriği buraya gelecek */}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            {currentStep > 1 && (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="rounded-button"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className={`rounded-button hover:shadow-button-hover shadow-transition ${currentStep === 1 ? "ml-auto" : ""}`}
            >
              {currentStep < totalSteps ? "Continue" : "Complete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
