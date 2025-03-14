"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const formatNumberWithCommas = (number: number): string => {
  return number.toLocaleString("en-IN");
};

const calculateHikePercentage = (
  currentSalary: number,
  hikedSalary: number
): number => {
  if (currentSalary === 0) return 0;
  return ((hikedSalary - currentSalary) / currentSalary) * 100;
};

export default function HikePercentageCalculator() {
  const [currentSalary, setCurrentSalary] = useState<string>("");
  const [hikedSalary, setHikedSalary] = useState<string>("");
  const [hikePercentage, setHikePercentage] = useState<string>("");

  const calculatePercentage = () => {
    const salary = parseFloat(currentSalary.replace(/,/g, ""));
    const hiked = parseFloat(hikedSalary.replace(/,/g, ""));
    if (isNaN(salary) || isNaN(hiked) || salary === 0) return;
    const percentage = ((hiked - salary) / salary) * 100;
    setHikePercentage(percentage.toFixed(2));
  };

  const resetCalculator = () => {
    setCurrentSalary("");
    setHikedSalary("");
    setHikePercentage("");
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/,/g, "");
      if (!isNaN(Number(value))) {
        setter(value);
      }
    };

  return (
    <main className="flex items-center justify-center bg-gray-100 p-6">
      <Card className="p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-sm font-bold text-center mb-4">
          HIKE PERCENTAGE CALCULATOR
        </h1>

        <Label className="block text-sm font-medium mb-2">Current Salary</Label>
        <Input
          type="text"
          placeholder="Enter your current salary"
          value={formatNumberWithCommas(Number(currentSalary))}
          onChange={handleInputChange(setCurrentSalary)}
          className="mb-4"
        />

        <Label className="block text-sm font-medium mb-2">Hiked Salary</Label>
        <Input
          type="text"
          placeholder="Enter your hiked salary"
          value={formatNumberWithCommas(Number(hikedSalary))}
          onChange={handleInputChange(setHikedSalary)}
          className="mb-4"
        />

        <div className="w-full flex gap-2 mt-4">
          <Button
            onClick={calculatePercentage}
            className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer"
          >
            Calculate Hike %
          </Button>
          <Button
            onClick={resetCalculator}
            className="bg-white hover:bg-white cursor-pointer text-black border border-gray-300"
          >
            Reset
          </Button>
        </div>

        {hikePercentage && (
          <CardContent className="text-center text-lg mt-4">
            <Label className="block text-sm font-medium mb-2">
              Your hike percentage is
            </Label>
            <Label className="block font-bold text-xl text-green-700">
              {hikePercentage} %
            </Label>
          </CardContent>
        )}
      </Card>
    </main>
  );
}
