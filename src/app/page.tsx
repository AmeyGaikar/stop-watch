"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState(" ");

  const expensiveCalc = (num: number) => {
    console.log("Running a expensive task...");
    for (let i = 0; i < 1e9; i++) {}
    return num * 2;
  };

  const countCal = useMemo(() => expensiveCalc(count), [count]);
  return (
    <>
      <h2>Count operation: {countCal}</h2>
      <button onClick={() => setCount((prev) => prev + 1)}>
        {"count " + count}
      </button>

      <input
        value={text}
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
    </>
  );
}
