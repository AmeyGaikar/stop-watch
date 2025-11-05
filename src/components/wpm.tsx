"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function WPM() {
  const [countDown, setCountDown] = useState(10);
  const [started, setStarted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const intervalID = useRef<ReturnType<typeof setInterval> | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const paragraph = `Ben 10: The Chrono Clash

The sun dipped below the skyline as Ben Tennyson lounged on the Rustbucket’s roof, Omnitrix gleaming faintly in the twilight. It had been months since his last real battle — too quiet, even for him. That’s when a sudden pulse vibrated through the watch, green light flashing wildly.

“Grandpa! Gwen! Something’s happening!” he shouted, just as a tear opened in the sky above them. Out stepped Vilgax — but this one looked… older. His armor was cracked, his tentacles metallic. “You’ve meddled with time for the last time, Tennyson!” the warlord bellowed.

Before Ben could react, a second flash appeared — and another Ben, older and wearing a sleek black Omnitrix suit, emerged. “Listen, kid,” Future Ben said, “this guy’s from a timeline where you lost. We can’t let him merge the timelines.”

Ben grinned. “Guess it’s time for double the hero!”

Slamming the Omnitrix, he morphed into XLR8, while Future Ben turned into Feedback. Together, they zipped and blasted through Vilgax’s drones, energy crackling through the air. The sky shimmered with temporal distortion — trees flickering between seasons, cars turning vintage, then futuristic.

Vilgax caught XLR8 mid-run, slamming him into a tree. “You can’t outrun destiny!” he roared. But Feedback intercepted, redirecting Vilgax’s energy blast straight back into the rift. The explosion tore the villain into a vortex of light, sealing the crack in time.

As the dust settled, the two Bens exchanged a smirk. “You’ll get there,” Future Ben said with a wink before fading away.

Back on the Rustbucket roof, Ben looked at the Omnitrix, which now displayed a faint new symbol — one he didn’t recognize.

“New alien unlocked,” he whispered, smiling. “Guess the future’s looking pretty awesome.`;



  //switch for starting the timer only one time, because onInput is called every time a user types something.
  const hanldeInput = () => {
    if (!started) setStarted(true);
  };

  //handling the submitted data.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = formData.get("wordsCal");
    setWpm((data as string).split(" ").length);
  };

  //submitting the form after 30s.
  useEffect(() => {
    if (countDown === 0 && formRef.current) {
      formRef.current.requestSubmit();
    }
  }, [countDown]);

  //Decreasing the countDown by 1sec.
  useEffect(() => {
    if (started) {
      intervalID.current = setInterval(() => {
        setCountDown((prev) => {
          if (prev <= 1) {
            if (intervalID.current) clearInterval(intervalID.current);
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalID.current) clearInterval(intervalID.current);
    };
  }, [started]);

  return (
    <div>
      <div className="bg-white text-black  flex justify-center">
        <p className="p-3">
         {paragraph}
        </p>
      </div>
      <div className="bg-white text-black flex justify-center items-center h-45 gap-4">
        <div className={countDown === 0 ? "hidden" : "inline-block"}>
          <form method="post" ref={formRef} onSubmit={handleSubmit}>
            <label htmlFor="wordsCal"> Start typing here: </label>
            <input
              className="border-2 rounded-xl p-4"
              type="text"
              name="wordsCal"
              id="wordsCal"
              onInput={hanldeInput}
            />
          </form>
        </div>
        <p> Time Remaining: {countDown} </p>
      </div>

      <div>
        <p className={countDown === 0 ? "flex justify-center" : "hidden"}>
          Your WPM score is: {wpm}
        </p>
      </div>
    </div>
  );
}
