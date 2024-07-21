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
  const [vContent, setVContent] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const vTextareaRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  const hrElements = [];
  for (let i = 0; i < maxLines; i++) {
    hrElements.push(
      <hr className="border-gray-900" style={{ height: "6cqmin" }} key={i} />
    );
  }

  const [vCurrentPage, setVCurrentPage] = useState(-1);
  const [vPages, setVPages] = useState<string[]>([]);

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log("call handleChangeContent");
    const textarea = textareaRef.current;

    if (!textarea) return;
    const newContent = e.target.value;

    const lines = Math.floor(
      (textarea.scrollHeight + 1) /
        parseFloat(window.getComputedStyle(textarea).lineHeight)
    );
    if (lines <= maxLines && newContent !== "") {
      const updatedPages = [...pages];
      updatedPages[currentPage] = newContent;
      setPages(updatedPages);
    } else if (lines > maxLines) {
      setInitVContent(newContent);
      setVContent(newContent);
      setVCurrentPage(currentPage);
    }
  };

  useEffect(() => {
    if (vCurrentPage === -1) return;
    handleExceedLineLimit();
  }, [vCurrentPage]);

  const handleExceedLineLimit = () => {
    console.log("call handleExceedLineLimit");
    // if (vCurrentPage === pages.length - 1) {
    //last page
    findVContentTrimIndex();
    // }
    return;
  };

  const [findVContentTrimIndexOn, setFindVContentTrimIndexOn] = useState(false);
  const [initVContent, setInitVContent] = useState<string>("");
  const [initCursorPosition, setInitCursorPosition] = useState(-1);

  const findVContentTrimIndex = () => {
    console.log("call findVContentTrimIndex");
    const textarea = textareaRef.current;

    if (!textarea) return;

    console.log("cursor at ", textarea.selectionStart);
    // setInitCursorPosition(textarea.selectionStart);
    setFindVContentTrimIndexOn(true);
    return;
  };

  useEffect(() => {
    console.log("call findVContentTrimIndex Loop");
    const textarea = textareaRef.current;
    const vTextarea = vTextareaRef.current;
    if (!findVContentTrimIndexOn) return;
    if (!textarea) return;
    if (!vTextarea) return;
    const vLines = Math.floor(
      (vTextarea.scrollHeight + 1) /
        parseFloat(window.getComputedStyle(vTextarea).lineHeight)
    );
    console.log("vContent: ", vContent);
    if (vLines === maxLines && vContent.endsWith(" ")) {
      setFindVContentTrimIndexOn(false);
      updateNextPage();
    } else if (vContent === initVContent && vLines === maxLines) {
      setFindVContentTrimIndexOn(false);
      updateNextPage();
    } else {
      //Trim one index to left
      setVContent(vContent.substring(0, vContent.length - 1));
    }
    return;
  }, [findVContentTrimIndexOn, vContent]);

  const updateNextPage = () => {
    console.log("call updateNextPage");

    // if (vCurrentPage < pages.length - 1) {
    //   return;
    // }
    console.log("vContent: ", vContent);
    console.log("pages: ", pages);
    if (vContent === initVContent) {
      setVCurrentPage(-1);
      setInitVContent("");
      setVContent("");
      return;
    } else if (vContent === "") {
      return;
    }
    const updatedPages = [...pages];
    updatedPages[vCurrentPage] = vContent;
    if (vCurrentPage === pages.length - 1) {
      updatedPages.push(initVContent.substring(vContent.length));
    } else {
      updatedPages[vCurrentPage + 1] =
        initVContent.substring(vContent.length) +
        updatedPages[vCurrentPage + 1];
    }
    console.log("updatedPages: ", updatedPages);
    setPages(updatedPages);

    turnPage(updatedPages[vCurrentPage + 1]);
  };

  const [relocateCursorOn, setRelocateCursorOn] = useState(false);

  const turnPage = (nextVContent: string) => {
    const textarea = textareaRef.current;

    if (!textarea) return;
    console.log("call turnPage");
    // if (initCursorPosition >= vContent.length) {
    //   setCurrentPage(currentPage + 1);
    //   setInitCursorPosition(-1);
    //   setInitVContent("");
    //   setVContent("");
    //   return;
    // } else {
    //   setRelocateCursorOn(true);
    //   return;
    // }
    setInitVContent(nextVContent);
    setVContent(nextVContent);
    console.log("vContent is now: ", nextVContent);
    setVCurrentPage(vCurrentPage + 1);
  };

  useLayoutEffect(() => {
    console.log("set relocation cursor");
    if (!relocateCursorOn) return;
    const textarea = textareaRef.current;

    if (!textarea) return;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(initCursorPosition, initCursorPosition);
      setInitCursorPosition(-1);
      setInitVContent("");
      setVContent("");
      setRelocateCursorOn(false);
      return;
    }, 0);
  }, [relocateCursorOn]);

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
    <div className="relative flex flex-col w-screen h-screen bg-gray-100">
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
              style={{
                fontSize: "3cqmin",
                lineHeight: "6cqmin",
                paddingTop: "1cqmin",
              }}
              className="absolute outline-none bg-transparent resize-none w-4/5 h-4/5 z-10 no-scrollbar whitespace-pre-wrap break-words"
              placeholder="Write your letter here..."
            ></textarea>
            <textarea
              ref={vTextareaRef}
              value={vContent}
              onChange={() => {
                console.log("wrong textarea");
              }}
              style={{
                fontSize: "3cqmin",
                lineHeight: "6cqmin",
              }}
              className="absolute outline-none bg-transparent resize-none w-4/5 h-4/5 z-0 no-scrollbar whitespace-pre-wrap break-words text-transparent"
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
