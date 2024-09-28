// src/components/IconKey.jsx

import React from 'react';
import {
  FaAppleAlt,
  FaDumbbell,
  FaWalking,
  FaBed,
  FaTint,
  FaHeart,
  FaBook,
} from 'react-icons/fa';

function IconKey() {
    const keyItems = [
        { name: 'Nutrition', icon: <FaAppleAlt style={{ color: '#333' }} /> },
        { name: 'Exercise', icon: <FaDumbbell style={{ color: '#333' }} /> },
        { name: 'Mobility', icon: <FaWalking style={{ color: '#333' }} /> },
        { name: 'Sleep', icon: <FaBed style={{ color: '#333' }} /> },
        { name: 'Water', icon: <FaTint style={{ color: '#333' }} /> },
        { name: 'Well-being', icon: <FaHeart style={{ color: '#333' }} /> },
        { name: 'Reflection', icon: <FaBook style={{ color: '#333' }} /> },
      ];    

  return (
    <div className="icon-key">
      {keyItems.map((item) => (
        <div key={item.name} className="key-item">
          <span className="icon">{item.icon}</span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default IconKey;
