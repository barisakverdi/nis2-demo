"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut } from "lucide-react"

export default function OnboardingPage() {
  const { completeOnboarding, logout, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  const handleComplete = () => {
    completeOnboarding()
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50">
      <div className="w-full max-w-2xl mx-4 space-y-4">
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Hoş Geldiniz! 👋</CardTitle>
            <CardDescription>
              NIS2 Demo Onboarding Sürecine Hoş Geldiniz
            </CardDescription>
          </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Bu sayfa, uygulamaya ilk kez giriş yapan kullanıcılar için onboarding sürecini temsil eder.
            </p>
            <p className="text-muted-foreground">
              İleride burada şirket profili, kullanıcı tercihleri ve diğer başlangıç ayarları yer alacak.
            </p>
          </div>

          <div className="pt-4">
            <Button onClick={handleComplete} size="lg" className="w-full">
              Onboarding'i Tamamla
            </Button>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  )
}
