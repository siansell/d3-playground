import { useEffect, useState, useRef } from "react"
import * as d3 from "d3";

import "./dashboard.css"

const data = [
    {
        id: '10',
        values:{
            maintenance:1200,
            salary:5000,
            rent:1200,
            size:25,
            profitMargin:7
        }
    },
    {
        id: '11',
        values:{
            maintenance:1200,
            salary:5000,
            rent:1000,
            size:18,
            profitMargin:9
        }
    },
    {
        id: '12',
        values:{
            maintenance:3000,
            salary:6000,
            rent:2000,
            size:25,
            profitMargin:-2.5
        }
    },
    {
        id: '13',
        values:{
            maintenance:1200,
            salary:5000,
            rent:700,
            size:15,
            profitMargin:11.75
        }
    },
    {
        id: '14',
        values:{
            maintenance:1200,
            salary:5000,
            rent:1800,
            size:29,
            profitMargin:7
        }
    },
    {
        id: '15',
        values:{
            maintenance:1200,
            salary:5000,
            rent:600,
            size:13,
            profitMargin:14
        }
    },
    {
        id: '16',
        values:{
            maintenance:1200,
            salary:5000,
            rent:1600,
            size:28,
            profitMargin:5
        }
    },
    {
        id: '17',
        values:{
            maintenance:1200,
            salary:5000,
            rent:1200,
            size:25,
            profitMargin:8
        }
    },
    {
        id: '18',
        values:{
            maintenance:1200,
            salary:5000,
            rent:1100,
            size:25,
            profitMargin:4
        }
    },
    {
        id: '19',
        values:{
            maintenance:1200,
            salary:5000,
            rent:1200,
            size:25,
            profitMargin:12
        }
    },
    {
        id: '20',
        values:{
            maintenance:1200,
            salary:5000,
            rent:800,
            size:15,
            profitMargin:10.25
        }
    }
]

const Dashboard = () => {
    const [mode, setMode] = useState('absolute') // || percentage
    const isInitialisedRef = useRef(false)

    const innerChart = useRef(null)
    const yScale = useRef(null);

    const margin = {top: 40, right: 170, bottom: 25, left: 40};
    const width = 500;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const init = () => {
        const svg = d3.select("#stacked-bar-chart")
            .append("svg")
            // .attr("viewBox", `0, 0, ${width}, ${height}`)
            .style("border", "1px solid black")
            .style("height", "500px")
            .style("width", "500px")
        
        innerChart.current = svg
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)     
        
        // y-axis
        if (mode === 'absolute') {
        const maxCost = d3.max(data, d => d.values.maintenance + d.values.salary + d.values.rent);
        yScale.current = d3.scaleLinear()
            .domain([0, maxCost])
            .range([innerHeight, 0]);
        } else {
            yScale.current = d3.scaleLinear()
            .domain([0, 100])
            .range([innerHeight, 0]);
        }
        
        const leftAxis = d3.axisLeft(yScale.current); 
        innerChart.current
            .append("g")
            .attr("class", "axis-y")
            .call(leftAxis);

// x-axis
const xScale = d3.scaleBand()
    .domain(data.map(d => d.id))
    .range([0, innerWidth])
const bottomAxis = d3.axisBottom(xScale);
innerChart.current
    .append("g")
    .attr("class", "axis-x")
    .call(bottomAxis)
    .attr('transform', `translate(0, ${innerHeight})`);

// bars
const barWidth = xScale.bandwidth() / 2;

// maintenance
innerChart.current.append('g').classed('bars', true)
innerChart.current.select('.bars').selectAll('g')
    .data(data)
    .join('g')
    .attr('class', d => `bar bar-${d.id}`)
    .each(function(d) {
        // maintenance
        d3.select(this)
            .append('rect')
            .attr('class', 'bar-maintenance')
            .attr('x', d => xScale(d.id) + barWidth /2 )
            .attr('y', d => yScale.current(d.values.maintenance))
            .attr('height', d => innerHeight - yScale.current(d.values.maintenance))
            .attr('fill', '#ff0000')
            .attr('width', barWidth)

            // salary
        d3.select(this)
            .append('rect')
            .attr('class', 'bar-salary')
            .attr('x', d => xScale(d.id) + barWidth /2 )
            .attr('y', d => yScale.current(d.values.salary + d.values.maintenance))
            .attr('height', d => innerHeight - yScale.current(d.values.salary))
            .attr('fill', 'blue')
            .attr('width', barWidth)

        // rent
        d3.select(this)
        .append('rect')
        .attr('class', 'bar-rent')
        .attr('x', d => xScale(d.id) + barWidth /2 )
        .attr('y', d => yScale.current(d.values.salary + d.values.rent + d.values.maintenance))
        .attr('height', d => innerHeight - yScale.current(d.values.rent))
        .attr('fill', 'green')
        .attr('width', barWidth)
    })            

        isInitialisedRef.current = true;
    }

    const update = () => {
        if (mode === 'absolute') {
            const maxCost = d3.max(data, d => d.values.maintenance + d.values.salary + d.values.rent);
            yScale.current = d3.scaleLinear()
                .domain([0, maxCost])
                .range([innerHeight, 0]);
            } else {
                yScale.current = d3.scaleLinear()
                .domain([0, 100])
                .range([innerHeight, 0]);
            }

            const leftAxis = d3.axisLeft(yScale.current); 
            innerChart.current
                .select("g.axis-y")
                .call(leftAxis);
    }

    useEffect(() => {
        if (!isInitialisedRef.current) return
        update();
    }, [mode])

    useEffect(() => {
        init();
    }, [])

    const handleSetMode =() => {
        setMode(mode === 'absolute' ? 'percentage' : 'absolute')
    }
    
    return (
            <>
                <h1>hubl Dashboard</h1>
                <button onClick={handleSetMode} style={{ marginBottom: 10 }}>
                    {mode}
                </button>
                <div id="stacked-bar-chart"></div>
            </>
        )
    }
    
    export default Dashboard