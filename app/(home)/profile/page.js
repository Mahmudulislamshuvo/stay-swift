import { auth } from "@/auth";
import ProfileImage from "@/components/auth/ProfileImage";
import { userModel } from "@/models/userModel";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const dbUser = await userModel.findOne({ email: session.user.email }).lean();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Profile Card Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Top Cover Banner - Using your light beige background color */}
        <div className="h-32 bg-[#F8F4EC]"></div>

        <div className="px-8 pb-12">
          {/* Editable Avatar Section */}
          <ProfileImage session={session} currentImageUrl={dbUser?.image} />

          {/* User Primary Info */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              {session?.user?.name}
            </h1>
            <p className="text-gray-500 mt-1">Stay Swift Traveler</p>
          </div>

          {/* Static Details Grid */}
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Field */}
            <div className="bg-[#EAF3EA] p-5 rounded-xl border border-transparent hover:border-green-200 transition-colors">
              <p className="text-sm text-gray-500 mb-1">Email Address</p>
              <p className="font-semibold text-gray-900">
                {session?.user?.email}
              </p>
            </div>

            {/* Phone Field */}
            <div className="bg-[#F8F4EC] p-5 rounded-xl border border-transparent hover:border-yellow-200 transition-colors">
              <p className="text-sm text-gray-500 mb-1">Phone Number</p>
              <p className="font-semibold text-gray-900">
                {session?.user?.phone}
              </p>
            </div>

            {/* Joined Date Field */}
            <div className="bg-gray-50 p-5 rounded-xl md:col-span-2 text-center border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Member Since</p>
              <p className="font-semibold text-gray-900">
                {session?.user?.createdAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
