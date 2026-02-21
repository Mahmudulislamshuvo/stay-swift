"use client";

import { handleCredentialsLogin } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const response = await handleCredentialsLogin(formData);

      if (!!response.error) {
        setError(response.error);
      } else {
        router.push("/booking");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <button type="submit" className="btn-primary w-full mt-4">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
