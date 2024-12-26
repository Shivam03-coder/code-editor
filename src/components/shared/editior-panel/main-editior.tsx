import React from "react";
import InputPanle from "./input-panel";
import OutPutPanel from "./output.panel";

const EditiorPanel = () => {
  return (
    <main className="mb-9 flex flex-1 gap-2">
      <InputPanle />
      <OutPutPanel />
    </main>
  );
};

export default EditiorPanel;
