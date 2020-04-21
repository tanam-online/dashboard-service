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
