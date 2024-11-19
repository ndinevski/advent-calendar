"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import Countdown from "@/components/Countdown";
import { Button } from "@/components/ui/button";
import Snowflakes from "@/components/Snowflakes";

import { config } from "../../config";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-green-800 to-green-900 min-h-screen flex flex-col items-center justify-center text-white relative">
      <Snowflakes />
      <motion.div
        className="flex flex-col items-center gap-2 text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img src="logo.png" className="h-32 w-32 rounded-lg" alt="Logo" />
        <h1 className="text-4xl sm:text-5xl font-bold">{config.title}</h1>
        <Countdown />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Link href="/calendar">
          <Button className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-110">
            Go to the Calendar
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
