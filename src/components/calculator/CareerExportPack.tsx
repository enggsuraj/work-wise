"use client";

import { useCallback, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { CalculatorHeading } from "@/components/common/CalculatorHeading";

export default function CareerExportPack() {
  const [name, setName] = useState("");
  const [lwd, setLwd] = useState("");
  const [currentCtc, setCurrentCtc] = useState("");
  const [newOffer, setNewOffer] = useState("");
  const [gratuity, setGratuity] = useState("");
  const [noticeBuyout, setNoticeBuyout] = useState("");
  const [notes, setNotes] = useState("");

  const buildMarkdown = useCallback(() => {
    const lines = [
      "## WorkWise career summary",
      "",
      name.trim() ? `**Name:** ${name.trim()}` : null,
      lwd ? `**Last working day:** ${lwd}` : null,
      currentCtc ? `**Current CTC (annual):** ₹${currentCtc}` : null,
      newOffer ? `**New offer (annual):** ₹${newOffer}` : null,
      gratuity ? `**Gratuity estimate:** ₹${gratuity}` : null,
      noticeBuyout ? `**Notice buyout estimate:** ₹${noticeBuyout}` : null,
      notes.trim() ? `**Notes:**\n${notes.trim()}` : null,
      "",
      `_Generated on ${new Date().toLocaleString("en-IN")}_`,
    ];
    return lines.filter(Boolean).join("\n");
  }, [name, lwd, currentCtc, newOffer, gratuity, noticeBuyout, notes]);

  const copyMd = async () => {
    try {
      await navigator.clipboard.writeText(buildMarkdown());
    } catch {
      /* ignore */
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="p-6 pt-0 print:p-0">
      <Card className="mx-auto w-full max-w-2xl rounded-2xl p-4 shadow-lg print:shadow-none sm:p-6 lg:p-8">
        <CalculatorHeading className="mb-2 print:hidden">CAREER SUMMARY EXPORT</CalculatorHeading>
        <p className="mb-4 text-center text-xs text-muted-foreground print:hidden">
          Fill what you need, then copy Markdown or use your browser print dialog to save as PDF.
        </p>
        <CardContent className="space-y-4 px-0 print:block">
          <div className="space-y-4 print:text-black">
            <div className="grid gap-4 print:hidden sm:grid-cols-2">
              <div>
                <Label className="mb-2 block w-full" htmlFor="ex-name">
                  Name (optional)
                </Label>
                <Input
                  id="ex-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div>
                <Label className="mb-2 block w-full" htmlFor="ex-lwd">
                  Last working day
                </Label>
                <Input
                  id="ex-lwd"
                  type="date"
                  value={lwd}
                  onChange={(e) => setLwd(e.target.value)}
                />
              </div>
              <div>
                <Label className="mb-2 block w-full" htmlFor="ex-ctc">
                  Current CTC (₹ / year)
                </Label>
                <Input
                  id="ex-ctc"
                  inputMode="decimal"
                  value={currentCtc}
                  onChange={(e) => setCurrentCtc(e.target.value)}
                />
              </div>
              <div>
                <Label className="mb-2 block w-full" htmlFor="ex-offer">
                  New offer (₹ / year)
                </Label>
                <Input
                  id="ex-offer"
                  inputMode="decimal"
                  value={newOffer}
                  onChange={(e) => setNewOffer(e.target.value)}
                />
              </div>
              <div>
                <Label className="mb-2 block w-full" htmlFor="ex-grat">
                  Gratuity estimate (₹)
                </Label>
                <Input
                  id="ex-grat"
                  inputMode="decimal"
                  value={gratuity}
                  onChange={(e) => setGratuity(e.target.value)}
                />
              </div>
              <div>
                <Label className="mb-2 block w-full" htmlFor="ex-buy">
                  Notice buyout (₹)
                </Label>
                <Input
                  id="ex-buy"
                  inputMode="decimal"
                  value={noticeBuyout}
                  onChange={(e) => setNoticeBuyout(e.target.value)}
                />
              </div>
            </div>

            <div className="print:hidden">
              <Label className="mb-2 block w-full" htmlFor="ex-notes">
                Notes
              </Label>
              <Textarea
                id="ex-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
                placeholder="Relocation, visa, equity cliff…"
              />
            </div>

            <div className="hidden rounded-lg border border-border bg-card p-4 print:block">
              <h2 className="text-lg font-bold">Career summary</h2>
              {name.trim() && (
                <p className="mt-2">
                  <span className="font-medium">Name: </span>
                  {name.trim()}
                </p>
              )}
              {lwd && (
                <p>
                  <span className="font-medium">Last working day: </span>
                  {lwd}
                </p>
              )}
              {currentCtc && (
                <p>
                  <span className="font-medium">Current CTC: </span>₹{currentCtc}
                </p>
              )}
              {newOffer && (
                <p>
                  <span className="font-medium">New offer: </span>₹{newOffer}
                </p>
              )}
              {gratuity && (
                <p>
                  <span className="font-medium">Gratuity estimate: </span>₹{gratuity}
                </p>
              )}
              {noticeBuyout && (
                <p>
                  <span className="font-medium">Notice buyout: </span>₹{noticeBuyout}
                </p>
              )}
              {notes.trim() && (
                <p className="mt-2 whitespace-pre-wrap">
                  <span className="font-medium">Notes: </span>
                  {notes.trim()}
                </p>
              )}
              <p className="mt-4 text-sm text-muted-foreground">
                Generated {new Date().toLocaleString("en-IN")} — workwisetool.site
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 print:hidden">
            <Button type="button" onClick={copyMd}>
              Copy as Markdown
            </Button>
            <Button type="button" variant="secondary" onClick={handlePrint}>
              Print / Save PDF
            </Button>
          </div>

          <pre className="max-h-48 overflow-auto rounded-md bg-muted p-3 text-xs print:hidden">
            {buildMarkdown()}
          </pre>
        </CardContent>
      </Card>
    </main>
  );
}
