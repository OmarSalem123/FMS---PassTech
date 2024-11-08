/* eslint-disable react/style-prop-object */
import React, { useState, useEffect, useContext } from "react";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import Button from "../Button/Button";
import { popupcontext } from "../../../context/Popupscontext";

export default function ProfilePicture({ addData }) {
  const [undo, setUndo] = useState(false);
  let { picture, setPicture } = useContext(popupcontext);
  const defaultImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"; // Default image
  const [image, setImage] = useState(defaultImage); // Default to placeholder image

  // Function to handle file upload from Dropzone
  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0]; // Get the first uploaded file
    if (file) {
      try {
        // Update state and Formik field with the new file
        setImage(URL.createObjectURL(file)); // Set image preview using URL.createObjectURL
        addData.setFieldValue("picture", [file]); // Update Formik field with the file
      } catch (error) {
        console.error("Error uploading the image", error);
      }
    }
  };

  // Function to handle deleting the uploaded photo
  const handleDelete = () => {
    setImage(defaultImage); // Reset to the default image
    //addData.setFieldValue("picture", []); // Clear the Formik field
    setPicture(true);
    setUndo(true);
  };
  const handleUndo = () => {
    setImage(addData.values.picture); // Reset to the default image
    //addData.setFieldValue("picture", [addData.values.picture]); // Clear the Formik field
    setUndo(false);
    setPicture(false);
  };
  // Fetch local image on component mount (optional)
  useEffect(() => {
    setImage(addData.values.picture);
  }, [setImage, addData.values.picture]); // Empty dependency array to run only once on mount

  const currentImage = () => {
    // Use the uploaded image if available, else fall back to the default image
    if (addData.values.picture?.length > 0) {
      return String(image); // Use the uploaded image URL
    }
    if (addData.values.picture === null) return defaultImage;
    return String(image); // Fallback to the default or previously set image
  };

  return (
    <div className="mb-24">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps, open }) => (
          <div className="text-center">
            <div {...getRootProps()} className="profile-picture-container">
              <AvatarEditor
                width={102}
                height={102}
                image={currentImage()} // Show the correct image based on the editing state and uploaded image
                border={0}
                className="profile-picture-container"
              />
              <input {...getInputProps()} />
            </div>
            <div className="text-center mt-2">
              <Button
                type="button"
                style="button btn-success p-4-12"
                text="Upload Image"
                onClick={open} // Open dropzone when the button is clicked
              />
            </div>
            {!addData.values.picture === null ||
              ((addData.values.picture?.length > 0 || undo) && (
                <div className="text-center mt-2">
                  <Button
                    type="button"
                    style="button btn-danger p-4-12"
                    text={undo ? "Undo Image" : "Delete Image"}
                    onClick={undo ? handleUndo : handleDelete} // Delete the uploaded image
                  />
                </div>
              ))}
          </div>
        )}
      </Dropzone>
    </div>
  );
}
