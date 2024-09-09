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

function getCurrentDateFormatted() {
  const today = new Date();

  // Get the year, month, and day from the Date object
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");

  // Return the formatted date string
  return `${year}${month}${day}`;
}

const WriteLetter = () => {
  console.log("rerendered");
  // Example usage
  const dateString = getCurrentDateFormatted();
  const [title, setTitle] = useState("New Letter " + dateString);

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
    console.log(textarea.selectionStart, textarea.selectionEnd);
    // console.log(newContent.length);
    const lines = Math.floor(
      (textarea.scrollHeight + 1) /
        parseFloat(window.getComputedStyle(textarea).lineHeight)
    );

    if (lines <= maxLines && newContent !== "") {
      const updatedPages = [...pages];
      updatedPages[currentPage] = newContent;
      setPages(updatedPages);
    } else if (lines > maxLines) {
      const textarea = textareaRef.current;

      if (!textarea) return;

      console.log("cursor at ", textarea.selectionEnd);
      setInitCursorPosition(textarea.selectionEnd);
      setInitVContent(newContent);
      setVContent(newContent);
      setVCurrentPage(currentPage);
    }
  };

  useEffect(() => {
    if (vCurrentPage === -1) return;
    if (relocateCursorOn) return;
    handleExceedLineLimit();
  }, [vCurrentPage]);

  const handleExceedLineLimit = () => {
    console.log("call handleExceedLineLimit");
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

    if (vLines === maxLines) {
      setFindVContentTrimIndexOn(false);
      updateNextPage();
    } else {
      //Trim one index to left
      setVContent(vContent.substring(0, vContent.lastIndexOf(" ")));
    }
    return;
  }, [findVContentTrimIndexOn, vContent]);

  const updateNextPage = () => {
    console.log("call updateNextPage");

    if (vContent === initVContent) {
      setVContent("");
      setInitVContent("");
      setVCurrentPage(-1);
      setRelocateCursorOn(true);
      return;
    } else if (vContent === "") {
      return;
    }
    const updatedPages = [...pages];
    updatedPages[vCurrentPage] = vContent;
    if (vCurrentPage === pages.length - 1) {
      updatedPages.push(initVContent.substring(vContent.length + 1));
    } else {
      updatedPages[vCurrentPage + 1] =
        initVContent.substring(vContent.length + 1) +
        " " +
        updatedPages[vCurrentPage + 1];
    }
    setPages(updatedPages);

    turnPage(updatedPages[vCurrentPage + 1]);
  };

  const [relocateCursorOn, setRelocateCursorOn] = useState(false);
  const turnPage = (nextVContent: string) => {
    const textarea = textareaRef.current;

    if (!textarea) return;
    console.log("call turnPage");
    setInitVContent(nextVContent);
    setVContent(nextVContent);
    setVCurrentPage(vCurrentPage + 1);
  };

  useLayoutEffect(() => {
    console.log("set relocation cursor");
    if (!relocateCursorOn) return;
    const textarea = textareaRef.current;

    if (!textarea) return;

    setTimeout(() => {
      let cursorPosition = initCursorPosition;
      let pageNumber = currentPage;
      while (cursorPosition > pages[currentPage].length) {
        cursorPosition -= pages[currentPage].length;
        pageNumber += 1;
      }
      setInitCursorPosition(-1);
      setCurrentPage(pageNumber);
      textarea.focus();
      console.log("new cursor position: " + cursorPosition);
      textarea.setSelectionRange(20, 20);
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
      <div id="header" className="w-full border-b flex py-4 px-8">
        <button className="text-gray-600 flex" onClick={() => router.back()}>
          <img src="./assets/icons/left.svg" alt="Back" />
          Back
        </button>
        <div className="flex-1 text-center">{title}</div>
        <div className="flex"></div>
      </div>
      <div
        id="middle"
        className="flex w-full h-full items-center justify-between overflow-auto"
      >
        <button
          id="last-page"
          className="w-6 h-6 rounded-full bg-white mx-10"
          onClick={goToPreviousPage}
        >
          <img src="./assets/icons/left.svg" alt="Previous Page" />
        </button>
        <div id="writing-area" className="w-full h-full overflow-y-scroll no-scrollbar">
          <div
            id="paper-bg"
            style={{ containerType: "size" }}
            className="relative mx-auto my-10 bg-paper1 w-2/3 aspect-paper bg-no-repeat bg-cover flex items-center justify-center"
          >
            <div id="page-number" className="absolute top-3">{currentPage + 1}</div>
            <div
              id="lines"
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
                fontSize: "2.5cqmin",
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
                fontSize: "2.5cqmin",
                lineHeight: "6cqmin",
              }}
              className="absolute outline-none bg-transparent resize-none w-4/5 h-4/5 z-0 no-scrollbar whitespace-pre-wrap break-words text-transparent"
            ></textarea>
          </div>
        </div>
        <button
          id="next-page"
          className="w-6 h-6 rounded-full bg-white mx-10"
          onClick={goToNextPage}
        >
          <img src="./assets/icons/right.svg" alt="Next Page" />
        </button>
      </div>
      <div
        id="footer"
        className="w-full flex py-4 px-8 border-t justify-between"
      >
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
