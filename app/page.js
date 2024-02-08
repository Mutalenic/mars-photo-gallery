// pages/index.js
'use client'
import { useState, useEffect } from "react";
import {Image} from "next/Image";

export default function Home() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch photos from API (replace "/api/photos" with your actual API route)
    fetch(`/api/photos?rover=perseverance&sol=1000&camera=FHAZ`) // Example parameters
      .then((response) => response.json())
      .then((data) => setPhotos(data.photos))
      .catch((error) => console.error("Error fetching photos:", error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* ... rest of your existing JSX code ... */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <Image
              src={photo.img_src}
              alt={photo.camera.full_name}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
