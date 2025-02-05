// components/ProfileImageUpload.jsx
import React from "react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ProfileImageUpload({ setImageUrl }) {
  const [profileImage, setProfileImage] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const uploadImage = async (file) => {
    const filePath = `profile-images/${Date.now()}_${file.name}`;

    try {
      setIsUploading(true);
      const { data, error } = await supabase.storage
        .from("avatars") // نام باکت شما
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading image:", error.message);
        return null;
      }

      console.log("Uploaded image successfully:", data);
      setImageUrl(data.Key);  // ارسال لینک تصویر به والد
      return data.Key;
    } catch (err) {
      console.error("Unexpected error during image upload:", err);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      uploadImage(file);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="profileImage"
        className="block font-semibold mb-2 text-black"
      >
        تصویر پروفایل
      </label>
      <input
        type="file"
        id="profileImage"
        name="profileImage"
        accept="image/*"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleImageChange}
      />
      {isUploading && <div>در حال آپلود...</div>}
    </div>
  );
}
