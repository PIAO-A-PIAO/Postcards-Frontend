"use client"; // Add this line to make it a client component
import ReduxProvider from "../api/redux-store/redux-provider";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../api/redux-store/store";
import { setUserState } from "../api/redux-store/userSlice";
import { setUnreadState, setUnsentState } from "../api/redux-store/letterSlice";

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
      <GetLettersCore token={token} baseUrl={baseUrl} />
    </ReduxProvider>
  );
};

const GetLettersCore = ({ token, baseUrl }: { token: any; baseUrl: any }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/Letters/get-unread-and-unsent-letters`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Cookie: `token=${token.value}`,
            },
          }
        );
        if (!response.ok) {
          console.error("Error fetching letter info");
        } else {
          const result = await response.json();
          dispatch(setUnreadState(result.unread));
          dispatch(setUnsentState(result.unsent));
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [token, baseUrl]);
  return <div></div>;
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
  }, [token, baseUrl]); // Fetch only when the token is available

  return <div></div>;
};
