// import React from 'react';
// import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

// // import useAuth from './useAuth'
// // import useAxiosSecure from './useAxiosSecure'
// // import { useQuery } from '@tanstack/react-query'

// const useRole = () => {
//   const { user, loading } = useAuth()
//   const axiosSecure = useAxiosSecure()

//   const { data: role, isLoading: isRoleLoading } = useQuery({
//     enabled: !loading && !!user?.email,
//     queryKey: ['role', user?.email],
//     queryFn: async () => {
//       const result = await axiosSecure(`/user/role`)
//       console.log(result)
//       return result.data.role
//     },
//   })

//   //   return { role, isRoleLoading }
//   return [role, isRoleLoading]
// }

// export default useRole


import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const {
    data: role,
    isLoading: isRoleLoading,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/user/role?email=${user.email}`
      )
      return res.data.role
    },
    retry: false, // stop spam retries
  })

  return [role, isRoleLoading]
}

export default useRole
