import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import RouteMaster from './components/pages/users/Routes';
import StockMaster from './components/pages/users/stock';
import AssignRoute from './components/pages/users/assignRoute';

const Login = lazy(() => import('./components/Login'));
const RegisterPage = lazy(() => import('./components/Register'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));
const Users = lazy(() => import('./components/pages/users/users'));
const DashboardLayout = lazy(() => import('./components/Dashboard/DashboardLayout'));

const Routing = ({ loggedIn }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={!loggedIn ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route path="/login" element={!loggedIn ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route path="/register" element={!loggedIn ? <RegisterPage /> : <Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={loggedIn ? <DashboardLayout /> : <Navigate to="/login" replace />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="Routes" element={<RouteMaster />} />
        <Route path="Stocks" element={<StockMaster />} />
        <Route path="AssignRoute" element={<AssignRoute />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(Routing);