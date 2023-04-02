const consola = require('consola')
const Period = require('../../models/period.model')

const savePeriods = async (connection) => {
  const [rows] = await connection.query(
    'SELECT actual, nombre, anyo FROM periodo ORDER BY anyo'
  )

  const grouped = rows.reduce((accumulator, currentValue) => {
    const year = currentValue.anyo
    const currentValueGrouped = accumulator.find((item) => item.year === year)
    if (currentValueGrouped) {
      currentValueGrouped.data.push(currentValue)
    } else {
      accumulator.push({ year, data: [currentValue] })
    }
    return accumulator
  }, [])

  const transformedData = grouped.map(({ year, data }) => {
    const actualIndex = data.findIndex(item => item.actual === 1)
    const actual = actualIndex !== -1 ? actualIndex : -1
    const newData = data.map(({ nombre }) => nombre)
    return { year, data: newData, actual }
  })

  const periods = transformedData.map((item) => {
    return {
      año: item.year,
      nombres: item.data,
      actual: item.actual
    }
  })

  const savedPeriods = await Promise.all(
    periods.map(async (period) => {
      const tempPeriod = new Period(period)
      return await tempPeriod.save()
    })
  )

  if (savedPeriods) {
    consola.success('Periodos registrados')
  }
}

module.exports = savePeriods
