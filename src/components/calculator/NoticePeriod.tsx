"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { CalendarIcon, BotIcon } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { daysArr, frequentQuestions } from "@/constants";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

export default function NoticePeriodCalculator() {
  const { data: session, status } = useSession();

  const [startDate, setStartDate] = useState<string>("");
  const [noticeDays, setNoticeDays] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [weekDay, setWeekDay] = useState<string>("");
  const [nextMonday, setNextMonday] = useState<string>("");
  const [googleCalendarDate, setGoogleCalendarDate] = useState<string>("");
  const [aiInsight, setAIInsight] = useState<string>("");
  const [userQuestion, setUserQuestion] = useState<string>("");
  const [dropDownUserQuestion, setDropDownUserQuestion] = useState<string>("");

  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);

  const fetchAIInsights = async (question: string) => {
    if (!session || !question) return;
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(question);
      const response = await result.response;
      const text = response.text();
      setAIInsight(text);
    } catch (error) {
      setAIInsight("Failed to generate AI insights.");
      console.error("Gemini AI Error:", error);
    }

    setLoading(false);
  };

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
    <main className="p-6">
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
                  <Button className="bg-gray-100 text-black text-xs hover:bg-gray-200 cursor-pointer">
                    Add to Google Calendar
                  </Button>
                </a>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {status === "authenticated" && googleCalendarDate && (
        <>
          <Dialog open={isAIModalOpen} onOpenChange={setIsAIModalOpen}>
            <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md transition-all duration-300" />

            <DialogTrigger asChild>
              <Button className="cursor-pointer w-full mt-4 flex items-center text-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 ease-in-out">
                <BotIcon className="w-full h-5 text-white" /> Get AI Insights
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl w-full mx-auto p-6 rounded-lg shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Ask AI Insights
                </DialogTitle>
              </DialogHeader>

              <div className="">
                <Label className="block text-sm font-medium text-gray-700">
                  Ask Question or Select a most frequent question
                </Label>
                <Select
                  value={dropDownUserQuestion || ""}
                  onValueChange={(value) => setDropDownUserQuestion(value)}
                >
                  <SelectTrigger className="mt-2 w-full border rounded-md p-3 text-gray-700">
                    <SelectValue placeholder="Choose a question" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border rounded-md shadow-lg">
                    {frequentQuestions.map((question, index) => (
                      <SelectItem
                        key={index}
                        value={question}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {question}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                className="p-3 border rounded-md w-full resize-none h-24"
                placeholder="Enter your question for AI..."
                value={userQuestion}
                onChange={(e: any) => setUserQuestion(e.target.value)}
              />

              <div className="flex justify-end">
                <Button
                  className="text-white bg-green-600 hover:bg-green-700 cursor-pointer w-15"
                  onClick={() =>
                    fetchAIInsights(
                      userQuestion ? userQuestion : dropDownUserQuestion
                    )
                  }
                >
                  Send
                </Button>
              </div>

              {loading ? (
                <p className="mt-4 text-gray-600">Generating response...</p>
              ) : (
                aiInsight && (
                  <CardContent className="mt-4 p-4 bg-gray-50 rounded-lg break-words h-100 overflow-scroll">
                    {aiInsight}
                  </CardContent>
                )
              )}
            </DialogContent>
          </Dialog>
        </>
      )}
    </main>
  );
}
