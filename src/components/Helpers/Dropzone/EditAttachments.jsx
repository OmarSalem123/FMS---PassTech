import { useContext } from "react";

import { popupcontext } from "../../../context/Popupscontext";

export default function EditAttachments({ attachments }) {
  let { attachmentsId, setAttachmentsId } = useContext(popupcontext);

  const handleGetAttachIds = (id) => {
    if (!attachmentsId.includes(id)) {
      setAttachmentsId((prevAttachmentsId) => [...prevAttachmentsId, id]);
    }
  };

  const handleUndo = (id) => {
    setAttachmentsId((prevAttachmentsId) =>
      prevAttachmentsId.filter((attachmentId) => attachmentId !== id)
    );
  };
  const getUrl = (type) => {
    const lowerCaseType = type.toLowerCase(); // Normalize to lowercase
    if (lowerCaseType === "image/png") {
      return "/assets/PNG.svg";
    } else if (lowerCaseType === "image/jpg" || lowerCaseType === "image/jpeg") {
      return "/assets/JPG.svg";
    } else if (lowerCaseType === "application/pdf") {
      return "/assets/PDF.svg";
    } else {
      return "/assets/Excel.svg";
    }}
    const truncateName = (name) => {
      if (name.length > 9) {
        return `${name.substring(0, 9)}...`; // Truncate if longer than 10 chars
      }
      return name;
    };
  let files = attachments?.map((i) => {
    const isUndo = attachmentsId.includes(i.id);
    return (
      <div key={i.id} className="col-lg-4 col-md-6 col-sm-4 mt-3">
        <div className="attachments">
        <img src={`${getUrl(i.type)}`} width={28}  alt="format" />
        <div className="d-flex justify-content-between">
            <a href={i.url} target="blank" className="me-2">
            {truncateName(i.name)}
            </a>
          </div>
          <img
            src={isUndo ? `/assets/undo.svg` : `/assets/Close.svg`}
            alt={isUndo ? "Undo" : "Remove"}
            width={20}
            role="button"
            onClick={() =>
              isUndo ? handleUndo(i.id) : handleGetAttachIds(i.id)
            }
          />
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="row">{files}</div>
    </>
  );
}
