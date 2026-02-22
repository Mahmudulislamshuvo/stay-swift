"use server";

import { dbConnect } from "@/lib/mongoDb";
import { userModel } from "@/models/userModel";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadAndUpdateProfileImage(formData) {
  try {
    const file = formData.get("image");
    const oldImageUrl = formData.get("oldImageUrl");
    const email = formData.get("email");

    if (!file) throw new Error("No image file provided");
    if (!email) throw new Error("User email is missing");

    if (oldImageUrl && oldImageUrl.includes("cloudinary.com")) {
      const urlParts = oldImageUrl.split("/");
      const filename = urlParts[urlParts.length - 1];
      const publicId = filename.split(".")[0];
      const fullPublicId = `stay-swift-profiles/${publicId}`;

      await cloudinary.uploader.destroy(fullPublicId);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "stay-swift-profiles" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    const newImageUrl = uploadResult.secure_url;

    await dbConnect();
    await userModel.findOneAndUpdate(
      { email: email },
      { image: newImageUrl },
      { new: true },
    );

    return { success: true, imageUrl: newImageUrl };
  } catch (error) {
    console.error("Cloudinary error:", error);
    return { error: "Failed to upload image" };
  }
}
