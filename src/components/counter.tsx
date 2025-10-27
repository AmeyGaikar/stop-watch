"use client";

import { useEffect, useRef, useState } from "react";

export default function Counter() {
  let intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const [counter, setCounter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isPlaying) {
      intervalId.current = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [isPlaying]);

  const hours = Math.floor(counter / 3600);
  const minutes = Math.floor((counter % 3600) / 60);
  const seconds = counter % 60;

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return (
    <div>
      <div className="flex justify-center text-6xl mt-5">{formattedTime}</div>

      <div className="flex justify-center gap-8 mt-6">
        <button
          className="p-3 bg-white text-black rounded-xl"
          onClick={() => setIsPlaying(true)}
        >
          start
        </button>
        <button
          className="p-3 bg-white text-black rounded-xl"
          onClick={() => setIsPlaying(false)}
        >
          stop
        </button>

        <button
          className="p-3 bg-white text-black rounded-xl"
          onClick={() => {
            setIsPlaying(false);
            setCounter(0);
          }}
        >
          reset
        </button>
      </div>
    </div>
  );
}
