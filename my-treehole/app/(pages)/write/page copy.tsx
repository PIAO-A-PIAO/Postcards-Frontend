"use client";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const WriteLetter = () => {
  const maxLines = 17;
  const [pages, setPages] = useState<string[]>([""]);
  const [currentPage, setCurrentPage] = useState(0);
  const [virtualContent, setVirtualContent] = useState("");
  const [originalVirtualContent, setOriginalVirtualContent] = useState("");
  const [virtualCursorPosition, setVirtualCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const virtualTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const router = useRouter();
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const hrElements = [];
  for (let i = 0; i < maxLines; i++) {
    hrElements.push(
      <hr className="border-gray-900" style={{ height: "6cqmin" }} key={i} />
    );
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    setKeyPressed(e.key);
  };

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    const textarea = textareaRef.current;
    if (textarea) {
      const currentLine = Math.floor(
        textarea?.scrollHeight /
          parseFloat(window.getComputedStyle(textarea).lineHeight)
      );
      if (currentLine <= maxLines) {
        const updatedPages = [...pages];
        updatedPages[currentPage] = newContent;
        setPages(updatedPages);
      } else {
        setOriginalVirtualContent(newContent);
        setVirtualContent(newContent);
        setVirtualCursorPosition(textarea.selectionStart);
      }
    }
  };

  useEffect(() => {
    const virtualTextarea = virtualTextareaRef.current;
    if (virtualTextarea) {
      const currentVirtualLine = Math.floor(
        virtualTextarea.scrollHeight /
          parseFloat(window.getComputedStyle(virtualTextarea).lineHeight)
      );
      if (currentVirtualLine > maxLines || !virtualContent.endsWith(" ")) {
        // Avoid updating if the content is already trimmed or exceeds maxLines

        setVirtualContent(
          virtualContent.substring(0, virtualContent.length - 1)
        );
      } else {
        const updatedPages = [...pages];
        updatedPages[currentPage] = virtualContent;
        if (currentPage === pages.length - 1) {
          //last page
          updatedPages.push(
            originalVirtualContent.substring(virtualContent.length)
          );
          setPages(updatedPages);
        } else {
          //in middle
          updatedPages[currentPage + 1] =
            originalVirtualContent.substring(virtualContent.length) +
            updatedPages[currentPage + 1];
          setPages(updatedPages);
        }

        if (virtualCursorPosition === originalVirtualContent.length) {
          //typing at end on last page
          setCurrentPage(currentPage + 1);
        } else {
          //
          setCursorPosition(virtualCursorPosition);
        }
      }
    }
  }, [virtualContent]);

  useLayoutEffect(() => {
    setTimeout(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  }, [cursorPosition]);
  const handleSend = () => {
    console.log("Send button clicked");
    // Add your send logic here
  };

  const handleArchive = () => {
    console.log("Archive button clicked");
    // Add your archive logic here
  };

  const handleDiscard = () => {
    console.log("Discard button clicked");
    // Add your discard logic here
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-100">
      <div className="w-full border-b flex py-4 px-8">
        <button className="text-gray-600 flex" onClick={() => router.back()}>
          <img src="./assets/icons/left.svg" alt="Back" />
          Back
        </button>
      </div>
      <div className="flex w-full h-full items-center justify-between overflow-auto">
        <button
          className="w-6 h-6 rounded-full bg-white mx-10"
          onClick={goToPreviousPage}
        >
          <img src="./assets/icons/left.svg" alt="Previous Page" />
        </button>
        <div className="w-full h-full overflow-y-scroll no-scrollbar">
          <div
            style={{ containerType: "size" }}
            className="relative bg-paper1 w-full aspect-paper bg-no-repeat bg-cover flex items-center justify-center"
          >
            <div
              className="absolute w-4/5 h-4/5"
              style={{ paddingTop: "6cqmin" }}
            >
              {hrElements}
            </div>
            <textarea
              ref={textareaRef}
              value={pages[currentPage]}
              onChange={handleChangeContent}
              onKeyDown={handleKeyDown}
              onClick={() => {
                const textarea = textareaRef.current;
                if (textarea) {
                  console.log("current position: " + textarea.selectionStart);
                }
              }}
              wrap="hard"
              style={{
                fontSize: "3cqmin",
                lineHeight: "6cqmin",
                paddingTop: "1cqmin",
              }}
              className="absolute outline-none bg-transparent resize-none w-4/5 h-4/5 z-10 no-scrollbar"
              placeholder="Write your letter here..."
            ></textarea>
            <textarea
              ref={virtualTextareaRef}
              value={virtualContent}
              onChange={() => {}}
              wrap="hard"
              style={{
                fontSize: "3cqmin",
                lineHeight: "6cqmin",
                paddingTop: "1cqmin",
              }}
              className="absolute z-0 outline-none bg-transparent resize-none w-4/5 h-4/5 text-transparent no-scrollbar"
            ></textarea>
          </div>
        </div>
        <button
          className="w-6 h-6 rounded-full bg-white mx-10"
          onClick={goToNextPage}
        >
          <img src="./assets/icons/right.svg" alt="Next Page" />
        </button>
      </div>
      <div className="w-full flex py-4 px-8 border-t justify-between">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none"
          onClick={handleArchive}
        >
          Archive
        </button>
        <div>
          <button
            className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded focus:outline-none"
            onClick={handleDiscard}
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
