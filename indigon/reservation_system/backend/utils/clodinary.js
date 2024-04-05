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
  const fileFormat = photoFile.mimetype.split("/")[1] || "png";
  return new Promise((resolve, reject) => {
    useCloudinary()
      .uploader.upload_stream(
        { resource_type: "raw", format: fileFormat },
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

export const deletePhoto = async (uploadedImagesId = []) => {
  try {
    const data = await useCloudinary().api.delete_resources(
      [...uploadedImagesId],
      {
        type: "upload",
        resource_type: "raw",
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
