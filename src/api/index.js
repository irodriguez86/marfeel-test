import RevenueData from '../models/data/revenue';
import ImpressionsData from '../models/data/impressions';
import VisitsData from '../models/data/visits';
import ChartModel from "../models/ChartModel";

export default class API {
    /**
     * Chart model filled with revenue data
     * @returns {ChartModel}
     */
    static getRevenueModel() {
        return new ChartModel(RevenueData);
    }

    /**
     * Chart model filled with impressions data
     * @returns {ChartModel}
     */
    static getImpressionsModel() {
        return new ChartModel(ImpressionsData);
    }

    /**
     * Chart model filled with visits data
     * @returns {ChartModel}
     */
    static getVisitsModel() {
        return new ChartModel(VisitsData);
    }
}