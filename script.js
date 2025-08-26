let use24h = true;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  let ampm = "";

  if (!use24h) {
    ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert to 12h format
  }

  hours = String(hours).padStart(2, "0");

  setDigit("hours", hours);
  setDigit("minutes", minutes);
  setDigit("seconds", seconds);
  document.getElementById("ampm").textContent = use24h ? "" : ampm;

  updateDate(now);
  updateBackground(now.getHours());
}

function setDigit(id, newValue) {
  const el = document.getElementById(id);

  if (el.textContent !== newValue) {
    el.setAttribute("data-prev", el.textContent);
    el.textContent = newValue;

    el.classList.remove("flip");
    void el.offsetWidth; // restart animation
    el.classList.add("flip");
  }
}

function updateDate(now) {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const dateStr = now.toLocaleDateString(undefined, options);
  document.getElementById("dateDisplay").textContent = dateStr;
}

function updateBackground(hour) {
  document.body.classList.remove("morning", "afternoon", "evening", "night");

  if (hour >= 6 && hour < 12) {
    document.body.classList.add("morning");
  } else if (hour >= 12 && hour < 18) {
    document.body.classList.add("afternoon");
  } else if (hour >= 18 && hour < 21) {
    document.body.classList.add("evening");
  } else {
    document.body.classList.add("night");
  }
}

setInterval(updateClock, 1000);
updateClock();

// Toggle light/dark theme manually
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Toggle 12h / 24h format
document.getElementById("toggleFormat").addEventListener("click", () => {
  use24h = !use24h;
  updateClock();
});