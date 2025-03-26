"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { BotIcon } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { RiChatAiLine } from "react-icons/ri";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";

import { CardContent } from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { frequentQuestions } from "@/constants";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

const AIModal = (props: any) => {
  const { data: session } = useSession();

  const {
    isAIModalOpen,
    setIsAIModalOpen,
    dropDownUserQuestion,
    setDropDownUserQuestion,
    userQuestion,
    setUserQuestion,
  } = props;

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

  const clearQuestions = () => {
    setUserQuestion("");
    setDropDownUserQuestion("");
    setAIInsight("");
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      fetchAIInsights(userQuestion ? userQuestion : dropDownUserQuestion);
    }
  };

  useEffect(() => {
    if (!isAIModalOpen) {
      setUserQuestion("");
      setDropDownUserQuestion("");
    }
  }, [isAIModalOpen]);

  useEffect(() => {
    if (userQuestion && userQuestion?.length > 0) {
      setDropDownUserQuestion("");
    }
  }, [userQuestion]);

  return (
    <Dialog open={isAIModalOpen} onOpenChange={setIsAIModalOpen}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md transition-all duration-300" />
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer w-full mt-4 flex items-center text-center justify-center gap-2 
  bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg 
  shadow-md shadow-blue-400/40 transition-all duration-300 ease-in-out"
        >
          <BotIcon className="h-5 text-white" /> Get AI Insights
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-3xl max-w-3xl w-full mx-auto p-6 rounded-lg shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <RiChatAiLine className="mr-2" />
            Ask AI Insights
          </DialogTitle>
        </DialogHeader>

        <div className="w-full">
          <Select
            value={dropDownUserQuestion || ""}
            onValueChange={(value) => setDropDownUserQuestion(value)}
          >
            <SelectTrigger className="mt-2 w-full max-w-full border rounded-md p-3 text-gray-700 overflow-hidden truncate cursor-pointer">
              <SelectValue placeholder="Choose a frequently asked question" />
            </SelectTrigger>
            <SelectContent className="bg-white border rounded-md shadow-lg w-full max-w-[90%] mx-auto">
              {frequentQuestions.map((question, index) => (
                <SelectItem
                  key={index}
                  value={question}
                  className="p-2 cursor-pointer hover:bg-gray-100 truncate w-full"
                >
                  <span className="block w-full truncate">{question}</span>
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
          onKeyDown={handleEnterPress}
        />

        <div className="flex justify-end">
          <Button
            className="mr-2 cursor-pointer w-15 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 ease-in-out"
            onClick={() =>
              fetchAIInsights(
                userQuestion ? userQuestion : dropDownUserQuestion
              )
            }
          >
            Send
          </Button>
          <Button
            onClick={clearQuestions}
            className="bg-white hover:bg-white cursor-pointer text-black border border-gray-300"
          >
            Clear
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-start">
            <video
              className="w-28 h-28 transform -translate-x-5"
              src="https://cdn.dribbble.com/userupload/17608183/file/original-a9b30b0413131d806620dc5db95c99f1.mp4"
              loop
              preload="auto"
              playsInline
              muted
              autoPlay
            />
          </div>
        ) : (
          aiInsight && (
            <CardContent className="mt-4 p-4 bg-gray-50 rounded-lg break-words h-100 overflow-scroll">
              <div className="prose prose-sm sm:prose lg:prose-lg prose-blue">
                <ReactMarkdown
                  components={{
                    strong: ({ children }) => (
                      <strong className="text-gray-900">{children}</strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-outside pl-5 text-gray-700">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => <li className="mt-1">{children}</li>,
                    p: ({ children }) => (
                      <p className="text-gray-800 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                  }}
                >
                  {aiInsight}
                </ReactMarkdown>
              </div>
            </CardContent>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AIModal;
