var pool = require('../db/config')
var format = 'dd-mm-yyyy'

exports.getSensorData = async (landId, timeStart, timeEnd) => {
  const client = await pool.connect()
  const result = await client.query(`SELECT * FROM data_sensor WHERE id_lahan = $1 AND waktu >= to_timestamp($2, $4)
                                     AND waktu <= to_timestamp($3, $4);`, [landId, timeStart, timeEnd, format])
  client.release()
  return result
}

exports.calculateAverage = (data) => {
  const temp = {
    temperature: 0,
    humidity: 0,
    light: 0,
    wind: 0,
    sunny: 0,
    cloudy: 0,
    rain: 0
  }
  data.map(item => {
    temp.temperature += item.suhu
    temp.humidity += item.kelembaban
    temp.light += item.cahaya
    temp.wind += item.angin
    if (item.cuaca === 'Cerah') {
      temp.sunny++
    } else if (item.cuaca === 'Berawan') {
      temp.cloudy++
    } else if (item.cuaca === 'Hujan') {
      temp.rain++
    }
  })
  const result = {
    suhu: temp.temperature / data.length,
    kelembaban: temp.humidity / data.length,
    cahaya: temp.light / data.length,
    angin: temp.wind / data.length,
    cuaca: null
  }
  if (temp.sunny >= temp.cloudy && temp.sunny >= temp.rain) {
    result.cuaca = 'Cerah'
  } else if (temp.cloudy >= temp.sunny && temp.cloudy >= temp.rain) {
    result.cuaca = 'Berawan'
  } else if (temp.rain >= temp.sunny && temp.rain >= temp.cloudy) {
    result.cuaca = 'Hujan'
  }
  return result
}

exports.compareTime = async (time1, time2) => {
  const client = await pool.connect()
  const result = await client.query('SELECT to_timestamp($1, $3) > to_timestamp($2, $3);', [time1, time2, format])
  client.release()
  return result
}

exports.createTime = (time) => {
  const timeObject = new Date(time)
  const date = ('0' + timeObject.getDate()).slice(-2)
  const month = ('0' + (timeObject.getMonth() + 1)).slice(-2)
  const year = timeObject.getFullYear()
  return date + '-' + month + '-' + year
}
