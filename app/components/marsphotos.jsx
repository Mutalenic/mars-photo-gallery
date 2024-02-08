// components/MarsPhotos.js
import Image from 'next/image'
import { useState, useEffect } from "react";

const MarsPhotos = ({ rover, sol, camera, earth_date }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/photos?rover=${rover}&sol=${sol}&camera=${camera}&earth_date=${earth_date}`);
        const data = await response.json();
        setPhotos(data.photos);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchData();
  }, [rover, sol, camera, earth_date]);

  return (
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
  );
};

export default MarsPhotos;
 

//   return (
//     <Image
//       src="/profile.png"
//       width={500}
//       height={500}
//       alt="Picture of the author"
//     />
//   )
// }