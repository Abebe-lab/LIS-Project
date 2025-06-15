const greenBorderOnly= { borderColor: "green", borderWidth: 2, borderStyle: "solid"};
const alignContentToCenterVertically={display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center'};
const greenBorderWithCenterContent= {...greenBorderOnly, alignContent: "center", alignItems: "center", display: "flex", flexDirection: "column", textAlign: "center"};
const titleLeftTopStyle = { ...greenBorderOnly, padding: 1, marginTop: 1 };
const coordinateStyle = { alignItems: "center", display: "flex", flexDirection: "column"};
const legendAndCoordStyle = { alignItems: 'center', height: '100%', borderRight: '1px solid grey', display: 'flex', flexDirection: 'column'};


export { titleLeftTopStyle, legendAndCoordStyle, coordinateStyle,greenBorderOnly,greenBorderWithCenterContent,alignContentToCenterVertically };
