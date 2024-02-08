'use client'
import Image from 'next/image';
import { useState, useEffect } from "react";

const MarsPhotos = ({ rover }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/photos?rover=${rover}`);
        const data = await response.json();
        setPhotos(data.photos);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchData();
  }, [rover]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{rover.toUpperCase()}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <Image
              src={photo.img_src}
              alt={photo.camera.full_name}
              className="object-cover"
              width={400}
              height={300}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarsPhotos;
