import React, { ChangeEvent, useState } from "react";
import languages from "@/public/languages.js";
import LanguageButton from "./LanguageButton";
import Map from "./Map";
const OnboardingModal = ({ onClose }: { onClose: () => void }) => {
  const [screen, setScreen] = useState(1);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const nextScreen = () => {
    setScreen(screen + 1);
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
      const response = await fetch("./api/Treehole/update-user", {
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
    <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/2 h-2/3 fixed top-1/6 left-1/4 items-center">
        {screen === 1 && (
          <div className="text-center py-6 w-full h-full flex flex-col justify-between items-center">
            <div className="gap-2 w-2/3">
              <h1>Welcome to Our App!</h1>
              <p>We're glad to have you here. Let's get you started.</p>
            </div>
            <img
              className="h-1/2 aspect-video"
              src="./assets/placeholder.svg"
            />
            <button
              onClick={nextScreen}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-1/2 py-2 px-4 rounded mt-4"
            >
              Next
            </button>
          </div>
        )}

        {screen === 2 && (
          <div className="text-center py-6 w-full h-full flex flex-col justify-between items-center">
            <div className="gap-2 w-2/3">
              <h1>What languages do you use?</h1>
              <p>
                Tell us the languages in which you will write or read so we can
                send your letter to the right person!
              </p>
            </div>
            <div className="w-2/3 aspect-video gap-8 grid grid-cols-3 align-center rounded-lg border border-gray-200 overflow-y-auto p-4">
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
            <button
              onClick={languageNextScreen}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-1/2 py-2 px-4 rounded mt-4"
            >
              Next
            </button>
          </div>
        )}
        {screen === 3 && (
          <div className="text-center py-6 w-full h-full flex flex-col justify-between items-center">
            <div className="gap-2 w-2/3">
              <h1>Where are you?</h1>
              <p>
                Tell us your location on the map so we can estimate how long
                does it take to deliver your letters to other users.
              </p>
            </div>
            <div className="h-1/2 aspect-video">
              <Map
                onSelectLocation={handleSelectLocation}
                selectedLocation={location}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-1/2 py-2 px-4 rounded mt-4"
            >
              Next
            </button>
          </div>
        )}
        {screen === 4 && (
          <div className="text-center py-6 w-full h-full flex flex-col justify-between items-center">
            <div className="gap-2 w-2/3">
              <h1>Congragulations!</h1>
              <p>
                You need stamps to send out letters. You'll also receive stamps
                when others send a letter to you. Now feel free to explore!
              </p>
            </div>
            <img
              className="h-1/2 aspect-video"
              src="./assets/placeholder.svg"
            />
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-1/2 py-2 px-4 rounded mt-4"
            >
              Let's go
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingModal;
