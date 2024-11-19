"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

import { CheckCircle, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import ChristmasCountdown from "@/components/Countdown";
import { CardDialog, CongratulationsDialog } from "@/components/Dialogs";
import Snowflakes from "@/components/Snowflakes";
import { config } from "../../../config";

type Day = number;

export default function Calendar() {
  const days = Array.from({ length: 24 }, (_, i) => i + 1);
  const [isDecember, setIsDecember] = useState<boolean>(false);
  const [completedDays, setCompletedDays] = useState<Day[]>([]);
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showCongratulations, setShowCongratulations] =
    useState<boolean>(false);
  const [allDaysCompleted, setAllDaysCompleted] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date();
    setCurrentDay(today.getDate());
    setIsDecember(today.getMonth() === config.december);
    const storedProgress = JSON.parse(localStorage.getItem("progress") || "[]");
    setCompletedDays(storedProgress);
  }, []);

  const toggleDay = (day: Day) => {
    let updatedProgress;
    if (completedDays.includes(day)) {
      updatedProgress = completedDays.filter((d) => d !== day);
    } else {
      updatedProgress = [...completedDays, day];
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    setCompletedDays(updatedProgress);
    localStorage.setItem("progress", JSON.stringify(updatedProgress));
    if (updatedProgress.length === 24) {
      setAllDaysCompleted(true);
    }
  };

  const isDayAccessible = (day: Day) => {
    return day <= currentDay && isDecember;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-green-900 to-red-900 text-white">
      <Snowflakes />
      <header className="fixed top-0 left-0 w-full bg-red-800 px-4 py-2 shadow-lg z-50">
        <div className="flex flex-wrap items-center justify-between">
          <Link href="/" className="flex gap-2 items-center text-lg font-bold">
            <img src="logo.png" className="h-8 w-8 rounded-lg" />
            {config.title}
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-md">{completedDays.length} / 24 Days</span>
            <div className="w-48 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-br from-green-400 to-green-600 h-3 rounded-full transition-all"
                style={{ width: `${(completedDays.length / 24) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="hidden lg:block text-sm lg:text-base">
            <ChristmasCountdown />
          </div>
        </div>
      </header>
      <div className="lg:hidden pt-12 mx-auto px-4">
        <ChristmasCountdown />
      </div>
      <div className="lg:mt-14 max-w-7xl mx-auto p-4 sm:p-8">
        {!isDecember && (
          <div className="text-white w-full flex items-center justify-center mx-auto mb-5">
            <p>You can view content when December arrives!</p>
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence>
            {days.map((day) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                transition={{ duration: 0.5, delay: day * 0.05 }}
              >
                <Card
                  className={`overflow-hidden transform transition-all duration-300 ease-in-out h-28 sm:h-36 ${
                    isDayAccessible(day)
                      ? completedDays.includes(day)
                        ? "bg-gradient-to-br from-green-700 to-green-900 cursor-pointer hover:scale-105"
                        : "bg-gradient-to-br from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 cursor-pointer hover:scale-105"
                      : "bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed opacity-50"
                  } ${
                    day === currentDay && isDecember
                      ? "ring-4 ring-yellow-400 ring-opacity-50"
                      : ""
                  } shadow-lg hover:shadow-xl`}
                >
                  <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center h-full relative">
                    <Button
                      variant="ghost"
                      className={`w-full h-full text-lg sm:text-2xl font-bold hover:bg-transparent ${
                        isDayAccessible(day) ? "text-white" : "text-gray-300"
                      }`}
                      onClick={() => {
                        if (isDayAccessible(day)) {
                          const isCompleted = completedDays.includes(day);
                          toggleDay(day);
                          if (!isCompleted) {
                            setSelectedDay(day);
                          }
                        }
                      }}
                      disabled={!isDayAccessible(day)}
                    >
                      {completedDays.includes(day) ? (
                        <CheckCircle className="w-12 h-12 sm:w-24 sm:h-24 text-yellow-300" />
                      ) : (
                        <>
                          <span className="absolute top-2 left-2 text-sm sm:text-base">
                            Day
                          </span>
                          <span className="text-3xl">{day}</span>
                          <Gift className="w-8 h-8 sm:w-12 sm:h-12 absolute bottom-2 right-2" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <CardDialog
        isOpen={selectedDay !== null}
        onClose={() => setSelectedDay(null)}
        day={selectedDay}
        allDaysCompleted={allDaysCompleted}
        setShowCongratulations={setShowCongratulations}
      />
      <CongratulationsDialog
        isOpen={showCongratulations}
        onClose={() => setShowCongratulations(false)}
      />
    </div>
  );
}
