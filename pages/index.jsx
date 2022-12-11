import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Data from '../components/data';
import Swal from 'sweetalert2'

import alerta from '../public/alert.mp3'

import temperatureImage from '../public/temperatura.png'
import humidityImage from '../public/humedad.png'

export default function Home() {

  const ipv4 = ""

  const [audio, setAudio] = useState(null)
  const [alertTemperature, setAlertTemperature] = useState()
  const [alertHumidity, setAletHumidity] = useState()
  const [dataArduino, setdataArduino] = useState({
    temperature: 0,
    humidity: 0
  })

  const playAudio = () => {
    audio.play()
    audio.loop = true
  }

  useEffect(() => {
    getData()
    intervalGet()
    setAudio(new Audio(alerta))
  }, [])

  useEffect(() => {
    checkData(dataArduino)
  }, [dataArduino])

  const intervalGet = () => {
    setInterval(function () {
      getData()
    }, 12000)
  }

  const getData = () => {
    fetch('http://' + ipv4 + ':8000/data')
      .then(res => res.json())
      .then(data => {
        setdataArduino(data)
      })
  }

  const checkData = (dataArduino) => {

    dataArduino.temperature > alertTemperature
      ? (
        playAudio(),
        Swal.fire({
          title: 'Alerta!',
          text: 'La temperatura alcanzo el valor deseado',
          icon: 'warning',
          confirmButtonText: 'Ok',
        })
          .then(res => {
            res.isConfirmed ? audio.pause() : null
          })
      )
      : (null)

    dataArduino.humidity > alertHumidity
      ? (
        playAudio(),
        Swal.fire({
          title: 'Alerta!',
          text: 'La humedad alcanzo el valor deseado',
          icon: 'warning',
          confirmButtonText: 'Ok',
        })
          .then(res => {
            res.isConfirmed ? audio.pause() : null
          })
      )
      : (null)
  }

  return (
    <div className={styles.container}>

      <Head>
        <title>Arduino</title>
        <meta name="description" content="Teoría de control" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <div>
          <h1>Teoria de control - Arduino</h1>
        </div>

        <Data
          image={temperatureImage}
          title="Temperatura"
          data={dataArduino.temperature + " °C"}
          path='/temperature'
          style='data_container--temperature'
          setLimit={setAlertTemperature} />

        <Data
          image={humidityImage}
          title="Humedad"
          data={dataArduino.humidity + " %"}
          path='/humidity'
          style='data_container--humidity'
          setLimit={setAletHumidity} />

      </main>

    </div>
  )
}
