"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { BotIcon } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";

import { RiChatAiLine } from "react-icons/ri";

import { CardContent } from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { frequentQuestions } from "@/constants";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

const AIModal = (props: any) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [aiInsight, setAIInsight] = useState<string>("");

  const fetchAIInsights = async (question: string) => {
    if (!session || !question) return;
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(question);
      const response = await result.response;
      const text = response.text();
      setAIInsight(text);
    } catch (error) {
      setAIInsight("Failed to generate AI insights.");
      console.error("Gemini AI Error:", error);
    }

    setLoading(false);
  };

  const {
    isAIModalOpen,
    setIsAIModalOpen,
    dropDownUserQuestion,
    setDropDownUserQuestion,
    userQuestion,
    setUserQuestion,
  } = props;
  return (
    <Dialog open={isAIModalOpen} onOpenChange={setIsAIModalOpen}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md transition-all duration-300" />
      <DialogTrigger asChild>
        <Button className="cursor-pointer w-full mt-4 flex items-center text-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 ease-in-out">
          <BotIcon className="w-full h-5 text-white" /> Get AI Insights
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-3xl max-w-3xl w-full mx-auto p-6 rounded-lg shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <RiChatAiLine className="mr-2" />
            Ask AI Insights
          </DialogTitle>
        </DialogHeader>

        <div>
          <Select
            value={dropDownUserQuestion || ""}
            onValueChange={(value) => setDropDownUserQuestion(value)}
          >
            <SelectTrigger className="mt-2 w-full border rounded-md p-3 text-gray-700">
              <SelectValue placeholder="Choose a frequently asked question" />
            </SelectTrigger>
            <SelectContent className="bg-white border rounded-md shadow-lg">
              {frequentQuestions.map((question, index) => (
                <SelectItem
                  key={index}
                  value={question}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {question}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Textarea
          className="p-3 border rounded-md w-full resize-none h-24"
          placeholder="Enter your question for AI..."
          value={userQuestion}
          onChange={(e: any) => setUserQuestion(e.target.value)}
        />

        <div className="flex justify-end">
          <Button
            className="text-white bg-green-600 hover:bg-green-700 cursor-pointer w-15"
            onClick={() =>
              fetchAIInsights(
                userQuestion ? userQuestion : dropDownUserQuestion
              )
            }
          >
            Send
          </Button>
        </div>

        {loading ? (
          <p className="mt-4 text-gray-600">Generating response...</p>
        ) : (
          aiInsight && (
            <CardContent className="mt-4 p-4 bg-gray-50 rounded-lg break-words h-100 overflow-scroll">
              {aiInsight}
            </CardContent>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AIModal;
