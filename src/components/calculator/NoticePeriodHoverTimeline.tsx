import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TimelineProps {
  startDate: string;
  endDate: string;
  noticeDays: string;
  children: React.ReactNode;
}

interface TimelineItem {
  date: Date;
  title: string;
  description: string;
  isCompleted: boolean;
}

export default function NoticePeriodHoverTimeline({
  startDate,
  endDate,
  noticeDays,
  children,
}: TimelineProps) {
  if (!startDate || !endDate || !noticeDays) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = parseInt(noticeDays);

  const timelineItems: TimelineItem[] = [
    {
      date: start,
      title: "Resignation Date",
      description: "First day of notice period",
      isCompleted: true,
    },
    {
      date: new Date(start.getTime() + totalDays * 0.25 * 24 * 60 * 60 * 1000),
      title: "25% Notice Period",
      description: "Quarter way through notice period",
      isCompleted:
        new Date() >
        new Date(start.getTime() + totalDays * 0.25 * 24 * 60 * 60 * 1000),
    },
    {
      date: new Date(start.getTime() + totalDays * 0.5 * 24 * 60 * 60 * 1000),
      title: "50% Notice Period",
      description: "Half way through notice period",
      isCompleted:
        new Date() >
        new Date(start.getTime() + totalDays * 0.5 * 24 * 60 * 60 * 1000),
    },
    {
      date: new Date(start.getTime() + totalDays * 0.75 * 24 * 60 * 60 * 1000),
      title: "75% Notice Period",
      description: "Three quarters through notice period",
      isCompleted:
        new Date() >
        new Date(start.getTime() + totalDays * 0.75 * 24 * 60 * 60 * 1000),
    },
    {
      date: end,
      title: "Last Working Day",
      description: "Final day of notice period",
      isCompleted: new Date() > end,
    },
  ];

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        className="w-80 p-4 relative"
        align="center"
        side="right"
        sideOffset={2}
      >
        {/* Tooltip arrow */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white border-t border-l border-gray-200 transform rotate-45" />

        <div className="space-y-3">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />

            {/* Timeline items */}
            <div className="space-y-3">
              {timelineItems.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute left-[7px] top-2 rounded-full border border-white",
                      item.isCompleted
                        ? "w-3 h-3 bg-green-500"
                        : "w-3 h-3 bg-gray-300"
                    )}
                  />

                  {/* Content */}
                  <div className="ml-8 flex flex-col items-start">
                    <div className="flex items-start">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <span className="ml-2 text-xs text-gray-500">
                        {`${item.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}, ${item.date.toLocaleDateString("en-US", {
                          weekday: "short",
                        })}`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-left">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
