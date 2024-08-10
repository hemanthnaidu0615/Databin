import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import authFetch from "../axios";
import logo from "../images/logo.png";

export const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!username) {
      toast.error("Please enter your username", { position: "top-center" });
      return;
    }

    authFetch
      .post("http://localhost:3000/v2/tables/forgot-password", { username })
      .then((response) => {
        toast.success("Password reset Email sent!", { position: "top-center" });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error sending email", { position: "top-center" });
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">
      <ToastContainer />
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full">
        <div className="flex items-center mb-6">
          <img alt="Logo" src={logo} className="h-12 mr-3" />
          <span className="font-bold text-4xl text-purple-700">Data Bin</span>
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-purple-800">Reset Password</h2>
        <div className="w-full mb-4">
          <InputText
            name="username"
            placeholder="Username"
            className="w-full p-3 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <Button
          label="Submit"
          className="w-full p-3 mb-4 bg-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-purple-700 transition duration-300"
          onClick={handleSubmit}
        />
        <Button
          label="Go Back"
          className="w-full p-3 bg-gray-400 text-white font-semibold rounded-md shadow-md hover:bg-gray-500 transition duration-300"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};
