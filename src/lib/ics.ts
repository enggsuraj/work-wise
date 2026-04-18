/** Build a minimal VEVENT for Google Calendar / Apple Calendar (all-day local date). */
export function buildIcsContent(params: {
  title: string;
  /** Calendar date in local timezone (from `<input type="date">` value). */
  startDate: Date;
  uid?: string;
}): string {
  const { title, startDate, uid } = params;
  const pad = (n: number) => n.toString().padStart(2, "0");
  const y = startDate.getFullYear();
  const m = pad(startDate.getMonth() + 1);
  const d = pad(startDate.getDate());
  const dateOnly = `${y}${m}${d}`;
  const endExclusive = new Date(startDate);
  endExclusive.setDate(endExclusive.getDate() + 1);
  const endStr = `${endExclusive.getFullYear()}${pad(endExclusive.getMonth() + 1)}${pad(endExclusive.getDate())}`;
  const stamp = `${new Date().getUTCFullYear()}${pad(new Date().getUTCMonth() + 1)}${pad(new Date().getUTCDate())}T${pad(new Date().getUTCHours())}${pad(new Date().getUTCMinutes())}${pad(new Date().getUTCSeconds())}Z`;

  const id =
    uid ||
    `workwise-${startDate.getTime()}-${Math.random().toString(36).slice(2, 9)}@workwisetool.site`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WorkWise//LWD Reminder//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${id}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${dateOnly}`,
    `DTEND;VALUE=DATE:${endStr}`,
    `SUMMARY:${escapeIcsText(title)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

function escapeIcsText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function downloadTextFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
