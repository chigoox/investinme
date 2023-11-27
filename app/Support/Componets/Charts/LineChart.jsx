// LineChartComponent.js
import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import { ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from 'react-chartjs-2';
import { getRand } from '../../myCodes/Util';
import { Button } from '@nextui-org/react';

const LineChart = ({ data, lable }) => {

    const week = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN',]
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const year = ['JAN', 'FEB', 'MAR', 'APL', 'MAY', 'JUN', 'JUL', 'AUG', 'SPT', 'OCT', 'NOV', 'DEC']
    const [chartView, setChartView] = useState(false)
    Chart.register(ArcElement, Tooltip, Legend);

    const options = {
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    };
    return (<div className='center-col'>
        <Line
            datasetIdKey='id'
            options={{
                animations: {
                    tension: {
                        duration: 3000,
                        easing: 'easIn',
                        from: 0.35,
                        to: 0.3,
                        loop: true
                    },
                    fill: {
                        duration: 1000,
                        easing: 'easeInOutBounce',
                        from: true,
                        to: false,
                        loop: true
                    }
                }
            }}
            data={{
                labels: lable,
                datasets: [
                    {
                        id: 1,
                        data: data.map(i => i / 100),
                        label: 'Balance',
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: 'black',
                        borderColor: 'purple',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'round',
                        pointBorderColor: 'white',
                        pointBackgroundColor: 'green',
                        pointBorderWidth: 5,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'purple',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                    },

                ],
            }}
        />
        <div className='center gap-2 '>
            <Button onPress={() => { setChartView(week) }} className='h-6 bg-black-800 text-white'>Week</Button>
            <Button onPress={() => { setChartView(month) }} className='h-6 bg-black-800 text-white'>Month</Button>
            <Button onPress={() => { setChartView(year) }} className='h-6 bg-black-800 text-white'>Year</Button>
        </div>
    </div>)
};

export default LineChart;


