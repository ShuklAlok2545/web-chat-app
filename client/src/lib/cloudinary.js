const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const preset_name = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_name);
    formData.append("cloud_name",cloud_name);
  
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
  
    return await response.json();
  };
  