// src/components/PracticeItem.jsx

import React from 'react';
import {
  FaAppleAlt,
  FaDumbbell,
  FaBed,
  FaTint,
  FaBookOpen,
  FaPen,
} from 'react-icons/fa';
import { GrYoga } from "react-icons/gr";

// Updated icon map with new practices and icons
const iconMap = {
  Nutrition: <FaAppleAlt style={{ color: '#333' }} />,
  Exercise: <FaDumbbell style={{ color: '#333' }} />,
  Stretch: <GrYoga style={{ color: '#333' }} />,
  Sleep: <FaBed style={{ color: '#333' }} />,
  Water: <FaTint style={{ color: '#333' }} />,
  Read: <FaBookOpen style={{ color: '#333' }} />,
};

function PracticeItem({ practice, dayData, handleUpdate }) {
  const isChecked = dayData.practices ? dayData.practices.includes(practice.name) : false;
  const nutritionPoints = dayData.nutritionPoints !== undefined ? dayData.nutritionPoints : 'not-set';

  const handleCheckboxChange = () => {
    const updatedPractices = isChecked
      ? dayData.practices.filter((name) => name !== practice.name)
      : [...(dayData.practices || []), practice.name];

    handleUpdate({ practices: updatedPractices });
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value !== 'not-set') {
      handleUpdate({ nutritionPoints: parseInt(value) });
    } else {
      const newData = { ...dayData };
      delete newData.nutritionPoints;
      handleUpdate(newData);
    }
  };

  const iconStyle = {
    width: '24px',
    height: '24px',
    marginRight: '8px',
    color: '#333',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1em',
  };

  if (practice.type === 'checkbox') {
    return (
      <div className="practice">
        <label style={labelStyle} title={practice.name}>
          <span style={iconStyle}>{iconMap[practice.name]}</span>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="checkbox"></span>
        </label>
      </div>
    );
  } else if (practice.type === 'select') {
    return (
      <div className="practice">
        <label style={labelStyle} title={practice.name}>
          <span style={iconStyle}>{iconMap[practice.name]}</span>
          <select value={nutritionPoints} onChange={handleSelectChange}>
            <option value="not-set"></option>
            {[5, 4, 3, 2, 1, 0].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

export default PracticeItem;
