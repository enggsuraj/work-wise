import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";

import { salaryData } from "@/constants";

export default function CTCvsInHand() {
  return (
    <div className="w-full max-w-2xl mx-auto lg:p-4 sm:p-2">
      <Table className="border border-gray-200 rounded-lg shadow-md text-sm">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="text-left font-semibold">
              Annual Salary (LPA)
            </TableHead>
            <TableHead className="text-left font-semibold">
              Monthly Salary Range
            </TableHead>
            <TableHead className="text-left font-semibold">
              Yearly Salary Range
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {salaryData.map((data, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <Label className="block text-sm font-medium mb-2">
                  {data.annual}
                </Label>
              </TableCell>
              <TableCell>{data.monthly}</TableCell>
              <TableCell>{data.yearly}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
