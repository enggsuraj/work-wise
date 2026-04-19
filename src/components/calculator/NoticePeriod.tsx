"use client";

import { useState } from "react";
import { History } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { daysArr } from "@/constants";
import { buildIcsContent, downloadTextFile } from "@/lib/ics";

// import AIModal from "@/components/common/AIModal";
import { CalculatorHeading } from "@/components/common/CalculatorHeading";
import { DatePickerInput } from "@/components/common/DatePickerInput";
import NoticePeriodHoverTimeline from "./NoticePeriodHoverTimeline";

/** Last working day after notice; local noon avoids UTC boundary bugs. */
function lastWorkingDayDate(startIso: string, noticeDaysStr: string): Date | null {
  if (!startIso || !noticeDaysStr || isNaN(Number(noticeDaysStr))) return null;
  const d = new Date(`${startIso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  d.setDate(d.getDate() + parseInt(noticeDaysStr, 10));
  return d;
}

/** YYYYMMDD → next calendar day YYYYMMDD (Google all-day end is exclusive). */
function ymdNextDay(ymd: string): string {
  const y = parseInt(ymd.slice(0, 4), 10);
  const mo = parseInt(ymd.slice(4, 6), 10) - 1;
  const day = parseInt(ymd.slice(6, 8), 10);
  const d = new Date(y, mo, day, 12, 0, 0);
  d.setDate(d.getDate() + 1);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

export default function NoticePeriodCalculator() {
  const [startDate, setStartDate] = useState<string>("");
  const [noticeDays, setNoticeDays] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [weekDay, setWeekDay] = useState<string>("");
  const [nextMonday, setNextMonday] = useState<string>("");
  const [googleCalendarDate, setGoogleCalendarDate] = useState<string>("");
  // const [userQuestion, setUserQuestion] = useState<string>("");
  // const [dropDownUserQuestion, setDropDownUserQuestion] = useState<string>("");
  // const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);

  const calculateEndDate = () => {
    if (!startDate || !noticeDays || isNaN(Number(noticeDays))) return;
    const start = lastWorkingDayDate(startDate, noticeDays);
    if (!start) return;
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

    const y = start.getFullYear();
    const m = String(start.getMonth() + 1).padStart(2, "0");
    const dNum = String(start.getDate()).padStart(2, "0");
    setGoogleCalendarDate(`${y}${m}${dNum}`);
  };

  const resetCalculator = () => {
    setStartDate("");
    setNoticeDays("");
    setEndDate("");
    setWeekDay("");
    setNextMonday("");
    setGoogleCalendarDate("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculateEndDate();
    }
  };

  const daysOptions = Array.from({ length: 100 }, (_, i) => 100 - i);

  return (
    <div className="flex w-full flex-col items-center pt-0">
      <Card className="w-full max-w-2xl rounded-2xl p-4 shadow-lg sm:p-4 lg:p-8">
        <CalculatorHeading>
          NOTICE PERIOD CALCULATOR
        </CalculatorHeading>
        <Label className="block text-sm font-medium mb-2">Start Date</Label>
        <DatePickerInput
          value={startDate}
          onChange={setStartDate}
          onInputKeyDown={handleKeyPress}
        />
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
        <div className="mt-4 text-xs italic text-gray-500">
          Note: The industry-standard notice period for IT roles is typically 60
          days.
        </div>
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
            <div className="flex items-center justify-center gap-2">
              <Label className="block font-bold text-xl text-green-700">
                {endDate} on {weekDay}
              </Label>
              <NoticePeriodHoverTimeline
                startDate={startDate}
                endDate={
                  startDate
                    ? new Date(
                        new Date(startDate).setDate(
                          new Date(startDate).getDate() + parseInt(noticeDays)
                        )
                      ).toISOString()
                    : ""
                }
                noticeDays={noticeDays}
              >
                <History className="w-6 h-6 text-green-700" />
              </NoticePeriodHoverTimeline>
            </div>
            <Label className="block text-sm mt-4">
              Upcoming Monday:{" "}
              <span className="font-semibold">{nextMonday}</span>
            </Label>
            {googleCalendarDate && (
              <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  type="button"
                  variant="secondary"
                  className="text-xs"
                  onClick={() => {
                    const lwd = lastWorkingDayDate(startDate, noticeDays);
                    if (!lwd) return;
                    const ics = buildIcsContent({
                      title: "Last working day (notice ends)",
                      startDate: lwd,
                    });
                    const fname = `last-working-day-${startDate}.ics`;
                    downloadTextFile(fname, ics, "text/calendar;charset=utf-8");
                  }}
                >
                  Add to calendar (.ics)
                </Button>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Last working day")}&dates=${googleCalendarDate}/${ymdNextDay(googleCalendarDate)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-gray-100 text-xs text-black hover:bg-gray-200"
                  >
                    Open in Google Calendar
                  </Button>
                </a>
              </div>
            )}
            {googleCalendarDate && (
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                .ics opens in Apple Calendar, Outlook, etc. without signing in. Google link opens
                their site (sign-in only if you use Google Calendar).
              </p>
            )}
          </CardContent>
        )}
      </Card>

      {/* Get AI Insights
      {googleCalendarDate && (
        <>
          <AIModal
            isAIModalOpen={isAIModalOpen}
            setIsAIModalOpen={setIsAIModalOpen}
            dropDownUserQuestion={dropDownUserQuestion}
            setDropDownUserQuestion={setDropDownUserQuestion}
            userQuestion={userQuestion}
            setUserQuestion={setUserQuestion}
            frequentQuestions={frequentQuestions}
          />
        </>
      )}
      */}
    </div>
  );
}
