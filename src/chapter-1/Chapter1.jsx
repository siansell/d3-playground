import { useEffect } from "react";
import * as d3 from "d3";

function App() {
  // useEffect(() => {
  //   d3.selectAll("div")
  //   .append("p")
  //     .attr("class", "my-class")
  //     .text("Wow")
  //   .append("span")
  //     .text("Even More Wow")
  //     .style("font-weight", "900");
  // }, [])

  return (
      <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
        <svg viewBox="0 0 900 300" style={{ border: "1px solid black" }}>
          <line x1="50" y1="45" x2="140" y2="225" stroke="black" strokeWidth={3} />
          <rect x="260" y="25" width="120" height="60" fill="#6ba5d7" />
          <rect x="260" y="100" width="120" height="60" rx="20" ry="20" fill="#6ba5d7" />

          <g transform="translate(260, 175)">
            <rect x="0" y="0" width="60" height="60" fill="transparent" stroke="#6ba5d7" />
            <text x="0" y="85">rect</text>
          </g>

          <circle cx="530" cy="80" r="50" fill="none" stroke="#81c21c" strokeWidth="3" />

          <ellipse cx="530" cy="205" rx="50" ry="30" fill="#81c21c" />
              
          <path d="M680 150 C 710 80, 725 80, 755 150 S 810 220, 840 150" fill="none" stroke="#773b9a" strokeWidth="3" />

          <g fill="#636466" style={{ fontSize: 16, fontFamily: "monospace" }}>
            <text x="60" y="260">line</text>
            <text x="530" y="155" style={{ textAnchor: "middle" }}>circle</text>
            <text x="530" y="260" style={{ textAnchor: "middle" }}>ellipse</text>
            <text x="730" y="260">path</text>
          </g>
         </svg>
    </div>
  )
}

export default App
