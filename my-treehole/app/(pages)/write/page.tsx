"use client"
import React, { useEffect, useState } from "react";

const WriteLetter = () => {
  const [letterContent, setLetterContent] = useState("");
  const [paperContents, setPaperContents] = useState<string[]>([]); // Array to store segmented contents
  const maxLines = 17; // Define your maximum number of lines here

  const handleSend = () => {
    // Example function to segment content based on maxLines
    const segments = segmentContent(letterContent);
    console.log("Segments:", segments);
    // Save segments or handle sending logic
  };

  const segmentContent = (content: string) => {
    // Function to segment content based on maxLines
    const lines = content.split("\n");
    const segments: string[] = [];
    let currentSegment = "";

    for (let i = 0; i < lines.length; i++) {
      if ((currentSegment + lines[i]).length <= maxLines) {
        currentSegment += lines[i] + "\n";
      } else {
        segments.push(currentSegment.trim());
        currentSegment = lines[i] + "\n";
      }
    }

    if (currentSegment.trim().length > 0) {
      segments.push(currentSegment.trim());
    }

    return segments;
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white overflow-y-scroll">
      <div className="w-1/2 h-full mb-6 relative">
        <textarea
          id="letterTextarea"
          className="bg-paper1 resize-none w-paper-w h-paper-h pt-paper-t pb-paper-b px-paper-x bg-no-repeat bg-cover border border-gray-300 rounded-lg focus:outline-none leading-paper-line text-2xl"
          placeholder="Write your letter here..."
          value={letterContent}
          onChange={(e) => setLetterContent(e.target.value)}
        ></textarea>
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => console.log("Back button clicked")}
          >
            Back
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none"
          onClick={() => console.log("Archive button clicked")}
        >
          Archive
        </button>
        <div>
          <button
            className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded focus:outline-none"
            onClick={() => console.log("Discard button clicked")}
          >
            Discard
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteLetter;
