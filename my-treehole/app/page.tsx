"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import OnboardingModal from "./(components)/OnboardingModal";

export default function Home() {
  const effectRan = useRef(false);
  const [onboard, setOnboard] = useState(true);

  const handleFinishOnboarding = () => {};
  useEffect(() => {
    if (!effectRan.current) {
      const searchTreehole = async () => {
        try {
          const response = await fetch("/api/Treehole/get-user");
          if (!response.ok) {
            const result = await response.json();
            console.log(result);
          } else {
            const result = await response.json();
            setOnboard(result.onboard);
            console.log(result);
          }
        } catch (error) {}
      };

      searchTreehole();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
  return (
    <main className="bg-gray-50 flex w-screen h-screen flex-col items-center justify-between p-24">
      {!onboard && <OnboardingModal onClose={handleFinishOnboarding} />}
    </main>
  );
}
