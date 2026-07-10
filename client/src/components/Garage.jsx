// Car Parking Friends Edition
// Created by: kernavee
// Garage System - Car Customization

import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';

const carColors = ['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF'];
const wheelTypes = ['Standard', 'Sport', 'Classic', 'Modern'];
const bodyTypes = ['Sedan', 'SUV', 'Sporty', 'Truck'];

export function Garage() {
  const { selectedCar, setSelectedCar } = useGameStore();
  const [selectedColor, setSelectedColor] = useState(selectedCar.customization?.color || '#FF0000');
  const [selectedWheel, setSelectedWheel] = useState(selectedCar.customization?.wheel || 'Standard');
  const [selectedBody, setSelectedBody] = useState(selectedCar.customization?.body || 'Sedan');

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedCar({
      ...selectedCar,
      customization: {
        ...selectedCar.customization,
        color,
      },
    });
  };

  const handleWheelChange = (wheel) => {
    setSelectedWheel(wheel);
    setSelectedCar({
      ...selectedCar,
      customization: {
        ...selectedCar.customization,
        wheel,
      },
    });
  };

  const handleBodyChange = (body) => {
    setSelectedBody(body);
    setSelectedCar({
      ...selectedCar,
      customization: {
        ...selectedCar.customization,
        body,
      },
    });
  };

  return (
    <div className="garage-container">
      <h1>🏎️ Your Garage</h1>
      
      <div className="garage-preview">
        <div 
          className="car-preview"
          style={{ backgroundColor: selectedColor }}
        >
          <p>Car Body: {selectedBody}</p>
          <p>Wheels: {selectedWheel}</p>
        </div>
      </div>

      <div className="customization-panel">
        <div className="customization-section">
          <h2>Paint Color</h2>
          <div className="color-options">
            {carColors.map((color) => (
              <button
                key={color}
                className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="customization-section">
          <h2>Wheel Type</h2>
          <div className="wheel-options">
            {wheelTypes.map((wheel) => (
              <button
                key={wheel}
                className={`wheel-btn ${selectedWheel === wheel ? 'selected' : ''}`}
                onClick={() => handleWheelChange(wheel)}
              >
                {wheel}
              </button>
            ))}
          </div>
        </div>

        <div className="customization-section">
          <h2>Body Type</h2>
          <div className="body-options">
            {bodyTypes.map((body) => (
              <button
                key={body}
                className={`body-btn ${selectedBody === body ? 'selected' : ''}`}
                onClick={() => handleBodyChange(body)}
              >
                {body}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .garage-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          border-radius: 15px;
          color: white;
        }

        h1 {
          text-align: center;
          font-size: 2.5em;
          margin-bottom: 30px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .garage-preview {
          text-align: center;
          margin-bottom: 30px;
        }

        .car-preview {
          width: 200px;
          height: 150px;
          margin: 0 auto;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: 0 8px 16px rgba(0,0,0,0.3);
          transition: transform 0.3s ease;
        }

        .car-preview:hover {
          transform: scale(1.05);
        }

        .car-preview p {
          margin: 5px 0;
          color: white;
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
        }

        .customization-panel {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .customization-section {
          background: rgba(255,255,255,0.1);
          padding: 15px;
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }

        .customization-section h2 {
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.3em;
        }

        .color-options {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 10px;
        }

        .color-btn {
          width: 100%;
          aspect-ratio: 1;
          border: 3px solid transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .color-btn.selected {
          border-color: white;
          box-shadow: 0 0 10px rgba(255,255,255,0.8);
          transform: scale(1.1);
        }

        .wheel-options,
        .body-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .wheel-btn,
        .body-btn {
          padding: 12px;
          background: rgba(255,255,255,0.2);
          border: 2px solid white;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .wheel-btn:hover,
        .body-btn:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }

        .wheel-btn.selected,
        .body-btn.selected {
          background: rgba(255,255,255,0.5);
          box-shadow: 0 0 15px rgba(255,255,255,0.6);
        }
      `}</style>
    </div>
  );
}
