import { useEffect } from "react"
import * as d3 from "d3";

import "./dashboard.css"

const data = [
    {
        id: 1,
        name: "Factory A",
        values: {
            maintenance: 750,
            salary: 3000,
            rent: 1200,
            size: 22 , // m2
            profitMargin: 5, // %
        }
    },
    {
        id: 2,
        name: "Factory B",
        values: {
            maintenance: 1000,
            salary: 5000,
            rent: 1400,
            size: 44 , // m2
            profitMargin: 10, // %
        }
    },
    {
        id: 3,
        name: "Factory C",
        values: {
            maintenance: 400,
            salary: 1234,
            rent: 800,
            size: 123 , // m2
            profitMargin: 22, // %
        }
    },
]

const Dashboard = () => {
    useEffect(() => {
        const drawStackedBarChart = () => {
            const margin = {top: 40, right: 170, bottom: 25, left: 40};
            const width = 500;
            const height = 500;
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;
            
            const svg = d3.select("#stacked-bar-chart")
                .append("svg")
                // .attr("viewBox", `0, 0, ${width}, ${height}`)
                .style("border", "1px solid black")
                .style("height", "500px")
                .style("width", "500px")
            
            const innerChart = svg
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)     
            
            // y-axis
            const maxCost = d3.max(data, d => d.values.maintenance + d.values.salary + d.values.rent);
            const yScale = d3.scaleLinear()
                .domain([0, maxCost])
                .range([innerHeight, 0]);
            const leftAxis = d3.axisLeft(yScale); 
            innerChart
                .append("g")
                .attr("class", "axis-y")
                .call(leftAxis);

            // x-axis
            const xScale = d3.scaleBand()
                .domain(data.map(d => d.name))
                .range([0, innerWidth])
            const bottomAxis = d3.axisBottom(xScale);
            innerChart
                .append("g")
                .attr("class", "axis-x")
                .call(bottomAxis)
                .attr('transform', `translate(0, ${innerHeight})`);

            // bars
            const barWidth = xScale.bandwidth() / 2;

            // maintenance
            innerChart.append('g').classed('bars', true)
            innerChart.select('.bars').selectAll('g')
                .data(data)
                .join('g')
                .attr('class', d => `bar bar-${d.name}`)
                .each(function(d) {
                    // maintenance
                    d3.select(this)
                        .append('rect')
                        .attr('class', 'bar-maintenance')
                        .attr('x', d => xScale(d.name) + barWidth /2 )
                        .attr('y', d => yScale(d.values.maintenance))
                        .attr('height', d => innerHeight - yScale(d.values.maintenance))
                        .attr('fill', '#ff0000')
                        .attr('width', barWidth)

                        // salary
                    d3.select(this)
                        .append('rect')
                        .attr('class', 'bar-salary')
                        .attr('x', d => xScale(d.name) + barWidth /2 )
                        .attr('y', d => yScale(d.values.salary + d.values.maintenance))
                        .attr('height', d => innerHeight - yScale(d.values.salary))
                        .attr('fill', 'blue')
                        .attr('width', barWidth)

                    // rent
                    d3.select(this)
                    .append('rect')
                    .attr('class', 'bar-rent')
                    .attr('x', d => xScale(d.name) + barWidth /2 )
                    .attr('y', d => yScale(d.values.salary + d.values.rent + d.values.maintenance))
                    .attr('height', d => innerHeight - yScale(d.values.rent))
                    .attr('fill', 'green')
                    .attr('width', barWidth)
                })

/*
            innerChart.selectAll('rect.maintenance')
                .classed('maintenance', true)
                .data(data)
                .join('rect')
                .attr('x', d => xScale(d.name) + barWidth /2 )
                .attr('y', d => innerHeight - yScale(d.values.maintenance))
                .attr('width', barWidth)
                .attr('height', d => yScale(d.values.maintenance))
                .attr('fill', '#ff0000')

            // salary
            innerChart.selectAll('rect.salary')
                .classed('salary', true)
                .data(data)
                .join('rect')
                .attr('x', d => xScale(d.name) + barWidth /2 )
                .attr('y', d => innerHeight - yScale(d.values.salary + d.values.maintenance))
                .attr('width', barWidth)
                .attr('height', d => yScale(d.values.salary))
                .attr('fill', 'blue')

            // rent
            innerChart.selectAll('rect.salary')
                .classed('rent', true)
                .data(data)
                .join('rect')
                .attr('x', d => xScale(d.name) + barWidth /2 )
                .attr('y', d => innerHeight - yScale(d.values.salary + d.values.maintenance + d.values.rent))   
                .attr('width', barWidth)
                .attr('height', d => yScale(d.values.rent))
                .attr('fill', 'green')
                */
        }
        
        const init = async () => {     
            drawStackedBarChart()
        }
        
        init();
    }, [])
    
    return (
            <>
                <h1>hubl Dashboard</h1>
                <div id="stacked-bar-chart"></div>
            </>
        )
    }
    
    export default Dashboard