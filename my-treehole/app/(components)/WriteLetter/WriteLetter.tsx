"use client";
import ReduxProvider from "@/app/api/redux-store/redux-provider";
import React from "react";
import WriteLetterHeader from "@/app/(components)/WriteLetter/WriteLetterHeader";
import WriteLetterMiddle from "@/app/(components)/WriteLetter/WriteLetterMiddle";
import WriteLetterFooter from "@/app/(components)/WriteLetter/WriteLetterFooter";

function WriteLetter() {

  return (
    <div className="relative flex flex-col w-screen h-screen bg-gray-100">
      <ReduxProvider>
        <WriteLetterHeader />
        <WriteLetterMiddle />
        <WriteLetterFooter />
      </ReduxProvider>
    </div>
  );
}

export default WriteLetter;
