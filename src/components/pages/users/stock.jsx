import React, { useState , useEffect} from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message, Typography,Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Option } = Select;

const StockMaster = () => {
  const [stocks, setStocks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingStock, setEditingStock] = useState(null);

  useEffect(() => {
    const dummyStocks = [
      {
        _id: "stock001",
        productName: "Wheat",
        quantity: 100,
        unit: "kg"
      },
      {
        _id: "stock002",
        productName: "Maida",
        quantity: 80,
        unit: "kg"
      },
      {
        _id: "stock003",
        productName: "Sugar",
        quantity: 60,
        unit: "kg"
      },
      {
        _id: "stock004",
        productName: "Cooking Oil",
        quantity: 50,
        unit: "litre"
      },
      {
        _id: "stock005",
        productName: "Tea Packets",
        quantity: 120,
        unit: "pack"
      }
    ];
  
    setStocks(dummyStocks);
  }, []);
  
  const handleOpen = () => {
    form.resetFields();
    setEditingStock(null);
    setVisible(true);
  };

  const handleSubmit = (values) => {
    if (editingStock) {
      const updated = stocks.map(stock =>
        stock._id === editingStock._id ? { ...editingStock, ...values } : stock
      );
      setStocks(updated);
      message.success('Stock updated');
    } else {
      const newStock = {
        ...values,
        _id: `stock_${Date.now()}`
      };
      setStocks([...stocks, newStock]);
      message.success('Stock added');
    }

    setVisible(false);
    form.resetFields();
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingStock(record);
    setVisible(true);
  };

  const handleDelete = (id) => {
    setStocks(stocks.filter(stock => stock._id !== id));
    message.success('Stock deleted');
  };

  const columns = [
    { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Unit', dataIndex: 'unit', key: 'unit' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          
          <Space size="middle">
        <EditOutlined style={{ color: '#faad14', cursor: 'pointer' }} onClick={() => handleEdit(record)}/>
        <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer' }} onClick={() => handleDelete(record._id)}/>
      </Space>
        </>
      )
    }
  ];

  return (
    <div className="p-4">
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Title level={4}>Stocks</Title>
        <Button type="primary" onClick={handleOpen}>Add Stock</Button>
      </div>

      <Table dataSource={stocks} columns={columns} rowKey="_id" bordered />

      <Modal
        title={editingStock ? 'Edit Stock' : 'Add Stock'}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="productName" label="Product Name" rules={[{ required: true }]}>
            <Input placeholder="e.g., Wheat, Maida, Sugar" />
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>
          <Form.Item name="unit" label="Unit" rules={[{ required: true }]}>
            <Select placeholder="Select unit">
              <Option value="kg">Kilogram (kg)</Option>
              <Option value="litre">Litre</Option>
              <Option value="pack">Pack</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingStock ? 'Update' : 'Add'} Stock
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StockMaster;
