import * as d3 from 'd3';
import ChartModel from "../models/ChartModel";

const DIAMETER = 150;
const CHART_THICKNESS = 7;
const CHART_TYPE_TEXT_COLOR = "#b0b0b0";
const TOTAL_VALUE_TEXT_COLOR = "#6c6c6c";

export default class Chart {

    /**
     * Chart model constructor
     * @param {ChartModel} chartModel
     */
    constructor(chartModel) {
        this.chartModel = chartModel;
        this.chartType = this.chartModel.getType();

        this._drawDoughnut();
        this._drawLegend();
    }

    /**
     *
     * @returns {Chart}
     */
    _drawDoughnut() {
        const dataByDevice = this.chartModel.getDataByDevice();
        const colors = this.chartModel.getColors();
        const radius = Math.min(DIAMETER, DIAMETER) / 2;

        const svg = d3.select("#" + this.chartType)
            .append("svg")
            .attr("width", DIAMETER)
            .attr("height", DIAMETER)
            .attr("class", "doughnut")
            .append("g")
            .attr("transform", "translate(" + DIAMETER / 2 + "," + DIAMETER / 2 + ")");

        const color = d3.scaleOrdinal()
            .domain(dataByDevice)
            .range(colors);

        const pie = d3.pie().value(function(d) {return d.value; });
        const data_ready = pie(d3.entries(dataByDevice));

        svg
            .selectAll(this.chartType)
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(radius - CHART_THICKNESS)
                .outerRadius(radius)
            )
            .attr('fill', function(d){ return(color(d.data.key)) });

        this._addChartTypeText();
        this._addTotalValueText();
    }

    _addChartTypeText() {
        d3.select("#" + this.chartType).select("svg").append("text")
            .text(this.chartType.toUpperCase())
            .attr("class", "chart-type")
            .attr("fill", CHART_TYPE_TEXT_COLOR);
    }

    _addTotalValueText() {
        const totalAmount = this.chartModel.getTotalAmount();
        const symbol = this.chartModel.getDataSymbol();
        const formattedAmount = totalAmount.toLocaleString();
        d3.select("#" + this.chartType).select("svg").append("text")
            .text(formattedAmount + symbol)
            .attr("class", "chart-total-amount")
            .attr("fill", TOTAL_VALUE_TEXT_COLOR);
    }

    /**
     * Draw the legend for the chart
     * @private
     */
    _drawLegend() {
        const dataByDevice = this.chartModel.getDataByDevice();
        const colors = this.chartModel.getColors();
        const percentageByDevice = this.chartModel.getPercentageByDevice();
        const symbol = this.chartModel.getDataSymbol();

        const legend = d3.select("#" + this.chartType)
            .append("div")
            .attr("class","legend");

        //TODO: create dynamically each part of the legend based on {dataByDevice} with .data() and .each()
        Object.keys(dataByDevice).forEach( (device, index) => {
            const color = colors[index];

            //First div for the title device
            legend
                .append("div")
                .attr("class", `legend-column ${device} title`)
                .text(device.charAt(0).toUpperCase() + device.slice(1))
                .style("color", color);

            // Add a wrap for percentage and amount columns
            const legendColumn = legend
                .append("div")
                .attr("class", `legend-column ${device}`)
                .style("grid-row", 2)
                .style("display", "flex");

            legendColumn.append("div")
                .attr("class", "percentage")
                .text(percentageByDevice[device] + "%");

            legendColumn.append("div")
                .attr("class", "amount")
                .text(dataByDevice[device].toLocaleString() + symbol);
        });
    }
}