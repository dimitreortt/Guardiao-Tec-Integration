import { Button } from "@mui/material";
import React, { FunctionComponent } from "react";

type Props = { setFile: any; name?: string };

export const FileUploader: FunctionComponent<Props> = ({ setFile, name }) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    //@ts-ignore
    hiddenFileInput.current.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
    // props.handleFile(fileUploaded);
  };

  return (
    <>
      <Button onClick={handleClick}>{name ? name : "Upload a file"}</Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
};
