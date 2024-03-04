import React, { FC, useRef, useState } from "react";
import attachSquare from "../../../assets/images/attach-square.svg";
import "./index.scss";
const FileUploader: FC<any> = ({
  handleInputChange,
  setSelectedFile,
  selectedFile,
}) => {
  const fileInputRef = useRef<any>();

  const handleDeleteFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = "";
  };

  return (
    <div className="file-uploader-container">
      {selectedFile && (
        <div className="selected-file">
          {selectedFile?.name}
          <span onClick={handleDeleteFile}>x</span>
        </div>
      )}
      <label htmlFor="file-upload" className="file-uploader">
        <img src={attachSquare} />
        <input
          ref={fileInputRef}
          type="file"
          id="file-upload"
          hidden
          onChange={(e) => handleInputChange(e)}
        />
      </label>
    </div>
  );
};

export default FileUploader;
