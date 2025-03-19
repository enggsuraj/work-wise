"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";

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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { daysArr } from "@/constants";

export default function NoticePeriodCalculator() {
  const { data: session, status } = useSession();

  const [startDate, setStartDate] = useState<string>("");
  const [noticeDays, setNoticeDays] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [weekDay, setWeekDay] = useState<string>("");
  const [nextMonday, setNextMonday] = useState<string>("");
  const [googleCalendarDate, setGoogleCalendarDate] = useState<string>("");

  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

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

    const googleFormatted = start.toISOString().split("T")[0].replace(/-/g, "");
    setGoogleCalendarDate(googleFormatted);
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

  const daysOptions = Array.from({ length: 100 }, (_, i) => 100 - i);

  return (
    <main className="flex items-center justify-center p-6">
      <Card className="lg:p-8 sm:p-4 p-4 rounded-2xl shadow-lg max-w-2xl w-full">
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
        <div className="flex justify-between">
          <div className="flex gap-2 mt-2">
            {daysArr?.map((day: number) => (
              <Button
                key={day}
                className="bg-green-100 text-green-800 text-[10px] rounded-[2px] w-[50px] h-[20px] hover:bg-green-300 transition-all cursor-pointer"
                onClick={() => setNoticeDays(day.toString())}
              >
                {day} Days
              </Button>
            ))}
          </div>
        </div>{" "}
        <div className="w-full flex gap-2 mt-4">
          <Button
            onClick={calculateEndDate}
            className={`flex-1 text-white ${
              startDate && noticeDays
                ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                : "bg-gray-400"
            }`}
            disabled={!startDate || !noticeDays}
          >
            Calculate Last Working Date
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
            {status === "authenticated" && googleCalendarDate && (
              <div className="flex justify-center mt-4">
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Last+Working+Day&dates=${googleCalendarDate}/${googleCalendarDate}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-gray-50 text-black text-xs hover:bg-gray-100 cursor-pointer">
                    Add to Google Calendar
                  </Button>
                </a>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </main>
  );
}
