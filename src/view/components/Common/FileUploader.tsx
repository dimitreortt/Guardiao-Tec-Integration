import { Button } from "@mui/material";
import React, { FunctionComponent } from "react";

type Props = {
  setFile: any;
  name?: string;
  onUpload?: any;
  buttonText?: string;
};

export const FileUploader: FunctionComponent<Props> = ({
  setFile,
  name,
  onUpload = () => {},
  buttonText,
}) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    //@ts-ignore
    hiddenFileInput.current.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
    onUpload();
    // props.handleFile(fileUploaded);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{ textTransform: "none", fontSize: 15 }}
      >
        {name ? name : buttonText ? buttonText : "Selecionar Arquivo"}
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
};
