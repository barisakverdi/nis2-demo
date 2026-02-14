"use client"

import { useState } from "react"
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
import { Shield, Download, Check, LogOut } from "lucide-react"
import Image from "next/image"

// NIS2 Assessment Categories (same as home page for sidebar consistency)
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

export default function ResultsPage() {
  const { logout } = useAuth()
  const currentStep = 20 // Show all steps as completed

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Left Sidebar - Stepper */}
      <aside className="w-100 bg-white border-r border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-button bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-body-lg font-semibold">NIS2 Demo</span>
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
                  disabled={true}
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

      {/* Right Content Area - Results */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Logout Button - Top Right */}
        <div className="absolute top-6 right-8 z-10">
          <button
            onClick={logout}
            title="Logout"
            className="shrink-0 cursor-pointer p-2 rounded-md hover:bg-slate-100 transition-colors"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>

        <div className="max-w-5xl mx-auto px-8 py-12 space-y-8">
          {/* Congratulations Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-body-sm font-semibold text-green-700">
                Congratulations! Assessment Completed
              </span>
            </div>
          </div>

          {/* Main Heading and Description */}
          <div className="text-center space-y-4">
            <h2 className="text-h2 font-bold tracking-tight">
              Cybersecurity Assessment Complete
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Congratulations! You have successfully completed the Cybersecurity Assessment.
              Download your report to review your security score and improvement roadmap.
            </p>

            {/* Download Button */}
            <div className="flex justify-center pt-1">
              <Button
                size="lg"
                className="rounded-button hover:shadow-button-hover shadow-transition"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Full Report
              </Button>
            </div>
          </div>

          {/* Results Chart Image */}
          <div className="w-full pt-4 pb-12">
            <div className="relative w-full rounded-card overflow-hidden shadow-card border border-slate-200 bg-white">
              <Image
                src="/results-chart.png"
                alt="Cybersecurity Assessment Results"
                width={2000}
                height={1074}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
