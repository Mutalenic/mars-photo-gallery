'use client'
import MarsPhotos from "./components/MarsPhotos";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="container">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen py-20">
        <h1 className="text-4xl font-bold mb-8">Mars Rover Photos</h1>
        <MarsPhotos />
      </main>
    </div>
  );
}

