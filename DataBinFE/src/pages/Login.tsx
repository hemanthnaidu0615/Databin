import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../images/logo.png";
import img from "../images/loginimg.png";
import { useNavigate } from "react-router-dom";
import authFetch from "../axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick() {
    const data = {
      username: username,
      password: password,
    };

    authFetch
      .post("/tables/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        dispatch(setUser(response.data));
        navigate("/home-dashboard");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Username or password is incorrect", {
          position: "top-center",
        });
      });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 h-100 w-100">
      <ToastContainer />
      <div className="flex justify-center items-center flex-1">
        <img
          src={img}
          alt="Login Visual"
          className="opacity-80 w-2/4 h-56 pl-20"
        />
      </div>
      <div className="flex-1 flex flex-col items-start gap-5 top-36">
        <div className="flex items-center py-2">
          <img alt="Logo" src={logo} className="h-10 mr-2" />
          <span className="font-bold text-4xl">
            Data <span className="text-violet-800">Bin</span>
          </span>
        </div>

        <div className="Inter text-black text-md font-medium rounded w-[118px] h-[16px] flex pb-2.5">
          Welcome back!
        </div>

        <div className="relative w-[280px]">
          <InputText
            name="username"
            placeholder="Username"
            className="Inter w-full h-[34px] border border-gray-400 rounded-md bg-white px-2 text-xs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="relative w-[280px]">
          <InputText
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            className="Inter w-full h-[34px] border border-gray-400 rounded-md bg-white placeholder-size-10 px-2 text-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-500" />
            ) : (
              <FaEye className="text-gray-500" />
            )}
          </button>
        </div>

        <div className="flex w-[280px] justify-between items-center">
          <label
            htmlFor="rememberMe"
            className="flex items-center cursor-pointer"
          >
            <Checkbox
              inputId="rememberMe"
              checked={checked}
              onChange={(e) => setChecked(e.checked ?? false)}
              className="border-0 rounded-sm mr-2 bg-custom-color"
            />
            <span className="Inter text-xs">Remember me</span>
          </label>
          <a
            className="text-light-purple py-1 hover:text-purple-900 text-xs"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </a>
        </div>

        <Button
          label="Login"
          className="Inter font-semibold w-[280px] h-[34px] bg-custom-purple text-white rounded-md hover:border-custom-purple focus:border-custom-purple focus:ring-custom-purple hover:ring-custom-purple ring-custom-purple ring-2"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
