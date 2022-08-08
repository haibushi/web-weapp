import { Modal, Form, Input, Upload, message, Button } from "antd";
import { useEffect } from "react";
import { find, add, update } from "../../api/productCategory";

interface PropsType {
  isModalVisible: boolean;
  handleCloseModal: () => void;
  getList?: () => void;
  id: number;
}
const Add = ({ isModalVisible, handleCloseModal, getList, id }: PropsType) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (isModalVisible) {
      form.resetFields();
    }
    if (id) {
      find({ id }).then((res) => {
        if (res.data.code === 200) {
          let { name, sort } = res.data.data;
          form.setFieldsValue({ name, sort });
        }
      });
    }
  }, [isModalVisible, id, form]);

  const onFinish = async () => {
    const values = await form.validateFields();

    if (id) {
      update(id, values).then((res) => {
        message.success(res.data.message);
        if (res.data.code === 200) {
          handleCloseModal();
          getList && getList();
        }
      });
    } else {
      add(values).then((res) => {
        message.success(res.data.message);
        if (res.data.code === 200) {
          handleCloseModal();
          getList && getList();
        }
      });
    }
  };

  return (
    <Modal
      title="添加"
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
          label="分类名称"
          name="name"
          rules={[{ required: true, message: "请输入分类名称!" }]}
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
