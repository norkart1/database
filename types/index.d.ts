// Example usage in /app/page.tsx

import { useState, ChangeEvent, FormEvent } from 'react';

const HomePage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImage(file);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!image) {
      setMessage('Please select an image');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result: ImageUploadResponse = await response.json();

      if (response.ok) {
        setMessage('Image uploaded successfully!');
        setImageUrl(result.url);
      } else {
        setMessage(result.error || 'Image upload failed');
      }
    } catch (error) {
      setMessage('Error uploading image');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Upload Image to Cloudinary</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="image">Select Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {message && <p>{message}</p>}
      {imageUrl && <div><p>Uploaded Image:</p><img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} /></div>}
    </div>
  );
};

export default HomePage;
