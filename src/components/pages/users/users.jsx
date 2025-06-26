import React, { useState } from 'react';
import { Table, Button, Space, Typography,Modal ,Form, Input, Select} from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';


const data = [
  {
    key: '1',
    name: 'Rajan',
    role: 'Salesperson',
    emailId:'jhone@gmail.com',
    phoneNumber:'1234567890'
  },
  {
    key: '2',
    name: 'Vasala',
    role: 'Salesperson',
    emailId:'jim@gmail.com',
    phoneNumber:'8767654678'
  },
  {
    key: '3',
    name: 'Joe',
    role: 'Teacher',
    emailId:'black@gmail.com',
    phoneNumber:'987654335'
  },
];

const columns = [
  {
    title: 'User Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'EmailId',
    dataIndex: 'emailId',
    key: 'role',
  },
  {
    title: 'PhoneNumber',
    dataIndex: 'phoneNumber',
    key: 'role',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <EyeOutlined style={{ color: '#1890ff', cursor: 'pointer' }} />
        <EditOutlined style={{ color: '#faad14', cursor: 'pointer' }} />
        <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer' }} />
      </Space>
    ),
  },
];
   

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
const { Title } = Typography;


const { Option } = Select;
const showModal = () => {
  setIsModalOpen(true);
};
const handleOk = () => {
  setIsModalOpen(false);
};
const handleCancel = () => {
  setIsModalOpen(false);
};
  return (
    <>
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4}>Users</Title>
        <Button type="primary" onClick={showModal}>Add User</Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>


<Modal
  title="User Details"
  closable={{ 'aria-label': 'Custom Close Button' }}
  open={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancel}
>
  <Form layout="vertical">
    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter a username' }]}>
      <Input placeholder="Enter username" />
    </Form.Item>

    <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: 'Please enter phone number' }]}>
      <Input placeholder="Enter phone number" />
    </Form.Item>

    <Form.Item label="Email ID" name="email" rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Enter a valid email' }]}>
      <Input placeholder="Enter email" />
    </Form.Item>

    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter password' }]}>
      <Input.Password placeholder="Enter password" />
    </Form.Item>

    <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select role' }]}>
      <Select placeholder="Select a role">
        <Option value="admin">Admin</Option>
        <Option value="user">User</Option>
        <Option value="manager">Manager</Option>
      </Select>
    </Form.Item>
  </Form>
</Modal>
    </>
  );
};

export default Users;
