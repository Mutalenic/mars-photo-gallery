import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorDisplay from "./ErrorDisplay";
import "./styles.css";
import Image from "next/image";

const MarsPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(0);

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
        const allPhotos = data.photos.slice(0, 60);
        setPhotos(allPhotos);
        setPreviewPhotos(allPhotos.slice(0, 30));
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

  const handleArrowClick = (direction) => {
    if (direction === 'prev') {
      setPreviewIndex((prevIndex) => (prevIndex === 0 ? previewPhotos.length - 1 : prevIndex - 1));
    } else {
      setPreviewIndex((prevIndex) => (prevIndex === previewPhotos.length - 1 ? 0 : prevIndex + 1));
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className="container">
      <div className="preview">
        {previewPhotos.map((photo, index) => (
          <img
            key={index}
            src={photo.img_src}
            alt={photo.id}
            className={`preview-img ${index === previewIndex ? 'active' : ''}`}
            onClick={() => handlePhotoClick(photo)}
          />
        ))}
        <button className="arrow prev" onClick={() => handleArrowClick('prev')}>&#10094;</button>
        <button className="arrow next" onClick={() => handleArrowClick('next')}>&#10095;</button>
      </div>
      {selectedPhoto && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <Image src={selectedPhoto.img_src} alt={selectedPhoto.id} className="modal-img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarsPhotos;
