"use server";

import { signIn } from "@/auth";

const handleCredentialsLogin = async (formData) => {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response || { success: true };
  } catch (error) {
    return { error: "Check your credentials" };
  }
};

export { handleCredentialsLogin };
