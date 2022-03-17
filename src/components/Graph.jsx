import React, { useState } from "react";
import styles from './Graph.module.css'
import Select from 'react-select';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const options = [{
  value: 'temp', label: "Temperature"
},
{value: 'humidity', label: "Humidity"},
{value: 'both', label: "Both"}];

const Graph = (props) => {
  const [graphForm, setGraphForm] = useState('temp');
  const graphData = props.data.forecast.forecastday[0].hour;
  const locationName = props.data.location.name;
  const locationCountry = props.data.location.country;
  const date = props.data.location.localtime;
  const currentTemp = props.data.current['temp_c'] + "°C";
  const data = graphData?.map((elem) => {
    const date = new Date(elem.time);
    const formattedDate = date.getHours() + ":" + "00" ;
    return {
      name: formattedDate,
      temp: elem.temp_c,
      humidity: elem.humidity
    }
  });
  return <>
  <h3 className={styles.h3}>Weather data for {locationName}, {locationCountry} - Local time: {date} - Current Temp: {currentTemp}</h3>
  <LineChart width={props.size < 600 ? 300 : 500} height={300} data={data} className={styles.chart}>
    <CartesianGrid stroke="#ccc" />
  {graphForm === 'temp' && <Line type="monotone" dataKey='temp' stroke="#8884d8" />}
  {graphForm === 'humidity' && <Line type="monotone" dataKey='humidity' stroke="#8884d8" />}
  {graphForm === 'both' && <><Line type="monotone" dataKey="humidity" stroke="#82ca9d" /> <Line type="monotone" dataKey="temp" stroke="#8884d8" /></>}
  <XAxis dataKey="name" />
  <Tooltip />
  <YAxis />
  </LineChart>
  <div className={styles.form}>
  <form>
  <label className={styles.label} htmlFor="format">Format Graph</label>
  <Select inputId="format" aria-label="Set graph data to temp, humidity or both" options={options} defaultValue={options.filter(elem => elem.value === graphForm)} className={styles.select} onChange={(e) => {setGraphForm(e.value)}}/>
  </form>
  </div>
  </>
};

export default Graph;