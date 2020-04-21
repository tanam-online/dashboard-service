var pool = require('../db/config')
var format = 'dd-mm-yyyy'

exports.getSensorData = async (landId, timeStart, timeEnd) => {
  const client = await pool.connect()
  const result = await client.query(`SELECT * FROM data_sensor WHERE id_lahan = $1 AND waktu >= to_timestamp($2, $4)
                                     AND waktu <= to_timestamp($3, $4);`, [landId, timeStart, timeEnd, format])
  client.release()
  return result
}

exports.calculateAverage = async (data) => {

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
