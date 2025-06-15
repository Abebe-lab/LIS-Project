import { createRef, useEffect, useState } from "react"
import Chart from 'chart.js/auto';//???????.js{}

const LineChart=({chartTitle, noOfVariables, variableValues, variableLabels})=>{
    const [valuePercentage,setValuePercentage]=useState([]);
    const chartRef=createRef(null);

    const showChart=()=>{
        const labels =variableLabels? variableLabels: ["January", "February", "March", "April", "May", "June"];
        const dataValues=variableValues? variableValues: [65, 59, 80, 81, 56, 55, 40];
        const ctx = chartRef.current.getContext('2d');
        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: chartTitle,
              data: dataValues,
              fill: false,
              borderColor: 'red',
              tension: 0.1
            }]
          },
        });
    }
    useEffect(()=>{
        showChart();
    },[])
    return(
        <div className="card" style={{width: '40rem', height: '15rem', paddingTop: '1rem'}}>
            <h5  className="card-title card-title">{chartTitle}</h5>
            {chartRef && <canvas id={Math.round(Math.random()*100)} ref={chartRef} style={{width: '100%', height: '100%', position: 'relative'}}>
            </canvas>}
        </div>
    )
}

export default LineChart