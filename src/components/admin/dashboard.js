import React from 'react';
import Link from 'components/link';
import './css/admin.scss';

export default function AdminDashboard () {
  return (
    <div className="ContentWrapper ContentWrapper--admin">
      <div className="Container Container--padded">
        <h1 className="Admin-title">Admin Dashboard</h1>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/notifications">Notifications</Link>
      </div>
    </div>
  );
}
