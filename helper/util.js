var pool = require('../db/config')

exports.getSensorData = async (recipient) => {
  const client = await pool.connect()
  const result = await client.query('SELECT * FROM pengguna;')
  client.release()
  return result
}

exports.calculateAverage = async (data) => {
  const client = await pool.connect()
  const result = await client.query('SELECT * FROM pengguna;')
  client.release()
  return result
}

exports.timeParser = async (time) => {

}
