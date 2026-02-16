'use client'
import MarsPhotos from "./components/MarsPhotos";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 crt-flicker">
      <div className="scan-line">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <MarsPhotos />
        </main>
      </div>
    </div>
  );
}
