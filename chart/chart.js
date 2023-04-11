const chart = document.getElementById('chart');

function createBar() {
  const bar = document.createElement('div');
  bar.className = 'bar';
  bar.style.height = `${Math.floor(Math.random() * 301)}px`;
  return bar;
}

function updateChart() {
  const newBar = createBar();
  chart.appendChild(newBar);

  if (chart.childElementCount > 50) {
    chart.removeChild(chart.firstElementChild);
  }

  setTimeout(updateChart, 1000);
}

updateChart();