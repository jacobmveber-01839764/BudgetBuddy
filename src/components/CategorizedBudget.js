import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, defaults } from 'chart.js';

import { AppProvider } from "../context/AppContext";
import  { useState, useEffect } from 'react'
import { getSessionKey } from '../utils/utils.js'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategorizedBudget() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
      async function getChartData() {
        try {
          fetch('https://api.bb.gabefarrell.com/w/budget', {
            method: 'GET',
            headers: {
              'x-session-key' : 'b36efa01-7824-4f61-a274-63131b58d8fe',
            }
          })
          .then(response => response.json())
          .then(data => {
            if (data.status != 200) {
              console.log(data.error);
            } else {
              const chartData = {
                labels: [data.categories.length > 0 ? data.categories : "no expenses"],
                datasets: [
                  {
                    data: data.expenses_by_category.length > 0 
                      ? data.expenses_by_category.map(category => {
                          return category['whole']
                        })
                      : [1],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      "black"
                    ],
                    borderWidth: 1,
                  },
                ],
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