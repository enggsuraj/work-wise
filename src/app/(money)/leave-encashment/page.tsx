import LeaveEncashment from "@/components/calculator/LeaveEncashment";

import { leaveEncashmentKeywords } from "@/constants";

export const metadata = {
  title: "Leave Encashment Calculator India | Accurate & Easy Calculation",
  description: "Calculate your leave encashment easily with our calculator for India. Includes rules, tax exemption, and more.",
  keywords: leaveEncashmentKeywords
};

const page = () => {
  return <LeaveEncashment />;
};

export default page;
