"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { EXPERIENCE_RELIVING_CHECKLIST } from "@/constants";

const STORAGE_KEY = "exitDocsChecklist";

export default function ExitDocumentsChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCheckedItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    } catch {
      /* ignore */
    }
  }, [checkedItems]);

  const toggle = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const reset = () => {
    setCheckedItems({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <main className="flex items-center justify-center p-2">
      <Card className="w-full max-w-3xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-4">
        <h1 className="mb-4 text-center text-sm font-bold">EXIT &amp; RELIEVING DOCUMENTS</h1>
        <CardContent>
          {Object.entries(EXPERIENCE_RELIVING_CHECKLIST).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h2 className="mb-4 text-md font-semibold">{category}</h2>
              <div className="space-y-3">
                {items.map((item, idx) => {
                  const cid = `exit-${category.replace(/\s+/g, "-")}-${idx}`;
                  return (
                  <div key={cid} className="flex items-start gap-2">
                    <Checkbox
                      id={cid}
                      checked={checkedItems[item] || false}
                      onCheckedChange={() => toggle(item)}
                      className="mt-1"
                    />
                    <Label
                      htmlFor={cid}
                      className={`text-sm font-medium ${
                        checkedItems[item] ? "text-muted-foreground line-through" : ""
                      }`}
                    >
                      {item}
                    </Label>
                  </div>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
        <div className="mt-4 flex gap-2">
          <Button type="button" variant="secondary" onClick={reset}>
            Reset
          </Button>
        </div>
      </Card>
    </main>
  );
}
