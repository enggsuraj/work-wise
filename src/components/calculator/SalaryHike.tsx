"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const formatNumberWithCommas = (number: number): string => {
  return number.toLocaleString("en-IN");
};

const numberToWords = (num: number): string => {
  const a = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  const b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  if (num === 0) return "zero";

  const convert = (n: number): string => {
    if (n < 20) return a[n];
    if (n < 100)
      return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
        " hundred" +
        (n % 100 !== 0 ? " and " + convert(n % 100) : "")
      );
    if (n < 100000)
      return (
        convert(Math.floor(n / 1000)) +
        " thousand" +
        (n % 1000 !== 0 ? " " + convert(n % 1000) : "")
      );
    if (n < 10000000)
      return (
        convert(Math.floor(n / 100000)) +
        " lakh" +
        (n % 100000 !== 0 ? " " + convert(n % 100000) : "")
      );
    return (
      convert(Math.floor(n / 10000000)) +
      " crore" +
      (n % 10000000 !== 0 ? " " + convert(n % 10000000) : "")
    );
  };

  return convert(num);
};

export default function SalaryHikeCalculator() {
  const [currentSalary, setCurrentSalary] = useState<string>("");
  const [incrementPercentage, setIncrementPercentage] = useState<string>("");
  const [hikedSalary, setHikedSalary] = useState<string>("");
  const [hikedSalaryInWords, setHikedSalaryInWords] = useState<string>("");

  const calculateHikedSalary = () => {
    const salary = parseFloat(currentSalary.replace(/,/g, ""));
    const percentage = parseFloat(incrementPercentage);
    if (isNaN(salary) || isNaN(percentage)) return;
    const newSalary = salary + (salary * percentage) / 100;
    setHikedSalary(formatNumberWithCommas(Math.round(newSalary)));
    setHikedSalaryInWords(`${numberToWords(Math.round(newSalary))} rupees`);
  };

  const resetCalculator = () => {
    setCurrentSalary("");
    setIncrementPercentage("");
    setHikedSalary("");
    setHikedSalaryInWords("");
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(value))) {
      setCurrentSalary(value);
    }
  };

  return (
    <main className="flex items-center justify-center bg-gray-100 p-6">
      <Card className="lg:p-8 sm:p-4 p-4 rounded-2xl shadow-lg max-w-2xl w-full">
        <h1 className="text-sm font-bold text-center mb-4">
          SALARY HIKE CALCULATOR
        </h1>

        <Label className="block text-sm font-medium mb-2">Current Salary</Label>
        <Input
          type="text"
          placeholder="Enter your current salary"
          value={formatNumberWithCommas(Number(currentSalary))}
          onChange={handleSalaryChange}
          className="mb-4"
        />

        <Label className="block text-sm font-medium mb-2">
          Increment Percentage (%)
        </Label>
        <Input
          type="number"
          placeholder="Enter increment percentage"
          value={incrementPercentage}
          onChange={(e) => setIncrementPercentage(e.target.value)}
          className="mb-4"
        />

        <div className="w-full flex gap-2 mt-4">
          <Button
            onClick={calculateHikedSalary}
            className={`flex-1 text-white ${
              currentSalary && incrementPercentage
                ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                : "bg-gray-400"
            }`}
            disabled={!currentSalary || !incrementPercentage}
          >
            Calculate Hiked Salary
          </Button>
          <Button
            onClick={resetCalculator}
            className="bg-white hover:bg-white cursor-pointer text-black border border-gray-300"
          >
            Reset
          </Button>
        </div>

        {hikedSalary && (
          <CardContent className="text-center text-lg mt-4">
            <Label className="block text-sm font-medium mb-2">
              Your hiked salary is
            </Label>
            <Label className="block font-bold text-xl text-green-700">
              ₹ {hikedSalary}
            </Label>
            <Label className="block text-sm mt-4">({hikedSalaryInWords})</Label>
          </CardContent>
        )}
      </Card>
    </main>
  );
}
