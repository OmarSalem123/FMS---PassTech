import React, { createContext, useState } from "react";

export const exportContext = createContext();

export default function ExportDataContext({ children }) {
  let [exportedDataHeader, setExportedDataHeader] = useState([]);
  let [exportedDataBody, setExportedDataBody] = useState([]);
  let [fileName, setFileName] = useState("");
  return (
    <>
      <exportContext.Provider
        value={{
          exportedDataHeader,
          setExportedDataHeader,
          exportedDataBody,
          setExportedDataBody,
          fileName,
          setFileName,
        }}
      >
        {children}
      </exportContext.Provider>
    </>
  );
}
