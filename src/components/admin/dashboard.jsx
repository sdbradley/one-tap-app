import React from 'react';
import Link from 'components/link';
import Card from 'components/shared/card/Card';
import './css/admin.scss';

export default function AdminDashboard () {
  return (
    <div className="ContentWrapper ContentWrapper--admin">
      <div className="Container Container--padded">
        <h2 className="Admin-title">Admin Dashboard</h2>
        <Link to="/admin/admins">
          <Card
            title="Users"
            buttonText="Continue"
            isAdmin="true"
            classOverride="SGButton--admin"
          />
        </Link>
      </div>
    </div>
  );
}
