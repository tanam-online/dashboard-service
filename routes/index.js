var express = require('express')
var router = express.Router()
var Util = require('../helper/util')
var ML = require('../helper/ml')

/*
 * Check if API is live.
 */
router.get('/', (req, res) => {
  res.send('You are connected')
})

/*
 * Get data for real-time monitoring
 * Constraint: Min timeStart = lahan(created_at), Max timeEnd = today, format = dd-mm-yyyy
 */
router.get('/real-time/:landId/:timeStart?/:timeEnd?', async (req, res) => {
  try {
    if (!req.params.landId) {
      return res.status(400).send({ status: 400, message: 'No landId provided' })
    }
    const timeStart = req.params.timeStart ? req.params.timeStart : Util.createDate(Date.now())
    const timeEnd = req.params.timeEnd ? req.params.timeEnd : Util.createDate(Date.now() + (1 * 24 * 60 * 60 * 1000))
    const isInvalidTime = (await Util.compareTime(timeStart, timeEnd)).rows[0]['?column?']
    if (isInvalidTime) {
      return res.status(400).send({ status: 400, message: 'Time start must not exceed time end' })
    }
    const responseData = await Util.getSensorData(parseInt(req.params.landId), timeStart, timeEnd)
    const data = responseData ? responseData.rows : null
    if (!data || data.length === 0) {
      return res.status(400).send({ status: 400, message: 'Data is empty' })
    }
    const responseAverage = await Util.calculateAverage(data)
    const average = responseAverage || null
    const results = {
      status: 'Successfully get real-time data',
      data: {
        average: average,
        sensor_data: data
      }
    }
    res.send(results)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

/*
 * Get data for prediction of land conditions
 * Constraint: time is dd-mm-yyyy
 */
router.get('/prediction/:landId/:time', async (req, res) => {
  try {
    if (!req.params.landId || !req.params.time) {
      return res.status(400).send({ status: 400, message: 'No landId or time provided' })
    }
    const predictedData = await ML.predict(parseInt(req.params.landId), req.params.time)
    const responseAverage = await Util.calculateAverage(predictedData)
    const average = responseAverage || null
    const results = {
      status: 'Successfully get predicted data',
      data: {
        average: average,
        sensor_data: predictedData
      }
    }
    res.send(results)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

/*
 * Get recommendation for certain land
 */
router.get('/recommendation/:landId', async (req, res) => {
  try {
    if (!req.params.landId) {
      return res.status(400).send({ status: 400, message: 'No landId provided' })
    }
    const recommendationList = await ML.recommend()
    const results = {
      status: 'Successfully get recommendation list',
      data: recommendationList
    }
    res.send(results)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err)
  }
})

module.exports = router
