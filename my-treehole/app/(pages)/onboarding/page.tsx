"use client";
import React, { useState } from "react";
import languages from "@/public/languages.js";
import LanguageButton from "@/app/(components)/LanguageButton";
import Map from "@/app/(components)/Map";
import { useRouter } from "next/navigation";

const OnboardingPage = () => {
  const [screen, setScreen] = useState(1);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const onClose = () => {
    router.refresh();
    router.push("/");
  };

  const nextScreen = () => {
    setScreen(screen + 1);
  };

  const prevScreen = () => {
    if (screen > 1) {
      setScreen(screen - 1);
    }
  };

  const languageNextScreen = () => {
    if (selectedLanguages.length > 0) {
      nextScreen();
    } else {
      setErrorMsg("Please select a language");
      return;
    }
  };

  const handleSubmit = async () => {
    if (!location) {
      setErrorMsg("Please select a location");
      return;
    }
    const formData = {
      languages: selectedLanguages,
      location: location,
    };
    try {
      const response = await fetch("./api/Treehole/UserManagement/update-user", {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        const result = await response.json();
        console.log(result);
      }
    } catch (error) {}
    nextScreen();
  };

  const handleLanguageChange = (code: string) => {
    setSelectedLanguages(
      selectedLanguages.includes(code)
        ? selectedLanguages.filter((lang) => lang !== code)
        : [...selectedLanguages, code]
    );
  };

  const handleSelectLocation = (location: string) => {
    setLocation(location);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      {screen === 1 && (
        <div className="text-center py-24 w-full h-full flex flex-col items-center gap-8">
          <div className="space-y-4 w-1/2">
            <h1>Welcome to Our App!</h1>
            <p>We're glad to have you here. Let's get you started.</p>
          </div>
          <img className="h-2/3 aspect-video" src="./assets/placeholder.svg" />
          <div className="flex justify-end w-full py-8 px-16 fixed bottom-0">
            <button
              onClick={nextScreen}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {screen === 2 && (
        <div className="text-center py-24 w-full h-full flex flex-col gap-8 items-center">
          <div className="space-y-4 w-1/2">
            <h1>What languages do you use?</h1>
            <p>
              Tell us the languages in which you will write or read so we can
              send your letter to the right person!
            </p>
          </div>
          <div className="h-2/3 aspect-video gap-8 grid grid-cols-4 align-center rounded-lg border border-gray-200 overflow-y-auto p-4">
            {languages.map((lang) => (
              <LanguageButton
                key={lang.code}
                uri={lang.uri}
                name={lang.name}
                isSelected={selectedLanguages.includes(lang.code)}
                onChange={() => handleLanguageChange(lang.code)}
              />
            ))}
          </div>
          <div className="flex justify-between w-full px-16 py-6 fixed bottom-0">
            <button
              onClick={prevScreen}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Back
            </button>
            <button
              onClick={languageNextScreen}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {screen === 3 && (
        <div className="text-center py-24 w-full h-full flex flex-col gap-8 items-center">
          <div className="space-y-4 w-1/2">
            <h1>Where are you?</h1>
            <p>
              Tell us your location on the map so we can estimate how long does
              it take to deliver your letters to other users.
            </p>
          </div>
          <div className="h-2/3 aspect-video">
            <Map
              onSelectLocation={handleSelectLocation}
              selectedLocation={location}
            />
          </div>
          <div className="flex justify-between w-full px-16 py-6 fixed bottom-0">
            <button
              onClick={prevScreen}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {screen === 4 && (
        <div className="text-center py-24 w-full h-full flex flex-col gap-8 items-center">
          <div className="space-y-4 w-1/2">
            <h1>Congratulations!</h1>
            <p>
              You need stamps to send out letters. You'll also receive stamps
              when others send a letter to you. Now feel free to explore!
            </p>
          </div>
          <img className="h-2/3 aspect-video" src="./assets/placeholder.svg" />
          <div className="flex justify-between w-full py-8 px-16 fixed bottom-0">
            <button
              onClick={prevScreen}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Back
            </button>
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Let's Go!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingPage;
