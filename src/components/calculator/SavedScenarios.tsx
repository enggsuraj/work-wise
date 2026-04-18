"use client";

import { useCallback, useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const KEY = "workwise-bookmarks-v1";

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  createdAt: number;
};

function load(): Bookmark[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(list: Bookmark[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export default function SavedScenarios() {
  const [items, setItems] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    setItems(load());
  }, []);

  const pushBookmark = useCallback((url: string, label: string) => {
    let u: URL;
    try {
      u = new URL(url, typeof window !== "undefined" ? window.location.origin : "https://workwisetool.site");
    } catch {
      return;
    }
    if (u.origin !== (typeof window !== "undefined" ? window.location.origin : u.origin)) {
      return;
    }
    const next: Bookmark = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title: label.trim() || u.pathname,
      url: u.href,
      createdAt: Date.now(),
    };
    const list = [next, ...load()];
    save(list);
    setItems(list);
    setTitle("");
    setUrlInput("");
  }, []);

  const addCurrent = useCallback(() => {
    if (typeof window === "undefined") return;
    const url = urlInput.trim() || window.location.href;
    pushBookmark(url, title);
  }, [title, urlInput, pushBookmark]);

  const remove = (id: string) => {
    const list = load().filter((x) => x.id !== id);
    save(list);
    setItems(list);
  };

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <h1 className="mb-2 text-center text-sm font-bold">SAVED BOOKMARKS</h1>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Stores titles and full URLs on this device only. Open any tool, set inputs, then save the
          page here (query params are preserved for tools that support sharing).
        </p>
        <CardContent className="space-y-4 px-0">
          <div>
            <Label className="mb-2 block w-full" htmlFor="bm-title">
              Title (optional)
            </Label>
            <Input
              id="bm-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Offer A — take-home"
            />
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="bm-url">
              URL (optional — defaults to this page)
            </Label>
            <Input
              id="bm-url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="/take-home-tds?g=80000&r=new"
            />
          </div>
          <Button type="button" onClick={addCurrent}>
            Save bookmark
          </Button>

          <ul className="space-y-2 border-t border-border pt-4">
            {items.length === 0 && (
              <li className="text-sm text-muted-foreground">No bookmarks yet.</li>
            )}
            {items.map((b) => (
              <li
                key={b.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-2 text-sm"
              >
                <a href={b.url} className="font-medium text-primary underline-offset-4 hover:underline">
                  {b.title}
                </a>
                <Button type="button" variant="secondary" size="sm" onClick={() => remove(b.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
