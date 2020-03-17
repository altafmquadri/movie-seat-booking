const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

let ticketPrice = +movieSelect.value

//Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
    window.localStorage.setItem('selectedMovieIndex', movieIndex)
    window.localStorage.setItem('selectedMoviePrice', moviePrice)
}

//Update total and count
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount = selectedSeats.length
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice

    const seatsIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat)
    })

    window.localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
}

//Get data from localstorage and populate UI

function populateUI() {
    const selectedSeats = JSON.parse(window.localStorage.getItem('selectedSeats'))
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }
    const selectedMovieIndex = window.localStorage.getItem('selectedMovieIndex')
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

//Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})

//Seat click event
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        updateSelectedCount()
    }
})

//Initial count and total set
updateSelectedCount()

