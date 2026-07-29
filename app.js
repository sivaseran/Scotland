const STORAGE_KEY = "scotlandTripGithubV1";
const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => page.classList.remove("active-page"));
  document.getElementById(pageId).classList.add("active-page");
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.page === pageId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-btn").forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});
document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.go));
});
document.getElementById("printBtn").addEventListener("click", () => window.print());

function renderRoute() {
  document.getElementById("routeOverview").innerHTML = TRIP_DATA.routeOverview.map((stop) => `
    <div class="route-item">
      <div class="route-marker"></div>
      <div class="route-copy"><strong>${stop.name}</strong><span>${stop.detail}</span></div>
      <span class="route-badge">${stop.badge}</span>
    </div>
  `).join("");
}

function renderAccommodation() {
  const summary = TRIP_DATA.accommodation.map((place) => `
    <div class="accommodation-item"><strong>${place.nights}: ${place.location}</strong><span>${place.address}</span></div>
  `).join("");
  document.getElementById("accommodationSummary").innerHTML = summary;
  document.getElementById("accommodationDetails").innerHTML = TRIP_DATA.accommodation.map((place) => `
    <div class="accommodation-item">
      <strong>${place.nights} · ${place.location}</strong>
      <span>${place.address}</span>
      <span>Host: ${place.host || "To confirm"}</span>
      <span>Check-in: ${place.checkIn}</span>
      <span>Check-out: ${place.checkOut}</span>
    </div>
  `).join("");
}

function renderItinerary() {
  state.dayNotes = state.dayNotes || [];
  document.getElementById("itineraryList").innerHTML = TRIP_DATA.itinerary.map((day, index) => `
    <article class="day-card">
      <div class="day-head">
        <div><h3>${day.day}</h3><p>${day.title}</p></div>
        <a class="map-btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(day.stops[1] || day.title)}">Map</a>
      </div>
      <div class="stop-list">${day.stops.map((stop) => `<span class="stop-chip">${stop}</span>`).join("")}</div>
      <label for="day-note-${index}">Notes</label>
      <textarea id="day-note-${index}" data-day-note="${index}" placeholder="Add timing, parking or booking notes...">${state.dayNotes[index] || ""}</textarea>
    </article>
  `).join("");
  document.getElementById("itineraryList").addEventListener("input", (event) => {
    if (event.target.dataset.dayNote !== undefined) {
      state.dayNotes[Number(event.target.dataset.dayNote)] = event.target.value;
      save();
    }
  });
}

function renderFamilies() {
  state.families = state.families || [];
  const grid = document.getElementById("familyGrid");
  grid.innerHTML = Array.from({ length: 5 }, (_, index) => {
    const family = state.families[index] || {};
    return `
      <article class="family-card">
        <h3>Family ${index + 1}</h3>
        <label>Family name</label><input data-family="${index}" data-field="name" value="${family.name || ""}" placeholder="Family name" />
        <label>Starting postcode</label><input data-family="${index}" data-field="postcode" value="${family.postcode || ""}" placeholder="e.g. CB23" />
        <label>Driver</label><input data-family="${index}" data-field="driver" value="${family.driver || ""}" placeholder="Driver name" />
        <label>Vehicle</label><input data-family="${index}" data-field="vehicle" value="${family.vehicle || ""}" placeholder="Vehicle or registration" />
        <div class="button-row">
          <button class="primary-btn" data-route="out" data-index="${index}">To Knutsford</button>
          <button class="ghost-btn" data-route="home" data-index="${index}">Home from Tebay</button>
        </div>
      </article>`;
  }).join("");

  grid.addEventListener("input", (event) => {
    if (event.target.dataset.family === undefined) return;
    const index = Number(event.target.dataset.family);
    state.families[index] = state.families[index] || {};
    state.families[index][event.target.dataset.field] = event.target.value;
    save();
  });

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-route]");
    if (!button) return;
    const family = state.families[Number(button.dataset.index)] || {};
    if (!family.postcode) {
      alert("Please add this family’s postcode first.");
      return;
    }
    const outgoing = button.dataset.route === "out";
    const origin = outgoing ? family.postcode : "Tebay Services";
    const destination = outgoing ? "Moto Knutsford M6 Northbound" : family.postcode;
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`, "_blank", "noopener");
  });
}

function renderChecklist() {
  state.checks = state.checks || {};
  const container = document.getElementById("checklist");
  container.innerHTML = TRIP_DATA.checklist.map((item, index) => `
    <label class="check-row"><input type="checkbox" data-check="${index}" ${state.checks[index] ? "checked" : ""} /><span>${item}</span></label>
  `).join("");
  container.addEventListener("change", (event) => {
    state.checks[event.target.dataset.check] = event.target.checked;
    save();
  });
}

function renderExpenses() {
  state.expenses = state.expenses || [];
  document.getElementById("expenseList").innerHTML = state.expenses.map((expense, index) => `
    <div class="expense-row">
      <input data-expense="${index}" data-field="name" value="${expense.name || ""}" placeholder="Expense" />
      <input type="number" min="0" step="0.01" data-expense="${index}" data-field="amount" value="${expense.amount || ""}" placeholder="£" />
      <button class="ghost-btn" data-remove-expense="${index}" aria-label="Remove expense">×</button>
    </div>
  `).join("");
  const total = state.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  document.getElementById("expenseTotal").textContent = money.format(total);
}

document.getElementById("addExpenseBtn").addEventListener("click", () => {
  state.expenses = state.expenses || [];
  state.expenses.push({ name: "", amount: "" });
  save();
  renderExpenses();
});
document.getElementById("expenseList").addEventListener("input", (event) => {
  if (event.target.dataset.expense === undefined) return;
  const index = Number(event.target.dataset.expense);
  state.expenses[index][event.target.dataset.field] = event.target.value;
  save();
  if (event.target.dataset.field === "amount") renderExpenses();
});
document.getElementById("expenseList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-expense]");
  if (!button) return;
  state.expenses.splice(Number(button.dataset.removeExpense), 1);
  save();
  renderExpenses();
});

const notes = document.getElementById("tripNotes");
notes.value = state.tripNotes || "";
notes.addEventListener("input", () => {
  state.tripNotes = notes.value;
  save();
});

renderRoute();
renderAccommodation();
renderItinerary();
renderFamilies();
renderChecklist();
renderExpenses();
