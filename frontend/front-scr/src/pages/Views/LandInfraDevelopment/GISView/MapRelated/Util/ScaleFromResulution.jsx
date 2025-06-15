import ol from 'openlayers';

var INCHES_PER_UNIT = {
    'm': 39.37,
    'dd': 4374754
  };
  var DOTS_PER_INCH = 72;
  
  /**
   * @param {number} resolution Resolution.
   * @param {string} units Units
   * @param {boolean=} opt_round Whether to round the scale or not.
   * @return {number} Scale
   */
  const getScaleFromResolution = function(resolution, units, opt_round=true) {
    var scale = INCHES_PER_UNIT[units] * DOTS_PER_INCH * resolution;
    if (opt_round) {
      scale = Math.round(scale);
    }
    return scale;
  };
  const mapScale=(dpi, map) =>{
    var unit = map.getView().getProjection().getUnits();
    var resolution = map.getView().getResolution();
    var inchesPerMetre = 39.37;

    return resolution * ol.proj.METERS_PER_UNIT[unit] * inchesPerMetre * dpi;
}
const scaleUtils = { mapScale, getScaleFromResolution };
export default scaleUtils;