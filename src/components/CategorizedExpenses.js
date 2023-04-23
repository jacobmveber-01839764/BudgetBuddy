import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, defaults } from 'chart.js';

import { AppProvider } from "../context/AppContext";
import  { useState, useEffect } from 'react'
import { calculateValue, getSessionKey } from '../utils/utils.js'
import { Minimize } from "@material-ui/icons";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategorizedExpenses(props) {
    const [chartData, setChartData] = useState(null);
    


    useEffect(() => {
      async function getChartData() {
        try {
          fetch('https://api.bb.gabefarrell.com/w/budget', {
            method: 'GET',
            headers: {
              'x-session-key' : getSessionKey(),
            }
          })
          .then(response => response.json())
          .then(data => {
            if (data.status != 200) {
              console.log(data.error);
            } else {
              const chartData = {
                labels:  Object.keys(data.expenses_by_category).length > 0 ? Object.keys(data.expenses_by_category) : ["No income."],
                datasets: [{
                  data: Object.values(data.expenses_by_category).map((category) => {
                    return calculateValue(category);
                  }),
                  label: "Category",
                  backgroundColor: [ 
                    '#FFC857',
                    '#5C919B',
                    '#DB3A34',
                    '#F6A54F',
                    '#61B06E',
                    '#8166CC',
                    '#ED8146',
                    '#B0BC63',
                    '#5672C7',
                    '#E45E3D'
                  ],
                  borderColor: [
                    "white"
                  ],
                  borderWidth: 2,
                }],
              }
                          
              setChartData(chartData);
            }
          })
          .catch(error => {
            console.log(error);
          });
        } catch(error) {
          console.error(error);
        }
      }
      getChartData();
    }, []);

    if (!chartData) {
        return <p>Loading...</p>
    }

    return (
        <div className="widget">
            <h4>Expenses by Category</h4>
            <Doughnut className="w-100 h-auto" 
              data={chartData}
              options={{
                plugins: {
                  legend: {
                    position: 'right'
                  }
                },
                responsive: true
              }}
              />
        </div>
    )
}