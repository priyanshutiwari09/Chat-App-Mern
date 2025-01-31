import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function SignUp() {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [preferredLanguage, setPreferredLanguage] = useState("en");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(e.target.files[0]);

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = new FormData();
    // Append text fields
    userInfo.append("name", data.name);
    userInfo.append("email", data.email);
    userInfo.append("password", data.password);
    userInfo.append("confirmPassword", data.confirmPassword);
    userInfo.append("preferredLanguage", preferredLanguage);

    // Append the profile image (if any)
    if (profileImage) {
      userInfo.append("profileImage", profileImage);
    }

    // console.log(userInfo);
    await axios
      .post("/api/user/signup", userInfo, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        // console.log(response);
        if (response.data) {
          alert("SignUp successfully! You can now log in.");
        }

        localStorage.setItem("messenger", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Password and Confirm Password do not match";
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)"
      }}
      className="w-full h- full flex items-center justify-center h-screen"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-custom-black rounded-xl p-10">
          <h2 className="text-center text-2xl text-zinc-100 font-bold mb-5">
            CREATE AN ACCOUNT
          </h2>

          {/* profile photo */}
          <div className="w-[100%] mb-3 flex justify-center">
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-full"
              />
            )}
          </div>

          <div className="space-y-6">
            {/* Your Name */}
            <label className="input input-bordered flex items-center gap-2 pe-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Your Name"
                {...register("name", { required: true })}
              />
            </label>
            {errors.name && (
              <span className="text-red-500 text-sm font-semibold">
                *Name is required*
              </span>
            )}

            {/* Your Email */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Your Email"
                {...register("email", { required: true })}
              />
            </label>
            {errors.email && (
              <span className="text-red-500 text-sm font-semibold">
                *Email is required*
              </span>
            )}

            {/* Password */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </label>
            {errors.password && (
              <span className="text-red-500 text-sm font-semibold">
                *Password is required*
              </span>
            )}

            {/* Confirm Password */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                placeholder="Repeat your password"
                className="grow"
                {...register("confirmPassword", {
                  required: true,
                  validate: validatePasswordMatch
                })}
              />
            </label>
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm font-semibold">
                {errors.confirmPassword.message}
              </span>
            )}

            {/* Profile Image Upload */}
            <label
              htmlFor="profile-photo"
              className="cursor-pointer bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-3"
            >
              Upload Profile Photo
            </label>
            <input
              id="profile-photo"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <label className="block mt-2 text-zinc-300">
              Preferred Language:
            </label>
            <select
              className="border p-2 rounded w-full mt-2"
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
            </select>

            {/* terms and condition
            <div className="form-control ">
              <label className="cursor-pointer label gap-3 mb-4">
                <input type="checkbox" className="checkbox size-5.5" />
                <span className="label-text text-lg font-medium text-zinc-300">
                  I agree all statements in{" "}
                  <span className="font-normal underline text-zinc-400">
                    Terms of service
                  </span>
                </span>
              </label>
            </div> */}

            {/* signup button */}
            <button className="btn w-full text-zinc-300 text-lg bg-custom-blue hover:bg-custom-blue active:bg-blue-800">
              Sign Up
            </button>

            {/* Have already an account? Login here */}
            <div className="flex justify-center ">
              <p className="mt-4 mb-1">
                Have already an account?{" "}
                <span className="text-zinc-300 font-semibold underline">
                  <Link to="/login">Login here</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
