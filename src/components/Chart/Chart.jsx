import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2'

import style from './Chart.module.css';

const Chart = ({ data:{confirmed,deaths,recoverd}, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        //console.log("dailyData",dailyData);
        fetchAPI();
    },[]);


    const lineChart = (
        dailyData.length ?
            (<Line data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'rgba(255,0,0,0.5)',
                    fill: true,
                }]
            }} />) : null
    );

    console.log(confirmed,recoverd,deaths)

    const barChart = (confirmed) ? (<Bar
        data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [{
                label: 'People',
                backgroundColor: ['rgba(0,0,255,0.5)',
                    'rgba(0,255,0,0.5)',
                    'rgba(255,0,0,0.5)',],
                    data:[ confirmed.value,recoverd.value,deaths.value]
            }]
        }}
        options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` }
        }}

    />) : null



    return (
        <div className={style.container}>
        {country ? barChart:lineChart}
        </div>
    )
}

export default Chart;