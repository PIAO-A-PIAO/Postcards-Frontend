import React from 'react'

function WriteLetterHeader() {
  return (
    <div id="header" className="w-full border-b flex py-4 px-8">
        <BackButton />
        <LetterTitle />
        <div className="flex"></div>
      </div>
  )
}

export default WriteLetterHeader