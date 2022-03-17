import { useWeatherApp } from './hooks/useWeatherApp';
import styles from './App.module.css';
import { useEffect, useState } from 'react';
import Header from './components/layout/Header';
import Loading from './components/Loading';
import Error from './components/Error';
import Select from 'react-select'
import Graph from './components/Graph';

const options = [
  {value: 'sydney', label: 'Sydney'},
  {value: 'warsaw', label: 'Warsaw'}, 
  {value: 'Hongkong', label: 'Hong Kong'} ];

function App() {
  const [currentCity, setCurrentCity] = useState("Sydney");
  const [weather, error, isLoading] = useWeatherApp(currentCity);
  const [currentWidth, setCurrentWidth] =  useState(null);
  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [])
  return (
    <>
    <Header />
    <div className={styles.container}>
    {!error && 
    <form className={styles.form}>
    <label htmlFor="city" className={styles.label}>Select City</label>
    <Select inputId="city" options={options} defaultValue={options.filter(elem => elem.label === currentCity)} className={styles.select} onChange={(e) => {setCurrentCity(e.label)}}/>
    </form>
    }
      {isLoading && <Loading />}
      {error && <Error />}
      {weather && <Graph data={weather} size={currentWidth}/>}
    </div>
    </>
  );
}

export default App;
