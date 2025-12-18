import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { TbFidgetSpinner } from 'react-icons/tb';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { imageUpload, saveOrUpdateUser } from '../../../utils';

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);

      // 1. User Registration
      const result = await createUser(email, password);

      // 2. Save user data in DB
      await saveOrUpdateUser({ name, email, image: imageURL });

      // 3. Update profile
      await updateUserProfile(name, imageURL);

      navigate(from, { replace: true });
      toast.success('Register Successful');

      console.log(result);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      navigate(from, { replace: true });
      toast.success('Signup Successful');
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Register</h1>
          <p className="text-sm text-gray-400">Welcome to Local Chef Bazzaar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                {...register('name', {
                  required: 'Name is required',
                  maxLength: { value: 20, message: 'Name cannot be too long' },
                })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Profile Image */}
            <div>
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-lime-50 file:text-lime-700
                  hover:file:bg-lime-100
                  bg-gray-100 border border-dashed border-lime-300 rounded-md cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400
                  py-2"
                {...register('image')}
              />
              <p className="mt-1 text-xs text-gray-400">PNG, JPG or JPEG (max 2MB)</p>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block mb-2 text-sm">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter Your Address Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                {...register('address', {
                  required: 'Address is required',
                })}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-primary"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                    message: 'Must include uppercase, lowercase & special character',
                  },
                })}
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-primary"
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (value) => value === getValues('password') || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white"
            >
              {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : 'Continue'}
            </button>
          </div>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">Signup with social accounts</p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="hover:underline hover:text-lime-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;



// import React, { useState } from "react";
// //import login from "../../assets/About/Service5.jpg";
// import { Link, useLocation, useNavigate } from "react-router";
// import { useForm } from "react-hook-form";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import axios from "axios";

// const Register = () => {
//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm();

//     const [preview, setPreview] = useState(null);
//     const { registerUser, updateUserProfile } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const password = watch("password");

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setPreview(URL.createObjectURL(file));
//         }
//     };

    
//     const handleSignUp = async (data) => {
//         try {
//             const profileImage = data.image[0];

//             // 1️⃣ Register User
//             await registerUser(data.email, data.password);

//             // 2️⃣ Upload image to ImgBB
//             const formData = new FormData();
//             formData.append("image", profileImage);

//             const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

//             const imgRes = await axios.post(image_API_URL, formData);
//             const photoURL = imgRes.data.data.url;

//             // 3️⃣ Save user to your database
//             const userInfo = {
//                 email: data.email,
//                 displayName: data.name,
//                 photoURL,
//                 address: data.address,
//             };

//             const savedUser = await axiosSecure.post("/users", userInfo);

//             if (savedUser.data.insertedId) {
//                 alert("User registered successfully");
//             }

//             // 4️⃣ Update Firebase Profile
//             const userProfile = {
//                 displayName: data.name,
//                 photoURL,
//             };

//             await updateUserProfile(userProfile);

//             // 5️⃣ Redirect user
//             navigate(location?.state || "/");
//         } catch (error) {
//             console.error("Error during registration:", error);
//         }
//     };

//     return (
//         <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-secondary dark:bg-gray-900">
//             {/* LEFT SIDE IMAGE */}
//             <div className="hidden md:block">
//                 <img src={login} alt="register background" className="w-full h-full object-cover" />
//             </div>

//             {/* RIGHT FORM */}
//             <div className="flex items-center justify-center p-8">
//                 <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
//                     <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Register</h2>

//                     <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
//                         {/* Name */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name</label>
//                             <input type="text" {...register("name", { required: true, minLength: 3 })} placeholder="Enter your name" className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary" />
//                             {errors.name && <p className="text-red-400">Name is required</p>}
//                         </div>

//                         {/* Address */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Address</label>
//                             <input type="text" {...register("address", { required: true })} placeholder="Enter your address" className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary" />
//                             {errors.address && <p className="text-red-400">Address is required</p>}
//                         </div>

//                         {/* Image Upload */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Upload Your Image</label>
//                             <input type="file" accept="image/*" {...register("image", { required: true })} onChange={handleImageChange} className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary" />
//                             {errors.image && <p className="text-red-400">Image is required</p>}

//                             {preview && <img src={preview} alt="preview" className="w-24 h-24 rounded-full mt-3 object-cover border" />}
//                         </div>

//                         {/* Email */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
//                             <input type="email" {...register("email", { required: true })} placeholder="Enter your email" className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary" />
//                             {errors.email && <p className="text-red-400">Email is required</p>}
//                         </div>

                        // {/* Password */}
                        // <div>
                        //     <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Password</label>
                        //     <input
                        //         type="password"
                        //         {...register("password", {
                        //             required: true,
                        //             minLength: 8,
                        //             pattern: {
                        //                 value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                        //                 message: "Must include uppercase, lowercase & special character",
                        //             },
                        //         })}
                        //         placeholder="Enter your password"
                        //         className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                        //     />
                        //     {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                        // </div>

                        // {/* Confirm Password */}
                        // <div>
                        //     <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Confirm Password</label>
                        //     <input
                        //         type="password"
                        //         {...register("confirmPassword", {
                        //             required: "Confirm password is required",
                        //             validate: (value) => value === password || "Passwords do not match",
                        //         })}
                        //         placeholder="Confirm your password"
                        //         className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                        //     />
                        //     {errors.confirmPassword && <p className="text-red-400">{errors.confirmPassword.message}</p>}
                        // </div>

//                         {/* Register Btn */}
//                         <button type="submit" className="w-full bg-primary py-2 rounded-md font-semibold text-white hover:bg-primary-hover transition">
//                             Register
//                         </button>
//                     </form>

//                     {/* Divider */}
//                     <div className="flex items-center my-6">
//                         <hr className="grow border-gray-300 dark:border-gray-600" />
//                         <span className="px-2 text-gray-500 dark:text-gray-300 text-sm">Or</span>
//                         <hr className="grow border-gray-300 dark:border-gray-600" />
//                     </div>

//                     {/* Login Link */}
//                     <Link to="/login" className="w-full block py-3 text-center border border-primary text-primary dark:text-white dark:bg-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition">
//                         Login Instead
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;