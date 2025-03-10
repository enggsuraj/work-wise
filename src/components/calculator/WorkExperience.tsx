"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export default function WorkExperienceCalculator() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [startCalendarOpen, setStartCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);

  const calculateExperience = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const result = [];
    if (years > 0) result.push(`${years} year${years > 1 ? 's' : ''}`);
    if (months > 0) result.push(`${months} month${months > 1 ? 's' : ''}`);
    if (days > 0) result.push(`${days} day${days > 1 ? 's' : ''}`);

    setExperience(result.join(", "));
  };

  const resetCalculator = () => {
    setStartDate("");
    setEndDate("");
    setExperience("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-sm font-bold text-center mb-4 text-gray-800">
          WORK EXPERIENCE CALCULATOR
        </h1>

        <Label className="block text-sm font-medium mb-2 text-gray-700">Start Date</Label>
        <Popover open={startCalendarOpen} onOpenChange={setStartCalendarOpen}>
          <PopoverTrigger asChild>
            <div className="relative w-full mb-4">
              <Input
                readOnly
                value={startDate}
                placeholder="Select start date"
                onClick={() => setStartCalendarOpen(true)}
                className="cursor-pointer pr-10 border border-gray-300"
              />
              <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <CalendarIcon className="w-5 h-5 text-gray-500" />
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border border-gray-300 shadow-lg rounded-lg">
            <Calendar
              mode="single"
              selected={startDate ? new Date(startDate) : undefined}
              onSelect={(date) => {
                if (date) {
                  const localDate = new Date(
                    date.getTime() - date.getTimezoneOffset() * 60000
                  );
                  setStartDate(localDate.toISOString().split("T")[0]);
                  setEndDate("");
                }
                setStartCalendarOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        <Label className="block text-sm font-medium mb-2 text-gray-700">End Date</Label>
        <Popover open={endCalendarOpen} onOpenChange={setEndCalendarOpen}>
          <PopoverTrigger asChild>
            <div className="relative w-full mb-4">
              <Input
                readOnly
                value={endDate}
                placeholder="Select end date"
                onClick={() => {
                  if (startDate) setEndCalendarOpen(true);
                }}
                className={`cursor-pointer pr-10 border border-gray-300 ${!startDate ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <CalendarIcon className="w-5 h-5 text-gray-500" />
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border border-gray-300 shadow-lg rounded-lg">
            <Calendar
              mode="single"
              selected={endDate ? new Date(endDate) : undefined}
              disabled={(date) => new Date(date) < new Date(startDate)}
              onSelect={(date) => {
                if (date) {
                  const localDate = new Date(
                    date.getTime() - date.getTimezoneOffset() * 60000
                  );
                  setEndDate(localDate.toISOString().split("T")[0]);
                }
                setEndCalendarOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        <div className="w-full flex gap-2 mt-4">
          <Button
            onClick={calculateExperience}
            disabled={!startDate || !endDate}
            className={`flex-1 text-white ${startDate && endDate ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"}`}
          >
            Calculate Experience
          </Button>
          <Button
            onClick={resetCalculator}
            className="text-gray-800 bg-white border border-gray-300 hover:bg-gray-100"
          >
            Reset
          </Button>
        </div>

        {experience && (
          <CardContent className="text-center text-lg mt-4 text-gray-800">
            <Label className="block text-sm font-medium mb-2">
              Your work experience is
            </Label>
            <Label className="block font-bold text-xl text-green-700">
              {experience}
            </Label>
          </CardContent>
        )}
      </Card>
    </main>
  );
}
