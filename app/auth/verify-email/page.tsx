import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>We've sent you a verification link to your email address</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
          <div className="rounded-full bg-primary/20 p-6">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <p>Please check your email inbox and click on the verification link to verify your email address.</p>
            <p className="text-sm text-muted-foreground">If you don't see the email, check your spam folder.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button asChild className="w-full">
            <Link href="/auth/sign-in">Return to sign in</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
