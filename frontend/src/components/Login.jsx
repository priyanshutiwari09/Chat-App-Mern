import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Login() {
  const { authUser, setAuthUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password
    };

    await axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        //console.log(response.headers);
        if (response.data) {
          console.log(response.data);
          alert("Login successfully!");
        }

        localStorage.setItem("messenger", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error) {
          alert(error.response.data.message);
        }
        console.log(error);
      });
  };

  return (
    <div className="flex h-screen">
      <div
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)"
        }}
        className="w-full h- full flex items-center justify-center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-custom-black rounded-xl p-10">
            <h2 className="text-center text-2xl text-zinc-100 font-bold mb-11">
              ACCOUNT LOGIN
            </h2>
            <div className="space-y-6">
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

              {/* login button */}
              <button className="btn w-full text-zinc-300 text-lg bg-custom-blue hover:bg-custom-blue active:bg-blue-800">
                login
              </button>

              {/* Have haven't an account? Signup here */}
              <div className="flex justify-center ">
                <p className="mt-4 mb-1">
                  Don't have an account?
                  <span className="text-zinc-300 font-semibold underline">
                  <Link to="/signup">Sign Up</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;