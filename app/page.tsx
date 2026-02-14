"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  Stepper,
  StepperNav,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
} from "@/components/ui/stepper"
import { Shield, LogOut, ArrowRight, ArrowLeft, Check } from "lucide-react"

// NIS2 Assessment Categories
const assessmentSteps = [
  { step: 1, title: "Inventory and Control of Enterprise Assets" },
  { step: 2, title: "Inventory and Control of Software Assets" },
  { step: 3, title: "Data Protection" },
  { step: 4, title: "Secure Configuration of Enterprise Assets and Software" },
  { step: 5, title: "Account Management" },
  { step: 6, title: "Access Control Management" },
  { step: 7, title: "Continuous Vulnerability Management" },
  { step: 8, title: "Audit Log Management" },
  { step: 9, title: "Email and Web Browser Protections" },
  { step: 10, title: "Malware Defenses" },
  { step: 11, title: "Data Recovery" },
  { step: 12, title: "Network Infrastructure Management" },
  { step: 13, title: "Network Monitoring and Defense" },
  { step: 14, title: "Security Awareness and Skills Training" },
  { step: 15, title: "Service Provider Management" },
  { step: 16, title: "Application Software Security" },
  { step: 17, title: "Incident Response Management" },
  { step: 18, title: "Penetration Testing" },
  { step: 19, title: "AQ 1. IT Governance" },
  { step: 20, title: "AQ 2. Data Governance" },
]

export default function Home() {
  const { logout, isLoading } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)

  // Scroll to current step when it changes (from sidebar click)
  useEffect(() => {
    const element = document.getElementById(`step-${currentStep}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [currentStep])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  const handleNext = () => {
    if (currentStep < assessmentSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = assessmentSteps.find((s) => s.step === currentStep) || assessmentSteps[0]

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Left Sidebar - Stepper */}
      <aside className="w-100 bg-white border-r border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-button bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-body-lg font-semibold">NIS2 Demo</span>
            </div>
            <Button variant="ghost" size="icon" onClick={logout} title="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <h1 className="text-h5 font-semibold mb-1.5">Cybersecurity Assessment</h1>
            <p className="text-body-sm text-muted-foreground">
              Complete all categories to evaluate your organization's security posture
            </p>
          </div>
        </div>

        {/* Stepper - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <Stepper
            value={currentStep}
            onValueChange={setCurrentStep}
            orientation="vertical"
            indicators={{
              completed: <Check className="h-4 w-4" strokeWidth={2.5} />,
            }}
          >
            <StepperNav className="gap-0">
              {assessmentSteps.map((item, index) => (
                <StepperItem
                  key={item.step}
                  id={`step-${item.step}`}
                  step={item.step}
                  disabled={item.step > currentStep}
                  className="pb-0"
                >
                  <StepperTrigger>
                    <StepperIndicator>{item.step}</StepperIndicator>
                    <StepperTitle>{item.title}</StepperTitle>
                  </StepperTrigger>
                  {index < assessmentSteps.length - 1 && <StepperSeparator />}
                </StepperItem>
              ))}
            </StepperNav>
          </Stepper>
        </div>

      </aside>

      {/* Right Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Content Header */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 p-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-[13px] text-primary font-medium uppercase tracking-wider mb-2">
              CATEGORY {currentStep} OF {assessmentSteps.length}
            </p>
            <h2 className="text-h3 font-semibold tracking-tight">
              {currentStepData.title}
            </h2>
          </div>
        </header>

        {/* Content Body - Empty for now */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-slate-200 p-8 min-h-100 flex items-center justify-center">
              <p className="text-body-lg text-muted-foreground">
                Survey questions will appear here
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <footer className="sticky bottom-0 z-20 p-6">
          <div className="flex items-center gap-6">
            {/* Previous Button */}
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="rounded-button shrink-0"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {/* Progress Bar */}
            <div className="flex-1 flex items-center justify-center gap-4">
              <span className="text-body-sm text-muted-foreground shrink-0">Progress</span>
              <div className="w-full max-w-lg bg-slate-200 rounded-full h-1.5">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / assessmentSteps.length) * 100}%` }}
                />
              </div>
              <span className="text-body-sm font-medium text-foreground shrink-0">
                {currentStep} / {assessmentSteps.length}
              </span>
            </div>

            {/* Next Button */}
            <Button
              onClick={handleNext}
              disabled={currentStep === assessmentSteps.length}
              className="rounded-button hover:shadow-button-hover shadow-transition shrink-0"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </footer>
      </main>
    </div>
  )
}
