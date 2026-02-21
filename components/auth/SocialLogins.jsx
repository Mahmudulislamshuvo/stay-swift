"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const SocialLogins = ({ mode }) => {
  const handleAuthGoogle = (e) => {
    signIn("google", { redirectTo: "/booking" });
  };
  const handleAuthFacebook = (e) => {
    signIn("facebook", { redirectTo: "/booking" });
  };

  return (
    <>
      <div className="text-center text-xs text-gray-500">
        {mode === "login" && <Link href="/register">Register</Link>}
        {mode === "register" && <Link href="/login">Login</Link>} | or mode
        Signup with
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleAuthFacebook}
          className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center"
        >
          <Image src="/fb.png" alt="facebook" width={40} height={40} />
          <span>Facebook</span>
        </button>
        <button
          onClick={handleAuthGoogle}
          className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center"
        >
          <Image src="/google.png" alt="google" width={40} height={40} />
          <span>Google</span>
        </button>
      </div>
    </>
  );
};

export default SocialLogins;
