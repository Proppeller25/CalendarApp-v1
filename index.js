const tableBody = document.querySelector('tbody')
const yearText = document.querySelector('.yearText')

const previousMonthButton = document.querySelector('.previousMonth')
const nextMonthButton = document.querySelector('.nextMonth')

const previousYearButton = document.querySelector('.previousYear')
const nextYearButton = document.querySelector('.nextYear')
const jumpToInput = document.querySelector('.jumpToInput')

const resetButton = document.querySelector('.resetButton')

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

let year = new Date().getFullYear()
let month = 3
const today = new Date().getDate()
const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

let firstDay = (new Date(year, month).getDay())

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate()
}



const refreshCalendar = () => {
  let day = 1
  yearText.innerText = `${months[month].toLocaleUpperCase()}, ${year}`


  for (let rows = 0; rows < 6; rows++) {
    const row = document.createElement('tr')

    for (let cols = 0; cols < 7; cols++) {
      const cell = document.createElement('td')
      const div = document.createElement('div')
      div.classList.add('cell')
      cell.appendChild(div)

      cell.style.cursor = 'pointer'
      if(rows === 0 && cols < firstDay) {
        div.innerText = ''
      }
      else if( day <= getDaysInMonth(year, month)) {
        div.innerText = day
        day++
      }
      else if(day > getDaysInMonth(year, month)) break

      else div.innerText = ''

      if ((day === today + 1 && months[month] === months[currentMonth]) && year === new Date().getFullYear()) div.classList.add('today')
        else div.classList.add('otherDays')

      row.appendChild(cell)
    }
    
    tableBody.appendChild(row)

  }

  ///disable buttons when month is january or december

  nextMonthButton.disabled = month >= months.length - 1
  if(nextMonthButton.disabled) nextMonthButton.style.cursor = 'not-allowed'
  else nextMonthButton.style.cursor = 'pointer'
  
  previousMonthButton.disabled = month === 0
  if(previousMonthButton.disabled) previousMonthButton.style.cursor = 'not-allowed'
  else previousMonthButton.style.cursor = 'pointer'

  // nextMonthButton.textContent = ''
  // previousMonthButton.textContent = ''
  // nextYearButton.textContent = ''
  // previousYearButton.textContent = ''
  nextMonthButton.textContent = months[month < months.length - 1 ? month + 1 : 11]
  previousMonthButton.textContent = months[month > 0 ? month - 1 : 0]

  previousYearButton.textContent = year - 1
  nextYearButton.textContent = year + 1

  if (year !== currentYear || month !== currentMonth) {
    resetButton.style.display = 'block'
  } else {
    resetButton.style.display = 'none'
  }

}

refreshCalendar()

jumpToInput.addEventListener('change', (e) => {
  const [inputYear, inputMonth] = e.target.value.split('-')
  year = Number(inputYear)
  month = Number(inputMonth) - 1
  firstDay = (new Date(year, month).getDay())
  tableBody.innerHTML = ''
  refreshCalendar()
})


previousMonthButton.addEventListener('click', (e) => {
  if(month > 0) {
    month--
    tableBody.innerHTML = ''
    refreshCalendar()
  }
})

nextMonthButton.addEventListener('click', (e) => {
  if(month < months.length - 1) {
    month++
    tableBody.innerHTML = ''
    refreshCalendar()
  }
})

previousYearButton.addEventListener('click', (e) => {
  year--
  firstDay = (new Date(year, month).getDay())
  tableBody.innerHTML = ''
  refreshCalendar()
})

nextYearButton.addEventListener('click', (e) => {
  year++
  firstDay = (new Date(year, month).getDay())
  tableBody.innerHTML = ''
  refreshCalendar()
})

resetButton.addEventListener('click', (e) => {
  year = currentYear
  month = currentMonth
  firstDay = (new Date(year, month).getDay())
  tableBody.innerHTML = ''
  refreshCalendar()
})
