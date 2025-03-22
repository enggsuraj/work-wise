"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LeaveEncashmentCalculator() {
  const [basicSalary, setBasicSalary] = useState("");
  const [leaveDays, setLeaveDays] = useState("");
  const [encashmentAmount, setEncashmentAmount] = useState("");

  const formatNumber = (num: any) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateEncashment = () => {
    const sanitizedSalary = basicSalary.replace(/,/g, "");
    if (
      !sanitizedSalary ||
      !leaveDays ||
      isNaN(Number(sanitizedSalary)) ||
      isNaN(Number(leaveDays))
    )
      return;
    const monthlySalary = Number(sanitizedSalary);
    const perDaySalary = monthlySalary / 30;
    const totalEncashment = perDaySalary * Number(leaveDays);
    setEncashmentAmount(formatNumber(totalEncashment.toFixed(2)));
  };

  const resetCalculator = () => {
    setBasicSalary("");
    setLeaveDays("");
    setEncashmentAmount("");
  };

  return (
    <main className="flex items-center justify-center p-6">
      <Card className="lg:p-8 sm:p-4 p-4 rounded-2xl shadow-lg max-w-2xl w-full">
        <h1 className="text-sm font-bold text-center mb-2">
          LEAVE ENCASHMENT CALCULATOR
        </h1>
        <div className="text-sm p-2 rounded-md mb-4 text-center bg-blue-50 text-blue-800">
          <p className="text-sm">
            (Basic Salary / 30) * No. of Unused Leave Days
          </p>
        </div>
        <Label className="block text-sm font-medium mb-2">
          Basic Salary (per month)
        </Label>
        <Input
          type="text"
          value={basicSalary}
          placeholder="Enter your basic salary"
          onChange={(e) => {
            const formattedValue = e.target.value.replace(/,/g, "");
            if (!isNaN(Number(formattedValue))) {
              setBasicSalary(formatNumber(formattedValue));
            }
          }}
          className="w-full mb-4"
        />
        <Label className="block text-sm font-medium mb-2">
          Unused Leave Days
        </Label>
        <Input
          type="number"
          value={leaveDays}
          placeholder="Enter unused leave days"
          onChange={(e) => setLeaveDays(e.target.value)}
          className="w-full mb-4"
        />
        <div className="w-full flex gap-2 mt-4">
          <Button
            onClick={calculateEncashment}
            className={`flex-1 text-white ${
              basicSalary && leaveDays
                ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                : "bg-gray-400"
            }`}
            disabled={!basicSalary || !leaveDays}
          >
            Calculate Encashment
          </Button>
          <Button
            onClick={resetCalculator}
            className="bg-white hover:bg-white cursor-pointer text-black border border-gray-300"
          >
            Reset
          </Button>
        </div>
        {encashmentAmount && (
          <CardContent className="text-center text-lg mt-4">
            <Label className="block text-sm font-medium mb-2">
              Total Encashment Amount
            </Label>
            <Label className="block font-bold text-xl text-green-700">
              ₹ {encashmentAmount}
            </Label>
          </CardContent>
        )}
      </Card>
    </main>
  );
}
