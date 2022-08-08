import { Button, Table, Popconfirm, message } from "antd";
import { useState, useEffect } from "react";
import Add from "./add";
import { list, del } from "../../api/productCategory";
import type { listType } from "../../api/productCategory";
export default function Category() {
  const [visiable, setVisiable] = useState(false);
  const [dataId, setDataId] = useState(0);
  const [dataList, setDataList] = useState<listType[]>([]);
  const Open = () => {
    handleOpen();
    setDataId(0);
  };
  const handleOpen = () => {
    setVisiable(true);
  };
  const handleClose = () => {
    setVisiable(false);
  };
  const getList = () => {
    list().then((res) => {
      setDataList(res.data.data);
    });
  };

  const handleUpdata = (id: number) => {
    setDataId(id);
    handleOpen();
  };
  const handleDelete = (id: number) => {
    del({ id }).then((res) => {
      if (res.data.code == 200) {
        message.success("操作成功");
        getList();
      } else {
        message.error("操作失败");
      }
    });
  };
  useEffect(() => {
    getList();
  }, []);
  const columns = [
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
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
  return (
    <div>
      <Button onClick={Open}>添加</Button>
      <Table dataSource={dataList} columns={columns} />
      <Add
        isModalVisible={visiable}
        handleCloseModal={handleClose}
        getList={getList}
        id={dataId}
      />
    </div>
  );
}
