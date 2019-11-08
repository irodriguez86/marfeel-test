import 'main.css';
import API from 'api/index';
import Chart from "./components/Chart";

// Draw charts
new Chart(API.getRevenueModel());
new Chart(API.getImpressionsModel());
new Chart(API.getVisitsModel());
