import React from 'react';

export default function RoleBasedGuard({ hasContent, roles, children }) {
  // Logic here to get current user role
  // const { user } = useAuth();
  const currentRole =  JSON.parse(sessionStorage.getItem("loginInfo"))?.userType;
  // const currentRole = user?.role; // admin;
  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <div>
        <div className='flex items-center justify-center w-full h-screen'>
          <div className='block'>
          <h1 variant="h3" className="text-red-500 text-[4vh]">
            Permission Denied
          </h1>
          <h1 className="text-red-500">
            You do not have permission to access this page
          </h1>
          <h1 className="text-red-500">Please contact your administrator</h1>
        </div>
        </div>
        
      </div>
    ) : null;
  }

  return <>{children}</>;
}
