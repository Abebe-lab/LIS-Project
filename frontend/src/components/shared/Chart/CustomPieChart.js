import { createRef, useEffect, useState } from "react"
import Chart from 'chart.js/auto';//???????.js{}

const PieChart=({chartTitle, noOfVariables, variableValues, variableLabels})=>{
    const [valuePercentage,setValuePercentage]=useState([]);

    const dataValues=variableValues?variableValues: [100, 150, 200, 250];
    const chartRef=createRef(null);

    const showChart=()=>{
        const ctx = chartRef.current.getContext('2d');
        const chart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: variableLabels,
            datasets: [{
              data: dataValues,
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
    }
    useEffect(()=>{
        showChart();
    },[])
    return(
        <div className="card" style={{width: '20rem', height: '15rem', paddingTop: '1rem'}}>
            <h5  className="card-title card-title">{chartTitle}</h5>
            {chartRef && <canvas id={Math.round(Math.random()*100)} ref={chartRef} style={{width: '100%', height: '100%', position: 'relative'}}>
            </canvas>}
        </div>
    )
}

export default PieChart