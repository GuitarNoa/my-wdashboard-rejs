import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";

export default function Profile() {
  return (
    <DefaultLayout>
      <div className="container">
        <div className="flex flex-col justify-center items-center text-center">
          <img
            className="h-48 w-48 rounded-full object-cover"
            src="/my_profile.jpg"
            alt="Profile"
          />
          <div>Profile</div>
        </div>
      </div>
    </DefaultLayout>
  );
}
