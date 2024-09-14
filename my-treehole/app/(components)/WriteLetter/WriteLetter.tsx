"use client";
import React from "react";
import WriteLetterHeader from "@/app/(components)/WriteLetter/WriteLetterHeader";
import WriteLetterMiddle from "@/app/(components)/WriteLetter/WriteLetterMiddle";
import WriteLetterFooter from "@/app/(components)/WriteLetter/WriteLetterFooter";
import { useAppDispatch, useAppSelector } from "@/app/api/redux-store/store"; // Ensure this is the correct path
import { selectUser } from "@/app/api/redux-store/userSlice"; // Path to your userSlice

function WriteLetter() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser);

  console.log('User from Redux:', user);

  return (
    <div className="relative flex flex-col w-screen h-screen bg-gray-100">
      <WriteLetterHeader />
      <WriteLetterMiddle />
      <WriteLetterFooter />
    </div>
  );
}

export default WriteLetter;
