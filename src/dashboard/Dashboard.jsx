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
            <div className="dashboard-charts">
                <StackedBarChart data={data} chartId="chart1" chartTitle="Costs" />
                <StackedBarChart data={data} chartId="chart2" chartTitle="More costs" />
            </div>
        </>
    )
}

export default Dashboard
