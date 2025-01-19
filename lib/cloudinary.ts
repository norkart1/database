// /app/cloudinary.ts

import cloudinary from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';

// Configure Cloudinary with your Cloud name, API Key, and API Secret
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle image uploads via Cloudinary
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  try {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      resource_type: 'auto', // Automatically determine file type
    });

    // Return the URL of the uploaded image
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Error uploading image');
  }
};

// API handler for image uploads
export const handleUpload = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      if (!req.files || !req.files.image) {
        return res.status(400).json({ error: 'No image file uploaded' });
      }

      const file = req.files.image[0];

      const imageUrl = await uploadImageToCloudinary(file);

      return res.status(200).json({ url: imageUrl });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ error: 'Error uploading image' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
