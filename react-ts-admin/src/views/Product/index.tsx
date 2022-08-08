import { Space, Button, Table, Modal, Popconfirm, message } from "antd";
import { useState, useEffect } from "react";
import Add from "./add";
import { listProduct, deleteProduct } from "../../api/product";
import type { Service } from "../../api/type";
interface DataType {
  key: React.Key;
  id: number;
  photo: string;
  link: string;
  sort: number;
  [key: string]: any;
}
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows,
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};

const Index = () => {
  const columns = [
    {
      title: "产品名称",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "产品图片",
      dataIndex: "product_url",
      key: "product_url",
      render(text: string) {
        return <img src={text} height="100" />;
      },
    },
    {
      title: "产品价格",
      dataIndex: "product_price",
      key: "product_price",
    },
    {
      title: "产品分类",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "操作",
      render(_: any, record: { id: number }) {
        return (
          <div>
            <Button type="default" onClick={() => handleUpdata(record.id)}>
              修改
            </Button>
            <Popconfirm
              title="确认删除?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox",
  );
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [dataId, setDataId] = useState<number>(0);
  const [selectAllIds, setSelectAllIds] = useState<React.Key[]>([]);

  let [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const handleUpdata = (id: number) => {
    setDataId(id);
    setIsModalVisible(true);
  };
  const handleDelete = (id: number) => {
    deleteProduct({ id }).then((res: any) => {
      if (res.data.code === 200) {
        message.success("操作成 功");
        getList();
      } else {
        message.success("操作失败");
      }
    });
  };

  const getList = () => {
    listProduct().then((res) => {
      const data = res.data.data.map((item: any) => {
        return {
          ...item,
          key: item.id,
        };
      });
      setDataSource(data as any[]);
    });
  };
  useEffect(() => {
    getList();
  }, []);

  const handleOpenModal = () => {
    setDataId(0);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h4>产品管理</h4>
      <Space style={{ width: "100%" }}>
        <Button type="primary" onClick={handleOpenModal}>
          新增
        </Button>
      </Space>
      <Table
        rowSelection={{
          type: selectionType,
          onChange: (selectedRowKeys: React.Key[]) => {
            setSelectAllIds(selectedRowKeys);
          },
          getCheckboxProps: (record: DataType) => ({
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name,
          }),
        }}
        dataSource={dataSource}
        columns={columns}
      />
      <Add
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
        getList={getList}
        id={dataId}
      />
    </div>
  );
};

export default Index;
