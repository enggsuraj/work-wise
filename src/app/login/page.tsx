"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import logo from "@/icons/favicon-black.png";

export default function LoginPage() {
  const handleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/notice-period" });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
      <div className="h-full flex flex-col justify-center items-center bg-gray-100 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center mt-2 mb-2">
              <Image src={logo} alt="WorkWise Logo" width={60} height={60} />
            </div>
          </div>
          <CardHeader className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">WorkWiseTool</h1>
            <p className="text-gray-600 text-sm">
              Empowering careers with smarter tools
            </p>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white cursor-pointer mt-2"
              onClick={handleLogin}
            >
              <FcGoogle className="text-xl" /> Sign in with Google
            </Button>
            <div className="text-center text-gray-700 text-sm mt-6 space-y-2">
              <p className="text-gray-600 text-sm">
                Sign in to unlock exclusive features, including adding reminder
                dates to Google Calendar.
              </p>
              <p className="text-gray-600 text-sm">
                The latest update introduces AI-driven career insights, a Last
                Working Day checklist, gratuity calculator for estimating your
                payout.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
