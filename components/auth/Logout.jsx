"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <button
      className="font-bold "
      onClick={() => signOut({ redirectTo: "/login" })}
    >
      Logout
    </button>
  );
};

export default Logout;
