'use client'
const PhotoCard = ({ photo }) => {
    return (
      <div className="relative">
        <img src={photo.img_src} alt={photo.camera.full_name} className="rounded-lg object-cover w-full h-full" />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-2 text-white">
          <p className="text-sm">{photo.camera.full_name}</p>
          <p className="text-sm">{photo.earth_date}</p>
        </div>
      </div>
    );
  };
  
  export default PhotoCard;
  