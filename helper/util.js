var pool = require('../db/config')
var format = 'dd-mm-yyyy'

exports.getSensorData = async (landId, timeStart, timeEnd) => {
  const client = await pool.connect()
  const newFormat = format + ' hh24:mi:ss'
  const dayStart = parseInt(timeStart.slice(0, 2), 10)
  if (dayStart > 1) {
    timeStart = ('0' + (dayStart - 1).toString()).slice(-2) + timeStart.slice(2) + ' 17:00:00'
  } else {
    timeStart = '30' + timeStart.slice(2) + ' 17:00:00'
  }
  timeEnd += ' 16:59:59'
  const result = await client.query(`SELECT * FROM data_sensor WHERE id_lahan = $1 AND waktu >= to_timestamp($2, $4)
                                     AND waktu < to_timestamp($3, $4);`, [landId, timeStart, timeEnd, newFormat])
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
    suhu: (temp.temperature / data.length).toPrecision(4),
    kelembaban: (temp.humidity / data.length).toPrecision(4),
    cahaya: (temp.light / data.length).toPrecision(6),
    angin: (temp.wind / data.length).toPrecision(4),
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
  console.log('time1 = ', time1, '; time2 = ', time2)
  const result = await client.query('SELECT to_timestamp($1, $3) >= to_timestamp($2, $3);', [time1, time2, format])
  client.release()
  return result
}

exports.createDate = (time) => {
  const timeObject = new Date(time)
  const date = ('0' + timeObject.getDate()).slice(-2)
  const month = ('0' + (timeObject.getMonth() + 1)).slice(-2)
  const year = timeObject.getFullYear()
  return date + '-' + month + '-' + year
}

exports.createTime = (time) => {
  const timeObject = new Date(time)
  const date = ('0' + timeObject.getDate()).slice(-2)
  const month = ('0' + (timeObject.getMonth() + 1)).slice(-2)
  const year = timeObject.getFullYear()
  const hour = ('0' + timeObject.getHours()).slice(-2)
  const minute = ('0' + timeObject.getMinutes()).slice(-2)
  const second = ('0' + timeObject.getSeconds()).slice(-2)
  return date + '-' + month + '-' + year + ' pada waktu ' + hour + ':' + minute + ':' + second
}

exports.randomDate = (start, end) => {
  return this.createDate(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

exports.randomTime = (start, end) => {
  return this.createTime(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

exports.randomDatetime = async (distance) => {
  const monthEnum = [
    'Januari', 'Februari', 'Maret', 'April',
    'Mei', 'Juni', 'Juli', 'Agustus',
    'September', 'Oktober', 'November', 'Desember'
  ]
  let date, month, year
  if (distance === 'near') {
    date = Math.floor(Math.random() * 1) + new Date().getDate()
    month = monthEnum[new Date().getMonth()]
    year = new Date().getFullYear()
  } else if (distance === 'medium') {
    date = Math.floor(Math.random() * 5) + new Date().getDate()
    month = monthEnum[(Math.floor(Math.random() * 3) + new Date().getMonth()) % 12]
    year = new Date().getFullYear()
  } else if (distance === 'far') {
    date = Math.floor(Math.random() * 28)
    month = monthEnum[Math.floor(Math.random() * 11) + 1]
    year = Math.floor(Math.random() * 2) + new Date().getFullYear()
  }
  const hour = ('0' + Math.floor(Math.random() * 24)).slice(-2)
  const minute = ('0' + Math.floor(Math.random() * 60)).slice(-2)
  const second = ('0' + Math.floor(Math.random() * 60)).slice(-2)
  return date + ' ' + month + ' ' + year + ' pada waktu ' + hour + ':' + minute + ':' + second
}
