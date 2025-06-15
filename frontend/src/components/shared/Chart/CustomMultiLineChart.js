import { createRef, useEffect } from "react"
import Chart from 'chart.js/auto';//???????.js{}

const MultiLineChart=({chartTitle, noOfVariables, variableValues, variableLabels, widthChange='40rem'})=>{
    //const [valuePercentage,setValuePercentage]=useState([]);
    const chartRef=createRef(null);

    const showChart=()=>{
        //const labels = ["January", "February", "March", "April", "May", "June"];
        const NUMBER_CFG = {jan: 10, feb: 70, mar: 100, apr: 50, may: 15, june: 85};
        const NUMBER_CFG_ISSUE = {jan: 5, feb: 60, mar: 55, apr: 50, may: 8, june: 61};

        const dataValue={
          //labels: labels,
          datasets: [
            {
              label: 'Referred',
              data: NUMBER_CFG,
              borderColor: 'red',
              backgroundColor: 'red',//Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
              yAxisID: 'y',
            },
            {
              label: 'Issued',
              data: NUMBER_CFG_ISSUE,
              borderColor: 'blue',
              backgroundColor: 'blue',//'Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
              yAxisID: 'y1',
            }
          ]
        };
        const ctx = chartRef.current.getContext('2d');
        const chart = new Chart(ctx, {
          type: 'line',
          data: dataValue,
          options: {
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            stacked: false,
            plugins: {
              title: {
                display: false,
                text: 'Referred'
              }
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
        
                // grid line settings
                grid: {
                  drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
              },
            }
          },
        });
    }
    useEffect(()=>{
        showChart();
    },[])
    return(
        <div className="card" style={{width: widthChange, height: '15rem', paddingTop: '1rem'}}>
            <h5  className="card-title card-title">{chartTitle}</h5>
            {chartRef && <canvas id={Math.round(Math.random()*100)} ref={chartRef} style={{width: '100%', height: '100%', position: 'relative'}}>
            </canvas>}
        </div>
    )
}

export default MultiLineChart