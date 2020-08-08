const mostNewDeaths = $('#most-new-deaths')
const mostNewCases = $('#most-new-cases')
const summaryUpdate = $('.summary-update')

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

function countUp(id, number) {
  const countAnimation = new CountUp(id, 0, number, 0, 1)
  countAnimation.start()
}

// Get and set data
fetch('https://api.covid19api.com/summary')
.then(res => res.json())
.then(res => {
  countUp('total-confirmed', res.Global.TotalConfirmed)
  countUp('total-deaths', res.Global.TotalDeaths)
  countUp('total-recovered', res.Global.TotalRecovered)
  countUp('new-confirmed', res.Global.NewConfirmed)
  countUp('new-deaths', res.Global.NewDeaths)
  countUp('new-recovered', res.Global.NewRecovered)
  const countries = res.Countries
  countries.sort(compareCases)
  setMostNewCases(countries, 5)
  countries.sort(compareDeaths)
  setMostNewDeaths(countries, 5)
})
.catch(err => {
  console.log(err)
})

// Set last updated time
const now = new Date(Date.now())
summaryUpdate.text(`Last updated ${now.toDateString()}`)