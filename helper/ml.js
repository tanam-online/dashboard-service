var Util = require('./util')

exports.predict = (landId, time) => {
  const cuacaEnum = ['Cerah', 'Berawan', 'Hujan']
  const result = []
  for (let i = 0; i < 24; i += 2) {
    const data = {
      id_lahan: landId,
      suhu: Math.floor(Math.random() * 50), // C
      kelembaban: Math.floor(Math.random() * 100), // %
      cahaya: Math.floor(Math.random() * 5000) + 5000, // Cd/m2
      angin: Math.floor(Math.random() * 10), // m/s
      cuaca: cuacaEnum[Math.floor(Math.random() * 3)],
      waktu: i + ', ' + time
    }
    result.push(data)
  }
  return result
}

exports.recommend = async () => {
  const pesticideEnum = [
    'Fungisida',
    'Herbisida',
    'Insektisida',
    'Nematisida',
    'Rodentisida'
  ]
  const listEnum = [
    'Siram lahan selanjutnya pada ' + await Util.randomDatetime('near'),
    'Beri pupuk selanjutnya pada ' + await Util.randomDatetime('near'),
    'Beri pestisida selanjutnya pada ' + await Util.randomDatetime('medium') +
     ' dengan jenis pestisida ' + pesticideEnum[Math.floor(Math.random() * 6)],
    'Lahan siap panen pada ' + await Util.randomDatetime('far'),
    'Panen selanjutnya diprediksi sebanyak ' + (Math.random() * 10).toPrecision(4) + ' ton'
    // 'Untuk musim selanjutnya, direkomendasikan menanam tanaman'
  ]
  return listEnum
}
