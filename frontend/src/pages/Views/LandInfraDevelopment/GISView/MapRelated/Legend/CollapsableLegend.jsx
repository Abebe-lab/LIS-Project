import React, { useState } from "react";
import LayerSwitcher from "ol-layerswitcher";

const CollapsibleLegend = ({ map }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Initially collapsed
  if(!map) return;
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const layerSwitcher = new LayerSwitcher({
    activationMode: 'click',
    startActive: false,
    label: '',
    collapseLabel: isCollapsed ? '\u25BC' : '\u25B2', // Adjust arrows based on state
    group: false,
    tipLabel: 'Legend',
    collapseTipLabel: isCollapsed ? 'Expand legend' : 'Collapse legend',
    reverse: true,
    groupSelectStyle: 'none',
    fold: 'close'
  });

  map.addControl(layerSwitcher);

  return (
    <div className="legend-container">
      <button onClick={toggleCollapse} aria-expanded={!isCollapsed}>
        {isCollapsed ? '\u25BC' : '\u25B2'} Legend
      </button>
      <div className={`legend-content ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Your legend content here */}
      </div>
    </div>
  );
};

export default CollapsibleLegend;