import React, { useContext } from "react";
import { useDropzone } from "react-dropzone";
import EditAttachments from "./EditAttachments";
import { popupcontext } from "../../../context/Popupscontext";

export default function Dropfile({ addData, name, EditableAttachments }) {
  let { isEditing, setAttachments } = useContext(popupcontext);
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDropAccepted: async (files) => {
      await addData?.setFieldValue(name, files);
      setAttachments(files);
    },
  });

  const hasFiles = acceptedFiles.length > 0;

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <div onClick={open}>
        <p className="fs-16 fw-700 brand-700 text-uppercase">Attachments</p>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>
            Drag files here or <span>Upload</span>
          </p>
        </div>
        {hasFiles && (
          <aside>
            <h6 className="mt-2">Files</h6>
            <ul>{files}</ul>
          </aside>
        )}
      </div>
      {isEditing && <EditAttachments attachments={EditableAttachments} />}
    </>
  );
}
