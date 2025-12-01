"use client";

import Image from "next/image";

interface UserProps {
  user: {
    name: string;
    avatar?: { secure_url: string };
  };
}

const User = ({ user }: UserProps) => {
  // إذا عنده صورة، نعرضها مع الاسم
  if (user?.avatar?.secure_url) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full overflow-hidden relative">
          <Image
            src={user.avatar.secure_url}
            alt={user.name}
            className="object-cover"
            fill
          />
        </div>
        <h1 className="text-base text-white">{user.name}</h1>
      </div>
    );
  }

  // إذا ما عنده صورة، نعرض الاسم فقط
  return <h1 className="text-base text-white">{user.name}</h1>;
};

export default User;
