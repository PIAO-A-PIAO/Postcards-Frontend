import React from "react";
import ReduxProvider from "../api/redux-store/redux-provider";

function SaveDraft() {
  return (
    <ReduxProvider>
      <SaveDraftCore />
    </ReduxProvider>
  );
}

function SaveDraftCore() {
    
  return <></>;
}

export default SaveDraft;
