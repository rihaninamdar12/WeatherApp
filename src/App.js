import './App.css';
import React from 'react'
import Weather from './Components/Weather';

const App = () => {

  const getDate = () => {
    setInterval(() => {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let div = document.getElementsByClassName('time')[0]
      div.innerHTML = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`
    }, 1000)
  }

  let d=new Date();
  let hour=d.getHours();
  let date=d.getUTCDate()
  let month=d.getUTCMonth()+1
  let year=d.getUTCFullYear();

  return (
    <>
      <Weather get_date={getDate} date={date} month={month} year={year} hour={hour}/>
    </>
  );
}

export default App;


