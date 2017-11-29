import React from 'react';
import UserDetailForm from "./userDetailForm.jsx";
import '../css/admin.scss';

export default function AdminUserDetail({ user, roles, role, school_id, onCreate, onUpdate }) {
  return role ? (
    <div className="ContentWrapper ContentWrapper--admin">
      <div className="Container Container--padded">
        <h2 className="Admin-title">{role.name} User Details</h2>
        <UserDetailForm
          user={user}
          roles={roles}
          role={role}
          school_id={school_id}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
      </div>
    </div>
  ) : null;
}
