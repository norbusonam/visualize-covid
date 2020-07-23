const totalConfirmed = $('#total-confirmed')
const totalDeaths = $('#total-deaths')
const totalRecovered = $('#total-recovered')
const newConfirmed = $('#new-confirmed')
const newDeaths = $('#new-deaths')
const newRecovered = $('#new-recovered')

var countries = []

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function compareCases() {

}

function sortCountries(sortBy) {
  if (sortBy == "New Cases") {

  } else if (sortBy == 'New Deaths') {

  } else if (sortBy == "New Recoveries") {

  }
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
  countries = res.Countries
})
.catch(err => {
  console.log(err)
})

