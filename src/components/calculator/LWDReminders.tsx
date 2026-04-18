"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { buildIcsContent, downloadTextFile } from "@/lib/ics";

export default function LWDReminders() {
  const [title, setTitle] = useState("Last working day — WorkWise");
  const [dateStr, setDateStr] = useState("");

  const download = () => {
    if (!dateStr) return;
    const d = new Date(`${dateStr}T12:00:00`);
    if (Number.isNaN(d.getTime())) return;
    const ics = buildIcsContent({ title: title.trim() || "LWD reminder", startDate: d });
    downloadTextFile(`lwd-reminder-${dateStr}.ics`, ics, "text/calendar;charset=utf-8");
  };

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <h1 className="mb-2 text-center text-sm font-bold">LWD CALENDAR REMINDER</h1>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Download an .ics file and open it in Google Calendar, Outlook, or Apple Calendar. No data
          leaves your device except the file you save.
        </p>
        <CardContent className="space-y-4 px-0">
          <div>
            <Label className="mb-2 block w-full" htmlFor="ics-title">
              Event title
            </Label>
            <Input
              id="ics-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="ics-date">
              Last working day
            </Label>
            <Input
              id="ics-date"
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
            />
          </div>
          <Button type="button" onClick={download} disabled={!dateStr}>
            Download .ics
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
