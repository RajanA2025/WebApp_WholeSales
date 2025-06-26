import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Typography,Space } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Option } = Select;

const RouteMaster = () => {
  const [routes, setRoutes] = useState([]);
  const [shops, setShops] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [form] = Form.useForm();

  // Load dummy data or replace with API
  useEffect(() => {
    const dummyRoutes = [
      {
        _id: "route001",
        name: "Chennai – Koyambedu Route",
        shops: [
          { _id: "shop001", shopName: "Sakthi Super Market" },
          { _id: "shop002", shopName: "Annai Traders" }
        ]
      },
      {
        _id: "route002",
        name: "Tambaram – Chromepet Route",
        shops: [
          { _id: "shop003", shopName: "Kannan Store" },
          { _id: "shop004", shopName: "Murugan Mart" },
          { _id: "shop005", shopName: "Fresh and Fine Store" }
        ]
      }
    ];

    const dummyShops = [
      { _id: "shop001", shopName: "Sakthi Super Market" },
      { _id: "shop002", shopName: "Annai Traders" },
      { _id: "shop003", shopName: "Kannan Store" },
      { _id: "shop004", shopName: "Murugan Mart" },
      { _id: "shop005", shopName: "Fresh and Fine Store" }
    ];

    setRoutes(dummyRoutes);
    setShops(dummyShops);
  }, []);

  const fetchRoutes = async () => {
    // Uncomment when backend is ready
    // const res = await axios.get('/api/routes');
    // setRoutes(res.data);
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        shops: values.shops.map(shopId => {
          const shop = shops.find(s => s._id === shopId);
          return { _id: shopId, shopName: shop?.shopName };
        })
      };

      if (editingRoute) {
        await axios.put(`/api/routes/${editingRoute._id}`, payload);
        message.success('Route updated successfully');
      } else {
        await axios.post('/api/routes', payload);
        message.success('Route added successfully');
      }

      setVisible(false);
      setEditingRoute(null);
      form.resetFields();
      fetchRoutes(); // Replace with local update if using dummy
    } catch (err) {
      message.error('Something went wrong');
    }
  };

  const handleEdit = (route) => {
    setEditingRoute(route);
    form.setFieldsValue({
      name: route.name,
      shops: route.shops.map(shop => shop._id),
    });
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/routes/${id}`);
      message.success('Route deleted');
      fetchRoutes();
    } catch (err) {
      message.error('Delete failed');
    }
  };

  const columns = [
    {
      title: 'Route Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Shops',
      key: 'shops',
      render: (_, record) => record.shops.map(shop => shop.shopName).join(', '),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          
          <Space size="middle">
      
        <EditOutlined style={{ color: '#faad14', cursor: 'pointer' }} onClick={() => handleEdit(record)} />
        <DeleteOutlined onClick={() => handleDelete(record._id)}  style={{ color: '#ff4d4f', cursor: 'pointer' }} />
      </Space>
        </>
      )
    }
  ];

  return (
    <div className="p-4">
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Title level={4}>Routes</Title>
        <Button type="primary" onClick={() => {
          setVisible(true);
          setEditingRoute(null);
          form.resetFields();
        }}>
          Add Route
        </Button>
      </div>

      <Table
        dataSource={routes}
        columns={columns}
        rowKey="_id"
        bordered
      />

      <Modal
        title={editingRoute ? 'Edit Route' : 'Add Route'}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Route Name"
            rules={[{ required: true, message: 'Please enter a route name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="shops"
            label="Select Shops"
            rules={[{ required: true, message: 'Please select at least one shop' }]}
          >
            <Select mode="multiple" placeholder="Select shops">
              {shops.map(shop => (
                <Option key={shop._id} value={shop._id}>
                  {shop.shopName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingRoute ? 'Update' : 'Add'} Route
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RouteMaster;
