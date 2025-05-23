const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentDate = new Date();

function loadCalendar(date) {
  calendar.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${date.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div class="date-cell"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isToday = fullDate === new Date().toISOString().split("T")[0];
    const dateCell = document.createElement("div");
    dateCell.className = "date-cell" + (isToday ? " today" : "");
    dateCell.innerHTML = `<strong>${day}</strong>`;
    dateCell.setAttribute("data-date", fullDate);
    calendar.appendChild(dateCell);
  }

  loadEvents();
}

function loadEvents() {
  fetch("events.json")
    .then((response) => response.json())
    .then((events) => {
      events.forEach((event) => {
        const cell = document.querySelector(`[data-date="${event.date}"]`);
        if (cell) {
          const eventDiv = document.createElement("div");
          eventDiv.className = "event";
          eventDiv.textContent = `${event.title} @ ${event.time}`;
          cell.appendChild(eventDiv);
        }
      });
    });
}

prevMonthBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  loadCalendar(currentDate);
};

nextMonthBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  loadCalendar(currentDate);
};

loadCalendar(currentDate);