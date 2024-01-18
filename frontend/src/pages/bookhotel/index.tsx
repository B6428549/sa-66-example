import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetUsers, DeleteUserByID, GetBookhotels } from "../../services/https";
import { BookHotelsInterface } from "../../interfaces/IBookhotel";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";


function ShowRecord() {
    const [books, setBookhotels] = useState<BookHotelsInterface[]>([]);
    const getBookHotels = async () => {
        let res = await GetBookhotels();
        if (res) {
          setBookhotels(res);
        }
      };
    
      useEffect(() => {
        getBookHotels();
      }, []);
  const columns: ColumnsType<BookHotelsInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "ชื่อ",
      dataIndex: "Name",
      key: "name",
    },
    {
      title: "อีเมล",
      dataIndex: "Email",
      key: "email",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "Phone",
      key: "phone",
    },
    {
      title: "วันที่นัดเข้า",
      dataIndex: "DateIn",
      key: "datein",
      render: (date) => {
        const formattedDate = dayjs(date).format("DD/MM/YYYY");
        return formattedDate;
      },
    },
    {
      title: "วันที่นัดออก",
      dataIndex: "DateOut",
      key: "dateOut",
      render: (date) => {
        const formattedDate = dayjs(date).format("DD/MM/YYYY");
        return formattedDate;
      },
    },
    {
      title: "RoomID",
      dataIndex: "RoomID",
      key: "id",
      // render: (item) => Object.values(item.FirstName + " " + item.LastName),
    },
    {
      title: "ชื่อ Hotel",
      dataIndex: "Hotel",
      key: "Name",
      render: (item) => {
        // ตรวจสอบว่า item.Name มีค่าหรือไม่
        if (item && item.Name) {
          // แสดงชื่อของโรงแรม
          return item.Name;
        } else {
          // กรณีไม่พบข้อมูลหรือข้อมูลไม่ถูกต้อง
          return "ไม่พบข้อมูล";
        }
      },
    },

    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button  onClick={() =>  navigate(`/customer/edit/${record.ID}`)} shape="circle" icon={<EditOutlined />} size={"large"} />
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];

  const navigate = useNavigate();

  const [users, setUsers] = useState<BookHotelsInterface[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  // Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getUsers = async () => {
    let res = await GetUsers();
    if (res) {
      setUsers(res);
    }
  };

  const showModal = (val: BookHotelsInterface) => {
    setModalText(
      `คุณต้องการลบข้อมูลผู้ใช้ "" หรือไม่ ?`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteUserByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getUsers();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>จัดการข้อมูลสมาชิก</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/customer/create">
              <Button type="primary" icon={<PlusOutlined />}>
                สร้างข้อมูล
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={books} />
      </div>
      <Modal
        title="ลบข้อมูล ?"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}

export default ShowRecord;
