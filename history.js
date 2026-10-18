let history = JSON.parse(sessionStorage.getItem("history") || "[]")
let historyContainer = document.getElementById('history');

history.forEach(function(item) {
    let p = document.createElement("p")
    p.textContent = item
    historyContainer.appendChild(p)
})