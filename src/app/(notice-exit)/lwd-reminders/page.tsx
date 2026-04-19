import LWDReminders from "@/components/calculator/LWDReminders";

export const metadata = {
  title: "LWD Calendar Reminder (.ics) | WorkWise",
  description: "Download a calendar file for your last working day reminder.",
  keywords: ["LWD reminder", "calendar ics", "last working day"],
};

export default function Page() {
  return <LWDReminders />;
}
