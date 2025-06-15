import React, { useRef, useEffect } from 'react';
import Overlay from 'ol/Overlay';
import { NorthArrowOverlay } from './NorthArrowControl';
import 'ol/ol.css';

const OpenLayersMap = ({ map, paperSize, mapScale, paperOrientation, printPreviewMode, viewProjection, mapRef }) => {
    // const mapRef = useRef(null); // No longer create mapRef here - using prop
    // const mapInstance = useRef(null); // No longer create mapInstance here - using prop is passed down from PrintableMap
    // const northArrowOverlayRef = useRef(null);

    useEffect(() => {
        if (!map) {
            console.log("Map prop is NOT being passed to OpenLayersMap!"); // Debug log if map prop is missing
            return;
        }

        console.log("Map prop IS being passed to OpenLayersMap:", map); // Debug log to check the map prop

        // --- Set the target for the map instance received as prop ---
        try {
            map.setTarget(mapRef.current); // Set the target using mapRef prop
            console.log("Map target set successfully to:", mapRef.current); // Debug log after setting target
        } catch (error) {
            console.error("Error setting map target:", error); // Error log if setting target fails
        }


        // --- North Arrow Logic (commented out for now to simplify debugging) ---
        // northArrowOverlayRef.current = NorthArrowOverlay();
        // map.addOverlay(northArrowOverlayRef.current);
        // --- End of North Arrow Logic ---


        return () => {
            if (map) {
                try {
                    map.setTarget(undefined); // Clean up - detach target
                    console.log("Map target unset during cleanup."); // Debug log for cleanup
                } catch (error) {
                    console.error("Error unsetting map target during cleanup:", error); // Error log during cleanup failure
                }
            }
        };
    }, [map, mapRef]); // Keep mapRef in dependency array as it's crucial for setTarget

    useEffect(() => {
        if (!map) {
            console.warn("Map instance is not available in size/scale effect."); // Warn if map is missing in the size/scale effect
            return;
        }

        const paperSizesPortrait = { // Define paperSizes or import
            A4: { width: 210, height: 297 },
            A3: { width: 297, height: 420 },
            Letter: { width: 215.9, height: 279.4 },
        };

        const dpi = 72;
        const mmToPixel = (mm) => (mm / 25.4) * dpi;
        const pixelToMm = (px) => (px * 25.4) / dpi;

        const calculateZoomForScale = (scaleDenominator, paperWidthMm, viewProjection) => { // Accept viewProjection
            const paperWidthMeters = (paperWidthMm / 1000) * scaleDenominator;
            const paperWidthPixels = mmToPixel(paperWidthMm);
            const requiredResolution = paperWidthMeters / paperWidthPixels;
            const baseResolution = 78271.51696402048;
            const zoomLevel = Math.log2(baseResolution / requiredResolution) + 1 ;
            return zoomLevel;
        };


        let selectedPaper = paperSizesPortrait[paperSize];
        let paperWidthPx = mmToPixel(selectedPaper.width);
        let paperHeightPx = mmToPixel(selectedPaper.height);

        if (paperOrientation === 'Landscape') {
            paperWidthPx = mmToPixel(selectedPaper.height);
            paperHeightPx = mmToPixel(selectedPaper.width);
        }

        try {
            map.setSize([paperWidthPx, paperHeightPx]); // Use the map instance received as prop
            console.log("Map size set to:", [paperWidthPx, paperHeightPx]); // Debug log map size
        } catch (error) {
            console.error("Error setting map size:", error); // Error log for setSize failure
        }


        try {
            const view = map.getView();
            const targetZoom = calculateZoomForScale(mapScale, pixelToMm(paperWidthPx), viewProjection);

            view.animate({
                zoom: targetZoom,
                duration: 500,
            });
            console.log("Map view animated to zoom:", targetZoom); // Debug log for zoom animation

            view.fit(view.calculateExtent([paperWidthPx, paperHeightPx]), {
                padding: [20, 20, 20, 20],
                duration: 500,
            });
            console.log("Map view fitted to extent."); // Debug log for view fit

        } catch (error) {
            console.error("Error in view animation/fit:", error); // Error log for view operations failure
        }


    }, [map, paperSize, mapScale, paperOrientation, printPreviewMode, viewProjection]); // Now depends on 'map' prop as well


    return <div ref={mapRef} id="map" className="ol-map" style={{ width: '100%', height: '100%', border: '1px solid red' }} />; // Use mapRef prop with border for visibility
};

export default OpenLayersMap;