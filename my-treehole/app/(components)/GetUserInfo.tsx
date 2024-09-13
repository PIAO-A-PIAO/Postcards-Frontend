"use client"; // Add this line to make it a client component
import ReduxProvider from "../api/redux-provider";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../api/store";
import { setUserState } from "../api/userSlice";

export const GetUserInfo = ({
  token,
  baseUrl,
}: {
  token: any;
  baseUrl: any;
}) => {
  return (
    <ReduxProvider>
      <GetUserInfoCore token={token} baseUrl={baseUrl} />
    </ReduxProvider>
  );
};

const GetUserInfoCore = ({ token, baseUrl }: { token: any; baseUrl: any }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/UserManagement/get-user`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: `token=${token.value}`,
          },
        });

        if (!response.ok) {
          console.error("Error fetching user info");
        } else {
          const result = await response.json();
          dispatch(setUserState(result.user));
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [token]); // Fetch only when the token is available

  return <div></div>;
};
