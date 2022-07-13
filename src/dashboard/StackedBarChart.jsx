import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3";

const StackedBarChart = ({ data, chartId }) => {
    const [mode, setMode] = useState('absolute') // || percentage
    const isInitialisedRef = useRef(false)

    const innerChart = useRef(null);
    const yScale = useRef(null);
    const xScale = useRef(null);

    const margin = { top: 40, right: 170, bottom: 25, left: 40 };
    const width = 500;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        //process data
        const barData = data.map((d) => {
            const totalCost = d.values.maintenance + d.values.salary + d.values.rent;
            const pcValues = {};
            Object.entries(d.values).forEach(([k, v]) => {
                pcValues[k] = totalCost !== 0 ? (v / totalCost) * 100 : undefined;
            })
            return { ...d, pcValues, totalCost }
        })

        //render
        const init = () => {
            const svg = d3.select(`#${chartId}`)
                .append("svg")
                // .style("border", "1px solid black")
                .style("height", "500px")
                .style("width", "500px")

            innerChart.current = svg
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)


            innerChart.current
                .append("g")
                .attr("class", "axis-y")

            // x-axis
            xScale.current = d3.scaleBand()
                .domain(data.map(d => d.id))
                .range([0, innerWidth])
            const bottomAxis = d3.axisBottom(xScale.current);
            innerChart.current
                .append("g")
                .attr("class", "axis-x")
                .call(bottomAxis)
                .attr('transform', `translate(0, ${innerHeight})`);

            // maintenance
            innerChart.current.append('g').classed('bars', true)

            isInitialisedRef.current = true;
        }

        const update = () => {
            // bars
            const barWidth = xScale.current.bandwidth() / 2;

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

            innerChart.current.select('.bars').selectAll('g').selectAll("rect").remove();

            innerChart.current.select('.bars').selectAll('g')
                .data(barData)
                .join('g')
                .attr('class', d => `bar bar-${d.id}`)
                .each(function (/* d */) {
                    // maintenance
                    d3.select(this)
                        .append('rect')
                        .attr('class', 'bar-maintenance')
                        .attr('x', d => xScale.current(d.id) + barWidth / 2)
                        .attr('y', d => {
                            const value = mode === "absolute" ? d.values.maintenance : d.pcValues.maintenance;
                            return yScale.current(value);
                        })
                        .attr('height', d => {
                            const value = mode === "absolute" ? d.values.maintenance : d.pcValues.maintenance;
                            return (innerHeight - yScale.current(value));
                        })
                        .attr('fill', '#ff0000')
                        .attr('width', barWidth)

                    // salary
                    d3.select(this)
                        .append('rect')
                        .attr('class', 'bar-salary')
                        .attr('x', d => xScale.current(d.id) + barWidth / 2)
                        .attr('y', d => {
                            const salaryValue = mode === "absolute" ? d.values.salary : d.pcValues.salary;
                            const maintenanceValue = mode === "absolute" ? d.values.maintenance : d.pcValues.maintenance;
                            return yScale.current(salaryValue + maintenanceValue)
                        })
                        .attr('height', d => {
                            const salaryValue = mode === "absolute" ? d.values.salary : d.pcValues.salary;
                            return innerHeight - yScale.current(salaryValue)
                        })
                        .attr('fill', 'blue')
                        .attr('width', barWidth)

                    // rent
                    d3.select(this)
                        .append('rect')
                        .attr('class', 'bar-rent')
                        .attr('x', d => xScale.current(d.id) + barWidth / 2)
                        .attr('y', d => {
                            const salaryValue = mode === "absolute" ? d.values.salary : d.pcValues.salary;
                            const maintenanceValue = mode === "absolute" ? d.values.maintenance : d.pcValues.maintenance;
                            const rentValue = mode === "absolute" ? d.values.rent : d.pcValues.rent;

                            return yScale.current(salaryValue + maintenanceValue + rentValue);
                        })
                        .attr('height', d => {
                            const rentValue = mode === "absolute" ? d.values.rent : d.pcValues.rent;
                            return innerHeight - yScale.current(rentValue)
                        })
                        .attr('fill', 'green')
                        .attr('width', barWidth)
                })
        }

        if (!isInitialisedRef.current) {
            init();
        }
        update();
    }, [mode])

    const handleSetMode = () => {
        setMode(mode === 'absolute' ? 'percentage' : 'absolute')
    }

    return (
        <div className="dashboard-chart">
            <button onClick={handleSetMode}>
                {mode}
            </button>
            <div id={chartId} />
        </div>
    )
}

StackedBarChart.propTypes = {
    chartId: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default StackedBarChart