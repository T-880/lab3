import '../scss/main.scss';
import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('coursesChart')) {
    const coursesCtx = document.getElementById('coursesChart').getContext('2d');
    new Chart(coursesCtx, {
      type: 'bar',
      data: {
        labels: ['Kurs A', 'Kurs B', 'Kurs C', 'Kurs D', 'Kurs E', 'Kurs F'],
        datasets: [{
          label: 'Antal sökningar',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: { responsive: true, 
        maintainAspectRatio: false, 
        scales: { y: { beginAtZero: true } } }
    });

    const programsCtx = document.getElementById('programsChart').getContext('2d');
    new Chart(programsCtx, {
      type: 'bar',
      data: {
        labels: ['Program A', 'Program B', 'Program C', 'Program D', 'Program E'],
        datasets: [{
          label: 'Antal sökningar',
          data: [15, 10, 8, 12, 6],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: { responsive: true, 
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } } }
    });
  }
});