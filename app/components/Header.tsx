'use client'

import { useEffect, useState } from "react";

import Description from "./Description";

const Header = () => {
  const [telemetry, setTelemetry] = useState({
    status: "INITIALIZING",
    transmission: "STANDBY",
    sol: "----"
  });

  useEffect(() => {
    const solSeed = 1500 + Math.floor(Math.random() * 120);
    setTelemetry({
      status: "ONLINE",
      transmission: "ACTIVE",
      sol: String(solSeed)
    });
  }, []);

  return (
    <header className="py-8">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <span className="status-indicator status-online"></span>
          <h1 className="text-4xl font-bold text-center data-display">MARS MISSION CONTROL</h1>
          <span className="status-indicator status-online"></span>
        </div>
        <div className="text-sm data-display text-green-400">
          SYSTEM STATUS: {telemetry.status} | TRANSMISSION: {telemetry.transmission} | SOL: {telemetry.sol}
        </div>
        <Description />
      </div>
    </header>
  );
};

export default Header;