const totalConfirmed = $('#total-confirmed')
const totalDeaths = $('#total-deaths')
const totalRecovered = $('#total-recovered')
const newConfirmed = $('#new-confirmed')
const newDeaths = $('#new-deaths')
const newRecovered = $('#new-recovered')
const mostNewDeaths = $('#most-new-deaths')
const mostNewCases = $('#most-new-cases')

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function compareCases(countryA, countryB) {
  return countryB.NewConfirmed - countryA.NewConfirmed
}

function compareDeaths(countryA, countryB) {
  return countryB.NewDeaths - countryA.NewDeaths
}

function setMostNewDeaths(countries, length) {
  const mostDeaths = countries.filter((country, i) => i < length)
  mostNewDeaths.children().each(function(i) {
    const countryLine = `${i + 1}. ${countries[i].Country}: ${numberWithCommas(mostDeaths[i].NewDeaths)} Deaths`
    $(this).text(countryLine)
  })
}

function setMostNewCases(countries, length) {
  const mostCases = countries.filter((country, i) => i < length)
  mostNewCases.children().each(function(i) {
    const countryLine = `${i + 1}. ${countries[i].Country}: ${numberWithCommas(mostCases[i].NewConfirmed)} Cases`
    $(this).text(countryLine)
  })
}

fetch('https://api.covid19api.com/summary')
.then(res => res.json())
.then(res => {
  totalConfirmed.text(numberWithCommas(res.Global.TotalConfirmed))
  totalDeaths.text(numberWithCommas(res.Global.TotalDeaths))
  totalRecovered.text(numberWithCommas(res.Global.TotalRecovered))
  newConfirmed.text(numberWithCommas(res.Global.NewConfirmed))
  newDeaths.text(numberWithCommas(res.Global.NewDeaths))
  newRecovered.text(numberWithCommas(res.Global.NewRecovered))
  const countries = res.Countries
  countries.sort(compareCases)
  setMostNewCases(countries, 5)
  countries.sort(compareDeaths)
  setMostNewDeaths(countries, 5)
})
.catch(err => {
  console.log(err)
})

