import { Space, Button, Table, Modal, Popconfirm, message } from "antd";
import { useState, useEffect } from "react";
import Add from "./add";
import { listLunbo, deleteLunbo, deleteAll } from "../../api/lunbo";
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
      selectedRows
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
      title: "图片",
      dataIndex: "photo",
      key: "photo",
      render(text: string) {
        return <img src={text} height="100" />;
      },
    },
    {
      title: "链接",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      key: "create_time",
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
    "checkbox"
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
    deleteLunbo({ id }).then((res) => {
      if (res.data.code === 200) {
        message.success("操作成功");
        getList();
      } else {
        message.success("操作失败");
      }
    });
  };

  const getList = () => {
    listLunbo().then((res) => {
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
  const handleDeleteAll = () => {
    if (selectAllIds.length == 0) {
      message.warning("请选择要操作的数据");
      return false;
    }
    deleteAll({ ids: selectAllIds.join(",") }).then((res) => {
      if (res.data.code === 200) {
        message.success("操作成功");
        getList();
      } else {
        message.success("操作失败");
      }
    });
  };

  return (
    <div>
      <h4>轮播图管理</h4>
      <Space style={{ width: "100%" }}>
        <Button type="primary" onClick={handleOpenModal}>
          新增
        </Button>
        <Button danger onClick={handleDeleteAll}>
          删除
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
