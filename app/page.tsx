'use client'
import MarsPhotos from "./components/MarsPhotos";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="py-8">
        <MarsPhotos />
      </main>
    </div>
  );
}

