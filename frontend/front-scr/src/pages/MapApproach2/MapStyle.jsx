
import { Fill, Stroke, Style, Text } from 'ol/style';

const createStyle = (feature) => {
    return new Style({
      fill: new Fill({
        color: 'red',
      }),
      stroke: new Stroke({
        color: '#319FD3',
        width: 1,
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: '#000',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 3,
        }),
        text: feature?.getId() ? feature?.getId()?.toString() : '',
      }),
    });
  };

  export {
    createStyle,
  };
