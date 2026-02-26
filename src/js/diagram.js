import '../scss/main.scss';
import Chart from 'chart.js/auto';

async function fetchStatistics() {
  try {
    const response = await fetch('https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json');
    if (!response.ok) throw new Error('Kunde inte hämta data: ' + response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function prepareChartData(data, type, count) {
  const filtered = data
    .filter(item => item.type === type)
    .map(item => ({
      name: item.name,
      total: Number(item.applicantsTotal.trim()) || 0
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, count);

  return {
    labels: filtered.map(item => item.name),
    totals: filtered.map(item => item.total)
  };
}

document.addEventListener('DOMContentLoaded', async () => {
const data = await fetchStatistics();

  if (document.getElementById('coursesChart')) {
    const coursesData = prepareChartData(data, 'Kurs', 6);
    const coursesCtx = document.getElementById('coursesChart').getContext('2d');
    new Chart(coursesCtx, {
      type: 'bar',
      data: {
        labels: coursesData.labels,
        datasets: [{
          label: 'Antal sökande',
          data: coursesData.totals,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: { responsive: true, 
        maintainAspectRatio: false, 
        scales: { y: { beginAtZero: true } } }
    });

    const programsData = prepareChartData(data, 'Program', 5);
    const programsCtx = document.getElementById('programsChart').getContext('2d');
    new Chart(programsCtx, {
      type: 'pie',
      data: {
        labels: programsData.labels,
        datasets: [{
          label: 'Antal sökande',
          data: programsData.totals,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: { responsive: true, 
        maintainAspectRatio: false,}
    });
  }
});