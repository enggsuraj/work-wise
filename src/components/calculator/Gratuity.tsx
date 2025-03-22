"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GratuityCalculator() {
  const [salary, setSalary] = useState<string>("");
  const [years, setYears] = useState<string>("5");
  const [months, setMonths] = useState<string>("0");
  const [gratuity, setGratuity] = useState<string>("");

  const formatNumberWithCommas = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(value))) {
      setSalary(formatNumberWithCommas(value));
    }
  };

  const calculateGratuity = () => {
    const salaryValue = parseFloat(salary.replace(/,/g, ""));
    const yearsValue = parseInt(years, 10);
    const monthsValue = parseInt(months, 10);

    if (isNaN(salaryValue) || isNaN(yearsValue) || isNaN(monthsValue)) return;

    const totalYears = yearsValue + monthsValue / 12;
    const gratuityAmount = (15 * salaryValue * totalYears) / 26;
    setGratuity(formatNumberWithCommas(gratuityAmount.toFixed(2)));
  };

  const resetCalculator = () => {
    setSalary("");
    setYears("5");
    setMonths("0");
    setGratuity("");
  };

  return (
    <main className="flex items-center justify-center bg-gray-100 p-6">
      <Card className="lg:p-8 sm:p-4 p-4 rounded-2xl shadow-lg max-w-2xl w-full">
        <h1 className="text-sm font-bold text-center mb-4">
          GRATUITY CALCULATOR
        </h1>

        <div className="text-sm p-2 rounded-md mb-4 text-center bg-blue-50 text-blue-800">
          You’re eligible for gratuity after working for 5 years in the same
          organization
        </div>

        <Label className="block text-sm font-medium mb-2">
          Last Drawn Salary (Base Salary + Dearness Allowance (DA))
        </Label>
        <Input
          type="text"
          placeholder="Enter last drawn salary"
          value={salary}
          onChange={handleSalaryChange}
          className="mb-4"
        />

        <div className="flex gap-4">
          <div className="w-1/2">
            <Label className="block text-sm font-medium mb-2">
              Years of Employment
            </Label>
            <Select value={years} onValueChange={setYears}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select years" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(46)].map((_, i) => (
                  <SelectItem key={i + 5} value={(i + 5).toString()}>
                    {i + 5} Years
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-1/2">
            <Label className="block text-sm font-medium mb-2">
              Additional Months
            </Label>
            <Select value={months} onValueChange={setMonths}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select months" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(13)].map((_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {i} Months
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full flex gap-2 mt-4">
          <Button
            onClick={calculateGratuity}
            className={`flex-1 text-white ${
              salary && years && months
                ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                : "bg-gray-400"
            }`}
            disabled={!salary || !years || !months}
          >
            Calculate Gratuity
          </Button>
          <Button
            onClick={resetCalculator}
            className="bg-white hover:bg-white cursor-pointer text-black border border-gray-300"
          >
            Reset
          </Button>
        </div>

        {gratuity && (
          <CardContent className="text-center text-lg mt-4">
            <Label className="block text-sm font-medium mb-2">
              Your gratuity amount is
            </Label>
            <Label className="block font-bold text-xl text-green-700">
              ₹ {gratuity}
            </Label>
            <p className="text-gray-500 text-sm mt-2">
              (15 * Last drawn salary amount * period of service) / 30
            </p>
          </CardContent>
        )}
      </Card>
    </main>
  );
}
