import React from 'react';
import DashboardStudent from './DashboardStudent';
import AadrikaDashboard from './AadrikaDashboard';
import Demo from './demo';

export default function DashboardPage() {
  const role = JSON.parse(sessionStorage.getItem('loginInfo'));
  if (role?.roleId == 1) {
    return <AadrikaDashboard />;
  }
  if (role?.roleId == 3) {
    return <DashboardStudent />;
  } else if (role?.role === 'admin') {
    return <div><Demo/></div>;
  } else if (role?.role === 'superadmin') {
    return <div><Demo/></div>;
  }
  return <Demo />;
}
