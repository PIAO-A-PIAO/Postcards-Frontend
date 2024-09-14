import ReduxProvider from "@/app/api/redux-store/redux-provider";
import React from "react";
import WriteLetter from "./page copy";

function Page() {
  return (
    <ReduxProvider>
      <WriteLetter />
    </ReduxProvider>
  );
}

export default Page;
