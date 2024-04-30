import MyPortfolioTable from "../portfolio/MyPortfolioTable.js";
import React from "react";

function Portfolio() {
    return (
        <div className="portfolio-content">
            <div className="header"></div>
            <div className="body"></div>
            <MyPortfolioTable/>
        </div>
    );
}

export default Portfolio;