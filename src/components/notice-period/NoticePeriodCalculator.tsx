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

export default function NoticePeriodCalculator() {
  const [startDate, setStartDate] = useState<string>("");
  const [noticeDays, setNoticeDays] = useState<any>("");
  const [endDate, setEndDate] = useState<string>("");
  const [weekDay, setWeekDay] = useState<string>("");
  const [nextMonday, setNextMonday] = useState<string>("");
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const calculateEndDate = () => {
    if (!startDate || !noticeDays || isNaN(noticeDays)) return;
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculateEndDate();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-sm font-bold text-center mb-4">
          NOTICE PERIOD CALCULATOR
        </h1>
        <Label className="block text-sm">Select Start Date</Label>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Input
              readOnly
              value={startDate}
              placeholder="Select a date"
              onClick={() => setCalendarOpen(true)}
              className="cursor-pointer"
              onKeyDown={handleKeyPress}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate ? new Date(startDate) : undefined}
              onSelect={(date) => {
                setStartDate(date?.toISOString().split("T")[0] || "");
                setCalendarOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        <Label className="block text-sm font-medium mt-4">
          Notice Period (days)
        </Label>
        <Input
          type="number"
          value={noticeDays}
          onChange={(e) => setNoticeDays(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <Button
          onClick={calculateEndDate}
          onKeyDown={handleKeyPress}
          type="button"
          className="w-full bg-green-600 hover:bg-green-700 mt-4 cursor-pointer"
        >
          Calculate End Date
        </Button>

        {(endDate || weekDay || nextMonday) && (
          <CardContent className="text-center text-lg mt-4">
            <Label className="block text-sm font-medium mb-2">
              Your notice period end date is
            </Label>
            <Label className="block font-bold text-xl text-green-700">
              {endDate} on {weekDay}
            </Label>
            <Label className="block text-sm mt-2">
              Upcoming Monday:{" "}
              <span className="font-semibold">{nextMonday}</span>
            </Label>
          </CardContent>
        )}
      </Card>
    </main>
  );
}
