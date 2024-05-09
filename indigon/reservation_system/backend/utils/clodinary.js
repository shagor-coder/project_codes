import { v2 as cloudinary } from "cloudinary";

export const useCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return cloudinary;
};

export const uploadPhoto = (photoFile) => {
  return new Promise((resolve, reject) => {
    if (!photoFile) resolve(null);
    const fileFormat = photoFile.mimetype.split("/")[1] || "png";
    useCloudinary()
      .uploader.upload_stream(
        { resource_type: "image", format: fileFormat },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              photoURL: result.secure_url,
              photoId: result.public_id,
            });
          }
        }
      )
      .end(photoFile.buffer);
  });
};

export const deletePhoto = async (uploadedImagesId) => {
  const ids =
    typeof uploadedImagesId === "string"
      ? [uploadedImagesId]
      : [...uploadedImagesId];

  try {
    const data = await useCloudinary().api.delete_resources([...ids], {
      type: "upload",
      resource_type: "image",
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
