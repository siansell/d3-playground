import { useEffect } from "react"
import * as d3 from "d3";

import "./chapter3.css"

const Chapter2 = () => {
    useEffect(() => {
        const svg = d3.select(".responsive-svg-container")
            .append("svg")
                .attr("viewBox", "0 0 1200 1600")
                .style("border", "1px solid black")
    }, [])

    return (
        <div className="responsive-svg-container"></div>
    )
}

export default Chapter2