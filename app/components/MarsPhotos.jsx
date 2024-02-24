import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorDisplay from "./ErrorDisplay";
import "./styles.css";

const MarsPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=MAST&api_key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Limiting photos to a maximum of 8 images
        setPhotos(data.photos.slice(0, 8));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 justify-center items-center">
      {photos.map((photo) => (
        <div key={photo.id} className="relative cursor-pointer">
          <img
            src={photo.img_src}
            alt={photo.id}
            className="block w-full h-auto rounded-lg transition-transform duration-300 transform hover:scale-105"
            onClick={() => handlePhotoClick(photo)}
          />
        </div>
      ))}
      {selectedPhoto && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <img src={selectedPhoto.img_src} alt={selectedPhoto.id} className="modal-img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarsPhotos;
