"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const handleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/notice-period" });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className=" bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign in to WorkWise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white cursor-pointer mt-4"
            onClick={handleLogin}
          >
            <FcGoogle className="text-xl" /> Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
