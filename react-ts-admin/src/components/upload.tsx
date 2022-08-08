import type { UploadChangeParam } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { message, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

interface PropsType {
  filename: string;
  setCallback: (str: string) => void;
}

const UploadCus = ({ filename, setCallback }: PropsType) => {
  let [loading, setLoading] = useState<boolean>(false);
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
      setLoading(true);
    }
    if (info.file.status === "done") {
      setLoading(false);
      setCallback(info.file.response.data);
      message.success("文件上传成功！");
    } else if (info.file.status === "error") {
      message.error("文件上传失败");
    }
  };
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Upload
      name="file"
      action="http://localhost:8080/tp5/public/api/index/uploadFile"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {filename ? (
        <img src={filename} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadCus;
