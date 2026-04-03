import React from 'react';
//import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../Components/Shared/LoadingSpinner';
import CustomerStatistics from '../../../Components/Dashboard/Statistics/CustomerStatistics';
import SellerStatistics from '../../../Components/Dashboard/Statistics/SellerStatistics';
import AdminStatistics from '../../../Components/Dashboard/Statistics/AdminStatistics';
import useRole from '../../../hooks/useRole';
// import AdminStatistics from '../../../Components/Dashboard/Statistics/AdminStatistics';

// const Statistics = () => {
//     return (
//          <div>
//       <AdminStatistics />
//     </div>
//     );
// };

// export default Statistics;


// import AdminStatistics from '../../../Components/Dashboard/Statistics/AdminStatistics'
// import CustomerStatistics from '../../../Components/Dashboard/Statistics/CustomerStatistics'
// import SellerStatistics from '../../../Components/Dashboard/Statistics/SellerStatistics'
// import LoadingSpinner from '../../../Components/Shared/LoadingSpinner'
// import useRole from '../../../hooks/useRole'
const Statistics = () => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <LoadingSpinner />
  return (
    <div>
      {role === 'customer' && <CustomerStatistics />}
      {role === 'chef' && <SellerStatistics />}
      {role === 'admin' && <AdminStatistics />}
    </div>
  )
}

export default Statistics