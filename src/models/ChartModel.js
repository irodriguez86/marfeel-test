export const COLORS = {
    "revenue": ["#67c562","#005c22"],
    "impressions": ["#4a84b2","#003e88"],
    "visits": ["#dfc136","#7d4e1c"]
};

export default class ChartModel {
    /**
     * Chart model class constructor
     * @param data - json data with all the chart information
     */
    constructor(data) {
        this.type = data.type;
        this.byDevice = data.byDevice;
        this.byMonth = data.byMonth;
        this.symbol = data.symbol;
    }

    /**
     * Return the chart type
     * @returns {*}
     */
    getType() {
        return this.type;
    }

    /**
     * Get chart info by device
     * @returns {*}
     */
    getDataByDevice() {
        return this.byDevice;
    }

    getDataSymbol() {
        return this.symbol;
    }

    getTotalAmount() {
        return Object.values(this.byDevice).reduce((a, b) => a + b, 0);
    }

    getColors() {
        return COLORS[this.type];
    }
}