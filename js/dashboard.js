let acuityChart = null;

document.addEventListener('DOMContentLoaded', () => {
    initAcuityChart();
    
    // Listen to theme changes from theme.js
    window.addEventListener('themeChanged', (e) => {
        if (acuityChart) {
            acuityChart.destroy();
            initAcuityChart();
        }
    });

    // Mock form renewals
    const renewalForm = document.getElementById('renewal-form');
    if (renewalForm) {
        renewalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Prescription renewal request submitted successfully to Dr. Raymond Vance!');
        });
    }

    // Mock appointment booking from dashboard
    const quickBookForm = document.getElementById('quick-book-form');
    if (quickBookForm) {
        quickBookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Eye Exam slot requested successfully!');
        });
    }
});

function initAcuityChart() {
    const ctx = document.getElementById('visionChart');
    if (!ctx) return;

    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    const isDark = theme === 'dark';

    // Configure labels and grid line colors based on theme
    const labelColor = isDark ? '#FFFFFF' : '#1A1A1A';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 76, 129, 0.1)';
    const leftLineColor = isDark ? '#4BA3C7' : '#0F4C81';
    const rightLineColor = isDark ? '#E8F4FA' : '#4BA3C7';

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const leftEyeData = [0.8, 0.9, 0.95, 1.0, 1.0, 1.2]; // Visual Acuity (decimal scale)
    const rightEyeData = [0.7, 0.75, 0.85, 0.9, 1.0, 1.0];

    acuityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Left Eye (OD)',
                    data: leftEyeData,
                    borderColor: leftLineColor,
                    backgroundColor: 'transparent',
                    tension: 0.3,
                    borderWidth: 3,
                    pointBackgroundColor: leftLineColor
                },
                {
                    label: 'Right Eye (OS)',
                    data: rightEyeData,
                    borderColor: rightLineColor,
                    backgroundColor: 'transparent',
                    tension: 0.3,
                    borderWidth: 3,
                    pointBackgroundColor: rightLineColor
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: labelColor,
                        font: {
                            family: 'Plus Jakarta Sans',
                            weight: '600'
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: labelColor,
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                y: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: labelColor,
                        font: {
                            family: 'Inter'
                        }
                    },
                    min: 0.5,
                    max: 1.5
                }
            }
        }
    });
}
