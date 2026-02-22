"use server";

import { auth, signIn } from "@/auth";
import { dbConnect } from "@/lib/mongoDb";
import { userModel } from "@/models/userModel";

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

const handleProfileImageUpload = async (formData) => {
  await dbConnect();
  const authResult = await auth();
  const loggesUserEmail = authResult?.user?.email;
  if (!formData.has("image")) return;
  try {
    const findUser = await userModel.findOne({ email: loggesUserEmail });

    if (!findUser) {
      throw new Error("User not found");
    }

    findUser.image = formData.get("image").buffer;
    await findUser.save();

    const file = formData.get("image");
  } catch (error) {
    throw new Error("Failed to upload image");
  }
};

export { handleCredentialsLogin, handleProfileImageUpload };
