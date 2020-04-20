var express = require('express')
var router = express.Router()
var Util = require('../helper/util')

/*
 * Get data for real-time monitoring
 */
router.get('/real-time/:id/:land/:timeStart/:timeEnd', (req, res) => {
  // timeEnd max today
  Util.timeParser()
  Util.getSensorData()
  Util.calculateAverage()
  res.send('real-time')
})

/*
 * Get data for prediction of land conditions
 */
router.get('/prediction/:id/:land/:timeStart/:timeEnd', (req, res) => {
  // timeStart min today, timeEnd max 5 years
  Util.timeParser()
  Util.getSensorData()
  // request.post getPredictionML()
  res.send('prediction')
})

/*
 * Get recommendation for certain land
 */
router.get('/recommendation/:id/:land', (req, res) => {
  Util.getSensorData()
  // request.post getRecommendationML()
  res.send('recommendation')
})

module.exports = router
