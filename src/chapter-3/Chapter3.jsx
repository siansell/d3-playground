import { useEffect } from "react"
import * as d3 from "d3";

import "./chapter3.css"

// const dataURI = "https://raw.githubusercontent.com/d3js-in-action-third-edition/code-files/main/chapter_03/3.2-Preparing_data/start/data/data.csv"
const dataURI = "https://raw.githubusercontent.com/JaseZiv/worldfootballR_data/master/raw-data/all_leages_and_cups/all_competitions.csv"

const Chapter2 = () => {
    useEffect(() => {
        let svg;

        const createViz = vizData => {
            const barHeight = 20;
            const padding = 5;

            svg
                .selectAll("rect")
                .data(vizData)
                .join("rect")
                    .attr("class", d => {
                        console.log(d)
                        return "bar"
                    })
                    .attr("width", d => d.count)
                    .attr("height", barHeight)
                    .attr("y", (d, i) => (barHeight  + padding) * i)
                    .attr("fill", d => d.technology === "D3.js" ? "red" : "#bada55")
        }

        const init = async () => {     
            svg = d3.select(".responsive-svg-container")
                .append("svg")
                    .attr("viewBox", "0 0 1200 1600")
                    // .style("border", "1px solid black")

            const data = await d3.csv(dataURI, d => {
                // return {
                //     competition_name: d.competition_name,
                // }
                return d
            })

            console.log(data.filter(d => d.competition_name === "FA Cup"))

            // const distinctValues = [...new Set(data.map((d) => d.competition_name))].sort()
            // console.log(distinctValues)
            
            // const sortedData = data.sort((a, b) => b.count - a.count)
            // createViz(sortedData)
        }

        init();
    }, [])

    return (
        <div className="responsive-svg-container"></div>
    )
}

export default Chapter2