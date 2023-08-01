// today
import { 
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import React from "react"
import { useRef } from 'react';
import { Bar, getElementAtEvent } from "react-chartjs-2"
import {Chart as chartjs} from 'chart.js/auto'
import classes from './BarChart.module.css'


function BarChart(props) {
    // labels
    // freq
    let Patterns = props.patterns

    let freq = []
    let labels = []
    for (let key in Patterns) {
        labels.push(key)
        freq.push(Patterns[key])
    }

    let curPattern = props.pattern
    let patIndex = labels.indexOf(curPattern)

    let chartData = {
        labels: labels, 
        datasets: [
            {
                data: freq,
                maxBarThickness: 100,
                backgroundColor: item => {
                    if (labels[item.index] == curPattern) {
                        return '#6ba964'
                    }
                    // let color = item.index = patIndex ? 'yay' : 'nay'
                    // console.log(color)
                    return "#c9b458"
                }
            },
        ],
    }

    // OPTIONS FOR CHARTJS
    let options= {
        aspectRatio: 1.9,
        layout: {
            padding: {
                top: 5,
                right: 40,
                bottom: 0,
                left: 5,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    display: false,
                },
                title: {
                    color: '#787c7e',
                    display: true,
                    padding: 35,
                    text: 'All Possible Patterns From This Word       ',
                    font: {
                        size: 18,
                        family: 'Helvetica Neue',
                        weight: "bold",

                    }
                },
            },
            y: {
                grid: {
                    display: false
                },                
                title: {
                    color: '#787c7e',
                    display: true,
                    text: 'Probability of Pattern Occuring',
                    font:{
                        size: 18,
                        family: 'Helvetica Neue',
                        weight: "bold",
                    }
                },
                ticks: {
                    callback: (value, index, values) => {
                        return `${Math.round(100*value)}%`
                    },
                    color: '#787c7e',
                    font: {
                        size: 14,
                        family: 'Helvetica Neue',
                        weight: 600,
                    },
                },
                
            },
        },
        
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
                callbacks: {
                    // labelTextColor: (context) => {
                    //     return '#123456';
                    // },
                    
                    label: function(tooltipItem, data) {
                        var label = labels[tooltipItem.dataIndex]
                        var value = tooltipItem.parsed.y.toFixed(4)
                        
                        return (label + ': ' + value + "%" + "■") 
                    }
                }
            },
        },
      }
      

    let segmentHighlighter = {
        id: 'segmentHighlighter',
        afterDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, tooltip, chartArea: { top, height}, scales: {x, y} } = chart;
            ctx.save()
            if (tooltip._active[0]) {
                const xCord = x.getPixelForValue(tooltip._active[0].index)
            

                let pattern = labels[tooltip._active[0].index]
                
                for (let i = 0; i < 5; i++ ){
                    if (pattern[i] == "r") {
                        ctx.fillStyle = '#787c7e';
                        
                    } else if (pattern[i] == "y") {
                        ctx.fillStyle = '#c9b458';
        
                    } else {
                        ctx.fillStyle = '#6ba964';
                    }
                    ctx.fillRect(xCord - 39 + 16*i, top+height+10, 15, 15);            
                }
                ctx.font = "600 14px Arial";
                ctx.textAlign = 'center';
                ctx.fillStyle = '#787c7e';
                
                ctx.fillText(`${ Math.round(freq[tooltip._active[0].index] * 10000)/ 100}%`, xCord - 39 + 8*5, top+height+40);   
                
            }
        }
    }   
    
    
    const chartRef = useRef()
    const onClick = (event) => {
        const bar = getElementAtEvent(chartRef.current, event)
        if (bar.length == 1) {
            const newPattern = labels[bar[0].index]; 
            props.onPatternChange(newPattern)
        }
    }

    return (
            <div className={classes.container}>
                <p>
                    <Bar 
                        ref={chartRef}
                        data = {chartData}
                        onClick = {onClick}
                        options = {options} 
                        plugins = {[segmentHighlighter]}
                    />
                </p>
            </div>
    )
    /* 
            <div className={classes.yLabel}>
                % of Pattern Occuring
            </div>
            <p >
                <Bar data = {chartData} options={options}/>
            </p>
            <p className={classes.xLabel}>
                Pattern
            </p>
    */
}

export default BarChart;