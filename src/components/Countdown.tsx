"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FlippingNumberProps {
  number: number;
}

const FlippingNumber: React.FC<FlippingNumberProps> = ({ number }) => {
  return (
    <div className="relative w-8 h-8 bg-red-600 rounded-lg overflow-hidden shadow-md">
      <motion.div
        key={number}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl font-bold text-white"
      >
        {number}
      </motion.div>
    </div>
  );
};

const ChristmasCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmas = new Date(new Date().getFullYear(), 11, 25);
      const now = new Date();
      const difference = christmas.getTime() - now.getTime();

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-xs sm:text-sm max-lg:justify-center text-white">
      <div className="flex flex-col items-center">
        <span className="text-[10px] sm:text-xs">Days</span>
        <FlippingNumber number={timeLeft.days} />
      </div>
      <span className="text-xs font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="text-[10px] sm:text-xs">Hrs</span>
        <FlippingNumber number={timeLeft.hours} />
      </div>
      <span className="text-xs font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="text-[10px] sm:text-xs">Min</span>
        <FlippingNumber number={timeLeft.minutes} />
      </div>
      <span className="text-xs font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="text-[10px] sm:text-xs">Sec</span>
        <FlippingNumber number={timeLeft.seconds} />
      </div>
    </div>
  );
};

export default ChristmasCountdown;
