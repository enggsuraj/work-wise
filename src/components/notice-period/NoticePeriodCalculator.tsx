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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function NoticePeriodCalculator() {
  const [startDate, setStartDate] = useState<string>("");
  const [noticeDays, setNoticeDays] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [weekDay, setWeekDay] = useState<string>("");
  const [nextMonday, setNextMonday] = useState<string>("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const calculateEndDate = () => {
    if (!startDate || !noticeDays || isNaN(Number(noticeDays))) return;
    const start = new Date(startDate);
    start.setDate(start.getDate() + parseInt(noticeDays));
    const day = start.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
    const formattedDate = `${day}${suffix}, ${start.toLocaleDateString(
      "en-GB",
      { month: "short", year: "numeric" }
    )}`;
    setEndDate(formattedDate);
    setWeekDay(start.toLocaleDateString("en-US", { weekday: "long" }));
    const daysUntilMonday = (8 - start.getDay()) % 7 || 7;
    const monday = new Date(start);
    monday.setDate(start.getDate() + daysUntilMonday);
    setNextMonday(
      monday.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  };

  const resetCalculator = () => {
    setStartDate("");
    setNoticeDays("");
    setEndDate("");
    setWeekDay("");
    setNextMonday("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculateEndDate();
    }
  };

  const daysOptions = Array.from({ length: 200 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-sm font-bold text-center mb-4">
          NOTICE PERIOD CALCULATOR
        </h1>

        <Label className="block text-sm font-medium mb-2">Start Date</Label>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <div className="relative w-full mb-4">
              <Input
                readOnly
                value={startDate}
                placeholder="Select a date"
                onClick={() => setCalendarOpen(true)}
                className="cursor-pointer pr-10"
                onKeyDown={handleKeyPress}
              />
              <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <CalendarIcon className="w-5 h-5 text-gray-500" />
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate ? new Date(startDate) : undefined}
              onSelect={(date) => {
                if (date) {
                  const localDate = new Date(
                    date.getTime() - date.getTimezoneOffset() * 60000
                  );
                  setStartDate(localDate.toISOString().split("T")[0]);
                }
                setCalendarOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        <Label className="block text-sm font-medium mb-2">
          Notice Period (days)
        </Label>
        <Select onValueChange={setNoticeDays} value={noticeDays}>
          <SelectTrigger className="w-full p-2 border rounded-md">
            <SelectValue placeholder="Select or enter days" />
          </SelectTrigger>
          <SelectContent>
            {daysOptions.map((day) => (
              <SelectItem key={day} value={day.toString()}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-full flex gap-2 mt-4">
          <Button
            onClick={calculateEndDate}
            className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer"
          >
            Calculate End Date
          </Button>
          <Button
            onClick={resetCalculator}
            className="bg-white hover:bg-white cursor-pointer text-black border border-gray-300"
          >
            Reset
          </Button>
        </div>

        {(endDate || weekDay || nextMonday) && (
          <CardContent className="text-center text-lg mt-4">
            <Label className="block text-sm font-medium mb-2">
              Your notice period end date is
            </Label>
            <Label className="block font-bold text-xl text-green-700">
              {endDate} on {weekDay}
            </Label>
            <Label className="block text-sm mt-4">
              Upcoming Monday:{" "}
              <span className="font-semibold">{nextMonday}</span>
            </Label>
          </CardContent>
        )}
      </Card>
    </main>
  );
}
