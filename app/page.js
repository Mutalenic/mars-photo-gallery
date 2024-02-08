'use client'
import MarsPhotos from "./components/marsphotos";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Mars Rover Photos</h1>
      <MarsPhotos rover="curiosity" />
      <MarsPhotos rover="spirit" />
      <MarsPhotos rover="opportunity" />
    </main>
  );
}
