"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { LWD_CHECKLIST } from "@/constants";

export default function LWDChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => {
      if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("lwdChecklist") || "{}");
      }
      return {};
    }
  );

  const handleCheckboxChange = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
    localStorage.removeItem("lwdChecklist");
  };

  useEffect(() => {
    const savedChecklist = localStorage.getItem("lwdChecklist");
    if (savedChecklist) {
      setCheckedItems(JSON.parse(savedChecklist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lwdChecklist", JSON.stringify(checkedItems));
  }, [checkedItems]);

  return (
    <main className="flex items-center justify-center bg-gray-100 p-2">
      <Card className="lg:p-4 sm:p-6 p-2 rounded-2xl shadow-lg max-w-3xl w-full">
        <h1 className="text-sm font-bold text-center mb-4">
          LAST WORKING DAY CHECKLIST
        </h1>

        <CardContent>
          {Object.entries(LWD_CHECKLIST).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h2 className="text-md font-semibold mb-4">{category}</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Checkbox
                      id={item}
                      checked={checkedItems[item] || false}
                      onCheckedChange={() => handleCheckboxChange(item)}
                    />
                    <Label
                      htmlFor={item}
                      className={`text-sm font-medium ml-2 ${
                        checkedItems[item] ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>

        <div className="w-full flex gap-2 mt-4">
          <Button
            onClick={resetChecklist}
            className="bg-white hover:bg-white cursor-pointer text-black border border-gray-300"
          >
            Reset
          </Button>
        </div>
      </Card>
    </main>
  );
}
