import React from "react"

import StackedBarChart from "./StackedBarChart";
import data from "./data"

import "./dashboard.css"



const Dashboard = () => {
    return (
        <>
            <h1>hubl Dashboard</h1>
            <hr />
            <p>TODO dashboard level settings filters etc</p>
            <hr />
            <div style={{ display: 'flex' }}>
                <StackedBarChart data={data} chartId="chart1" />
                <StackedBarChart data={data} chartId="chart2" />
            </div>
        </>
    )
}

export default Dashboard