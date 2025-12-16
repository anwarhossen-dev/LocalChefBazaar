//import axios from 'axios'

import axios from "axios"

export const imageUpload = async imageData => {
  const formData = new FormData()
  formData.append('image', imageData)

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
    formData
  )
  return data?.data?.display_url
}


//save or update user in db
export const saveOrUpdateUser = async userData =>{
  const {data } = await axios.post(`${import.meta.env.VITE_API_URL}/users`, 
    userData
  
  )

  return data
}

// export const saveOrUpdateUser = async (user) => {
//   const { data } = await axios.put(
//     `${import.meta.env.VITE_API_URL}/users`,
//     user
//   );
//   return data;
// };