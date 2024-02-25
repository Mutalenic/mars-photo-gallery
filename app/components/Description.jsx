'use client'
const Description = () => {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <p className="text-lg mb-4">
          MarsPhotos.app is a Next.js web application that empowers you to delve into the captivating world of Mars through breathtaking images captured by NASA's rovers. Currently, embark on a journey with the Mast Camera, uncovering majestic landscapes, craters, and geological wonders. Stay tuned for exciting updates as we expand the collection to include photos from other cameras, further enriching your exploration experience.
        </p>
        <h2 className="text-xl font-semibold mb-2">Key Features:</h2>
        <ul className="list-disc pl-6">
          <li className="mb-2">Authentic NASA API Integration: Interact directly with NASA`&apos;`s API, ensuring access to real-time, high-resolution photos.</li>
          <li className="mb-2">Intuitive Interface: Enjoy a user-friendly experience for navigating and appreciating the diverse Martian imagery.</li>
          <li className="mb-2">Current Focus: Immerse yourself in the captivating views from the Mast Camera.</li>
          <li className="mb-2">Anticipated Expansions: Look forward to the inclusion of photos from other cameras, offering new perspectives on Mars.</li>
        </ul>
      </div>
    );
  };
  
  export default Description;
  