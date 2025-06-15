// Popup.jsx
import React from 'react';

const Popup = ({ feature }) => {
  if (!feature) return null;

  const properties = feature.getProperties();
  const attributes = Object.entries(properties).map(([key, value]) => (
    <div key={key}>
      <strong>{key}:</strong> {value}
    </div>
  ));

  return (
    <div className="popup">
      <h3>Feature Attributes</h3>
      {
      //attributes
      
      }
    </div>
  );
};

export default Popup;
