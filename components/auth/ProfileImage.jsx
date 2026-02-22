"use client";

import { uploadAndUpdateProfileImage } from "@/actions/cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const ProfileImage = ({ session, currentImageUrl }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(currentImageUrl);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previousImageUrl = profileImage;
    const localUrl = URL.createObjectURL(file);
    setProfileImage(localUrl);

    try {
      // FormData তৈরি করা
      const formData = new FormData();
      formData.append("image", file);
      formData.append("email", session.user.email);

      // যদি ইউজারের আগের ছবি থাকে এবং সেটি ক্লাউডিনারির লিংক হয়, তবে সেটিও পাঠান
      if (previousImageUrl && previousImageUrl.includes("cloudinary.com")) {
        formData.append("oldImageUrl", previousImageUrl);
      }

      // Server Action কল করা
      const result = await uploadAndUpdateProfileImage(formData);

      if (result.success) {
        setProfileImage(result.imageUrl);
        console.log("Image updated successfully in Cloudinary & MongoDB!");

        router.refresh();
      } else {
        setProfileImage(previousImageUrl);
        console.error(result.error);
      }
    } catch (error) {
      setProfileImage(previousImageUrl);
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      <div className="relative flex justify-center -mt-16 mb-6">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md group cursor-pointer bg-[#ea580c] flex items-center justify-center"
        >
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile"
              fill
              className="object-cover"
            />
          ) : (
            <Image
              src={"/placeholder-profile.png"}
              alt="Profile"
              fill
              className="object-cover"
            />
          )}

          {/* Dark overlay with camera icon on hover */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg
              className="w-6 h-6 text-white mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <span className="text-white text-xs font-medium">Update</span>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </>
  );
};

export default ProfileImage;
