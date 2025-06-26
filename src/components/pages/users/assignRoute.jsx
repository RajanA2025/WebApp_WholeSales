// import React, { useEffect, useState } from 'react';
// import { Card, Form, DatePicker, Select, Button, message } from 'antd';
// import dayjs from 'dayjs';

// const { Option } = Select;

// const AssignRoute= () => {
//   const [form] = Form.useForm();
//   const [salespersons, setSalespersons] = useState([]);
//   const [routes, setRoutes] = useState([]);

//   useEffect(() => {
//     // Dummy data - replace with API later
//     setSalespersons([
//       { _id: "user001", name: "Rajan" },
//       { _id: "user002", name: "vasala" },
//       {_id: "user003", name: "Joe" }


//     ]);

//     setRoutes([
//       { _id: "route001", name: "Koyambedu – Arumbakkam Route" },
//       { _id: "route002", name: "T Nagar – Mylapore Route" }
//     ]);
//   }, []);

//   const handleSubmit = (values) => {
//     const payload = {
//       salespersonId: values.salesperson,
//       routeId: values.route,
//       date: values.date.format("YYYY-MM-DD")
//     };

//     console.log("🚀 Assigned Payload:", payload);

//     // You can send this to backend:
//     // axios.post("/api/assign-route", payload)
//     message.success("Route assigned successfully!");
//     form.resetFields();
//   };

//   return (
//     <Card title="Assign Route to Salesperson">
//       <Form layout="vertical" form={form} onFinish={handleSubmit}>
//         <Form.Item label="Date" name="date" rules={[{ required: true }]}>
//           <DatePicker defaultValue={dayjs()} style={{ width: "100%" }} />
//         </Form.Item>

//         <Form.Item label="Salesperson" name="salesperson" rules={[{ required: true }]}>
//           <Select placeholder="Select Salesperson">
//             {salespersons.map(user => (
//               <Option key={user._id} value={user._id}>{user.name}</Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item label="Route" name="route" rules={[{ required: true }]}>
//           <Select placeholder="Select Route">
//             {routes.map(route => (
//               <Option key={route._id} value={route._id}>{route.name}</Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">Assign Route</Button>
//         </Form.Item>
//       </Form>
//     </Card>
//   );
// };

// export default AssignRoute;

import React, { useEffect, useState } from 'react';
import { Card, Form, DatePicker, Select, Button, message, InputNumber, Divider } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const AssignRoute = () => {
  const [form] = Form.useForm();
  const [salespersons, setSalespersons] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stockItems, setStockItems] = useState([]);

  useEffect(() => {
    // Dummy data - replace with API later
    setSalespersons([
      { _id: "user001", name: "Rajan" },
      { _id: "user002", name: "Vasala" },
      { _id: "user003", name: "Joe" }
    ]);

    setRoutes([
      { _id: "route001", name: "Koyambedu – Arumbakkam Route" },
      { _id: "route002", name: "T Nagar – Mylapore Route" }
    ]);

    setStockItems([
      { _id: "stock001", name: "Wheat", unit: "kg" },
      { _id: "stock002", name: "Maida", unit: "kg" },
      { _id: "stock003", name: "Sugar", unit: "kg" },
      { _id: "stock004", name: "Tea", unit: "pack" },
      { _id: "stock005", name: "Cooking Oil", unit: "Litre" }

    ]);
  }, []);

  const handleSubmit = (values) => {
    const assignedStocks = stockItems
      .map((item) => {
        const qty = values[`stock_${item._id}`];
        return qty ? { productId: item._id, productName: item.name, quantity: qty, unit: item.unit } : null;
      })
      .filter(Boolean);

    const payload = {
      salespersonId: values.salesperson,
      routeId: values.route,
      date: values.date.format("YYYY-MM-DD"),
      stocks: assignedStocks
    };

    console.log("🚀 Assigned Payload:", payload);
    // axios.post("/api/assign-route", payload)
    message.success("Route and stock assigned successfully!");
    form.resetFields();
  };

  return (
    <Card title="Assign Route and Stock to Salesperson">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item label="Date" name="date" rules={[{ required: true }]}>
          <DatePicker defaultValue={dayjs()} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Salesperson" name="salesperson" rules={[{ required: true }]}>
          <Select placeholder="Select Salesperson">
            {salespersons.map(user => (
              <Option key={user._id} value={user._id}>{user.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Route" name="route" rules={[{ required: true }]}>
          <Select placeholder="Select Route">
            {routes.map(route => (
              <Option key={route._id} value={route._id}>{route.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Divider orientation="left">Assign Stock</Divider>
        {stockItems.map((item) => (
          <Form.Item
            key={item._id}
            name={`stock_${item._id}`}
            label={`${item.name} (in ${item.unit})`}
          >
            <InputNumber min={0} placeholder={`Enter quantity for ${item.name}`} style={{ width: "100%" }} />
          </Form.Item>
        ))}

        <Form.Item>
            <center>          <Button type="primary" htmlType="submit">Assign Route & Stock</Button>
            </center>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AssignRoute;
