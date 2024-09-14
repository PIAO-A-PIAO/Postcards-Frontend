import React from 'react'

function WriteLetterMiddle() {
  return (
    <div
        id="middle"
        className="flex w-full h-full items-center justify-between overflow-auto"
      >
        <LastPageButton />
        <div
          id="writing-area"
          className="w-full h-full overflow-y-scroll no-scrollbar"
        >
          <WritingArea />
        </div>
        <NextPageButton />
      </div>
  )
}

export default WriteLetterMiddle