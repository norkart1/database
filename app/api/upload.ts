// /app/api/upload.ts

import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// Cloudinary configuration - Set up Cloudinary API keys from environment variables
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
});

// API route handler for image upload
export async function POST(request: Request) {
  try {
    // Retrieve the form data
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    // Check if a file is uploaded
    if (!imageFile) {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.v2.uploader.upload(imageFile);
    console.log('Uploaded Image:', uploadResult);

    // Return the URL of the uploaded image
    return NextResponse.json({
      message: 'Image uploaded successfully!',
      url: uploadResult.secure_url,
    });
  } catch (error) {
    // Log the error and return a failure response
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
}
