import { useEffect } from "react"
import * as d3 from "d3";

import "./chapter3.css"

// const dataURI = "https://raw.githubusercontent.com/d3js-in-action-third-edition/code-files/main/chapter_03/3.2-Preparing_data/start/data/data.csv"
const dataURI = "https://raw.githubusercontent.com/siansell/d3-playground/main/src/fa-cup-winners.csv"

const Chapter2 = () => {
    useEffect(() => {
        let svg;

        const xPosition = 150;

        const createViz = vizData => {
            const xScale = d3.scaleLinear()
                .domain([0, d3.max(vizData, d => d.count)])
                .range([0, 500])

            const yScale = d3.scaleBand()
                .domain(vizData.map(d => d.winner))
                .range([0, 700])
                .paddingInner(0.2)

            const bar = svg
                .selectAll('g')
                .data(vizData)
                .join("g")
                    .attr("transform", d => `translate(0, ${yScale(d.winner)})`)
            
            bar
                .append("rect")
                .attr("class", "bar")
                .attr("width", d => xScale(d.count))
                .attr("height", yScale.bandwidth())
                .attr("x", xPosition)
                .attr("y", 0)
                .attr("fill", d => {
                    switch (d.winner) {
                        case "arsenal":
                            return "red"
                        case "tottenham hotspur":
                            return "#eee"
                        default:
                            return "#bada55"
                    }
                })

            bar
                .append("text")
                    .text(d => d.winner)
                    .attr("x", xPosition - 4)
                    .attr("y", 12)
                    .attr("text-anchor", "end")
                    .style("font-size", "11px");

            bar
                .append("text")
                    .text(d => d.count)   
                    .attr("x", d => xPosition + xScale(d.count) + 4)
                    .attr("y", 12)       
                    .style("font-size", "9px");

            svg
                .append("line")
                    .attr("x1", xPosition)
                    .attr("y1", 0)
                    .attr("x2", xPosition)
                    .attr("y2", 700)
                    .attr("stroke", "black");                    
        }

        const init = async () => {     
            svg = d3.select(".responsive-svg-container")
                .append("svg")
                    .attr("viewBox", "0 0 700 700")
                    // .style("border", "1px solid black")

            const data = await d3.csv(dataURI, d => ({
                winner: d.Winner.trim().toLowerCase(),
                year: Number(d.Year) // handles "1993 - replay" etc
            }))
            const filteredData = data.filter(x => !isNaN(x.year)) // removes replays etc
            const groupedData = d3.flatRollup(filteredData, v => v.length, d => d.winner) // prob not the most efficient
                .sort((a, b) => b[1] - a[1])
                .map(x => ({
                    winner: x[0],
                    count: x[1]
                }))
            
            createViz(groupedData)
        }

        init();
    }, [])

    return (
        <>
            <h1>FA Cup Winners</h1>
            <div className="responsive-svg-container"></div>
        </>
    )
}

export default Chapter2