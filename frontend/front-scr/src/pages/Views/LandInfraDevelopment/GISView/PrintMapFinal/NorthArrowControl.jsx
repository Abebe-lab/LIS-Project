import React, { useRef, useEffect } from 'react';
import { Overlay } from 'ol'; // Corrected import - named import from 'ol'
import 'ol/ol.css';

// Export a function that returns the ol/Overlay instance
export const NorthArrowOverlay = () => { // Corrected export to named export
    const element = document.createElement('div');
    const northArrowOverlay = new Overlay({
        
        element: element,
        positioning: 'bottom-left',
        offset: [10, -10],
    });

    //console.log("NorthArrowOverlay created:", northArrowOverlay); // Debug: Log the created Overlay object
    //console.log("Overlay has getId method:", typeof northArrowOverlay.getId === 'function'); // Debug: Check for getId method

    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 40;
    element.appendChild(canvas);

    const context = canvas.getContext('2d');
    if (context) {
        context.strokeStyle = 'black';
        context.fillStyle = 'black';
        context.lineWidth = 2;

        // North Arrow Styling - Simple Triangle
        context.beginPath();
        context.moveTo(canvas.width / 2, 5); // Top point
        context.lineTo(canvas.width / 4, canvas.height - 5); // Bottom Left
        context.lineTo(canvas.width * 3 / 4, canvas.height - 5); // Bottom Right
        context.closePath();
        context.fill();
        context.stroke();

         // Draw 'N'
         context.fillStyle = 'white';
         context.font = 'bold 12px Arial';
         context.textAlign = 'center';
         context.textBaseline = 'middle';
         context.fillText('N', canvas.width / 2, canvas.height / 2 + 2);
    }

    return northArrowOverlay; // Return the ol/Overlay instance
};

// No default export needed now as it's a named export
// export default NorthArrowControl; // REMOVE this default export