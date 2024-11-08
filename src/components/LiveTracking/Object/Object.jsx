import React, { useContext, useEffect } from "react";
import { popupcontext } from "../../../context/Popupscontext";
import ObjectDetails from "./ObjectDetails/ObjectDetails";
import ObjectMinimized from "./ObjectMinimized/ObjectMinimized";

export default function Object() {
  let { objectbody, handleShowObjectBody,setObjectbody } = useContext(popupcontext);
  useEffect(() => {
    return () => setObjectbody(true);
  }, [setObjectbody]);
  return (
    <>
        {objectbody ? (
          <ObjectDetails />
        ) : (
          <ObjectMinimized title="object" minimize={handleShowObjectBody} />
        )}
    </>
  );
}
