import { Modal, Form, Input, Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { addLunbo, update } from "../../api/lunbo";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { find } from "../../api/lunbo";

import UploadCus from "../../components/upload";
interface PropsType {
  isModalVisible: boolean;
  handleCloseModal: () => void;
  getList?: () => void;
  id: number;
}
const Add = ({ isModalVisible, handleCloseModal, getList, id }: PropsType) => {
  const [form] = Form.useForm();
  let [filename, setFilename] = useState<string>("");
  let [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isModalVisible) {
      form.resetFields();
      setFilename("");
    }
    if (id) {
      find({ id }).then((res) => {
        if (res.data.code === 200) {
          setFilename(res.data.data?.photo || "");
          let { link, sort, photo } = res.data.data;
          form.setFieldsValue({ link, sort, photo });
        }
      });
    }
  }, [isModalVisible, id, form]);

  const onFinish = async () => {
    const values = await form.validateFields();
    console.log(values);
    const data = Object.assign({}, values, { photo: filename });
    if (id) {
      update(id, data).then((res) => {
        message.success(res.data.message);
        if (res.data.code === 200) {
          handleCloseModal();
          getList && getList();
        }
      });
    } else {
      addLunbo(data).then((res) => {
        message.success(res.data.message);
        if (res.data.code === 200) {
          handleCloseModal();
          getList && getList();
        }
      });
    }
  };
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
      setLoading(true);
    }
    if (info.file.status === "done") {
      setLoading(false);
      setFilename(info.file.response.data);
      message.success("文件上传成功！");
    } else if (info.file.status === "error") {
      message.error("文件上传失败");
    }
  };

  const setCallback = (filename: string) => {
    setFilename(filename);
    form.setFieldsValue({ photo: filename });
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
    <Modal
      title="添加轮播图"
      visible={isModalVisible}
      onOk={onFinish}
      onCancel={handleCloseModal}
      cancelText="取消"
      okText="确认"
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="轮播图"
          name="photo"
          rules={[{ required: true, message: "请上传图片" }]}
        >
          <UploadCus filename={filename} setCallback={setCallback} />
        </Form.Item>
        <Form.Item
          label="跳转链接"
          name="link"
          rules={[{ required: true, message: "请输入跳转链接!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="排序"
          name="sort"
          rules={[{ required: true, message: "请输入排序!" }]}
        >
          <Input />
        </Form.Item>
        `
      </Form>
    </Modal>
  );
};

export default Add;
