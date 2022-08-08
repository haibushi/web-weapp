import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface PropsType {
  getTextAreaVal: (val: string) => void;
}
function BraftTextarea({ getTextAreaVal }: PropsType) {
  const [value, setValue] = useState("");
  const changeHandle = (value: string) => {
    setValue(value);
    getTextAreaVal(value);
  };
  return <ReactQuill theme="snow" value={value} onChange={changeHandle} />;
}

export default BraftTextarea;
