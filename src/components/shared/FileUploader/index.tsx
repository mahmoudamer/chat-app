import React, { useRef, useState } from "react";
import attachSquare from "../../../assets/images/attach-square.svg";
import "./index.scss";
function FileUploader() {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const fileInputRef = useRef<any>();

  const handleInputChange = (event: any) => {
    setSelectedFile(event?.target.files[0]);
  };

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
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
}

export default FileUploader;
