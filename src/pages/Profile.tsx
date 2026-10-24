import { useState } from "react";

import { ProfileHeader } from "@/feature/profile";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto mt-10 w-full max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Profile
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Manage your account information and preferences.
          </p>
        </header>

        <ProfileHeader
          onEditProfile={() => setIsEditing(true)}
        />

        {isEditing && (
          <section
            aria-labelledby="edit-profile-title"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <h2
                id="edit-profile-title"
                className="text-lg font-semibold text-gray-900"
              >
                Edit profile
              </h2>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                aria-label="Cancel editing profile"
              >
                Cancel
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-600">
              The profile editing form will go here.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}