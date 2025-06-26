import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, List, Tag ,Tooltip} from 'antd';
import { ShoppingCartOutlined, UserOutlined, EnvironmentOutlined, AlertOutlined } from '@ant-design/icons';

const sampleData = {
  date: '2025-06-11',
  totalStockAssigned: {
    products: [
      { name: 'Wheat', quantity: 150 },
      { name: 'Maida', quantity: 100 },
      { name: 'Sugar', quantity: 60 }
    ],
    totalItemsAssigned: 310
  },
  salesSummary: {
    totalSalesKg: 200,
    totalRevenue: 18500,
    returnedStockKg: 25,
    returnedItems: [
      { name: 'Sugar', quantity: 5 },
      { name: 'Wheat', quantity: 2 }
    ]
  },
  salespersonsStatus: {
    totalSalespersons: 5,
    activeToday: 4,
    pendingStart: 1,
    names: ['Rajan', 'Vasala', 'Joe', 'Deepak']
  },
  shopsVisited: {
    totalShopsAssigned: 20,
    shopsVisitedToday: 14,
    visitedShops: ['Sakthi Market', 'Annai Traders', 'FreshMart']
  },
  alerts: {
    lowStockProducts: [
      { name: 'Sugar', remaining: 8 },
      { name: 'Rava', remaining: 5 }
    ]
  },
  locationTracking: {
    onRouteSalespersons: 3,
    lastLocationUpdate: '2025-06-11T10:45:00Z',
    activePersons: ['Joe', 'Vasala', 'Rajan']
  }
};


const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setData(sampleData), 1000);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
  <Col span={6}>
    <Tooltip
      title={
        <div>
          {data.totalStockAssigned.products.map(p => (
            <div key={p.name}>{p.name}: {p.quantity} kg</div>
          ))}
        </div>
      }
    >
      <Card>
        <Statistic title="Total Stock Assigned" value={data.totalStockAssigned.totalItemsAssigned} suffix="kg" prefix={<ShoppingCartOutlined />} />
      </Card>
    </Tooltip>
  </Col>

  <Col span={6}>
    <Tooltip
      title={
        <div>
          Active: {data.salespersonsStatus.names.join(', ')}
        </div>
      }
    >
      <Card>
        <Statistic title="Active Salespersons" value={data.salespersonsStatus.activeToday} suffix={`/ ${data.salespersonsStatus.totalSalespersons}`} prefix={<UserOutlined />} />
      </Card>
    </Tooltip>
  </Col>

  <Col span={6}>
    <Tooltip title={`Total Revenue: ₹${data.salesSummary.totalRevenue}`}>
      <Card>
        <Statistic title="Total Sales (kg)" value={data.salesSummary.totalSalesKg} prefix={<ShoppingCartOutlined />} />
      </Card>
    </Tooltip>
  </Col>

  <Col span={6}>
    <Tooltip
      title={
        <div>
          {data.salesSummary.returnedItems.map(item => (
            <div key={item.name}>{item.name}: {item.quantity} kg</div>
          ))}
        </div>
      }
    >
      <Card>
        <Statistic title="Returned Stock" value={data.salesSummary.returnedStockKg} suffix="kg" />
      </Card>
    </Tooltip>
  </Col>

  <Col span={6}>
    <Tooltip
      title={
        <div>
          {data.shopsVisited.visitedShops.map(shop => (
            <div key={shop}>✔ {shop}</div>
          ))}
        </div>
      }
    >
      <Card>
        <Statistic title="Shops Visited" value={data.shopsVisited.shopsVisitedToday} suffix={`/ ${data.shopsVisited.totalShopsAssigned}`} />
      </Card>
    </Tooltip>
  </Col>

  <Col span={6}>
    <Tooltip
      title={
        <div>
          {data.locationTracking.activePersons.map(person => (
            <div key={person}>📍 {person}</div>
          ))}
          <div>Last update: {new Date(data.locationTracking.lastLocationUpdate).toLocaleTimeString()}</div>
        </div>
      }
    >
      <Card>
        <Statistic title="Salespersons on Route" value={data.locationTracking.onRouteSalespersons} prefix={<EnvironmentOutlined />} />
      </Card>
    </Tooltip>
  </Col>

  <Col span={12}>
    <Card title={<><AlertOutlined /> Low Stock Alerts</>}>
      <List
        dataSource={data.alerts.lowStockProducts}
        renderItem={item => (
          <List.Item>
            <Tag color="red">{item.name}</Tag> – Remaining: {item.remaining} kg
          </List.Item>
        )}
      />
    </Card>
  </Col>
</Row>

    </div>
  );
};

export default Dashboard;