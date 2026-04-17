const tableBody = document.querySelector('tbody')
const yearDiv = document.querySelector('.yearDiv')

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

const year = 2026
const month = 4
const today = new Date().getDate()

let firstDay = (new Date(year, month).getDay())

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate()
}

const refreshCalendar = () => {
  let day = 1
  yearDiv.innerText = `${months[month].toLocaleUpperCase()}, ${year}`


  for (let rows = 0; rows < 6; rows++) {
    const row = document.createElement('tr')

    for (let cols = 0; cols < 7; cols++) {
      const cell = document.createElement('td')
      cell.style.cursor = 'pointer'
      if(rows === 0 && cols < firstDay) {
        cell.innerText = ''
      }
      else if( day <= getDaysInMonth(year, month)) {
        cell.innerText = day
        day++
      }
      else if(day > getDaysInMonth(year, month)) break

      else cell.innerText = ''

      if (day === today + 1) cell.classList.add('today')
        else cell.classList.add('otherDays')

      row.appendChild(cell)
    }
    
    tableBody.appendChild(row)

  }
}

refreshCalendar()



console.log(firstDay, today)

