let ws;
let reports = [];

function startWebSocket() {
    ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = function(event) {
        const newReports = JSON.parse(event.data);

        newReports.forEach(report => {
            const reportExists = reports.find(r => r.id === report.id);
            if (!reportExists) {
                reports.push(report); // Agregar cada reporte nuevo si no está ya presente
            }
        });

        updateReports();
    };
}

function addReport(event) {
    event.preventDefault();
    
    const formData = new FormData(document.getElementById('reportForm'));

    fetch('/addReport', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
        document.getElementById('reportForm').reset();
        document.getElementById('imagePreview').src = '';
        closeModal();
      }).catch(error => console.error('Error:', error));
}

function updateReports() {
    const reportsContainer = document.getElementById('reportsContainer');
    reportsContainer.innerHTML = '';
    if (reports.length === 0) {
        const noReportsMessage = document.createElement('p');
        noReportsMessage.textContent = 'No hay reportes disponibles.';
        reportsContainer.appendChild(noReportsMessage);
    } else {
        reports.forEach(report => {
            const reportCard = document.createElement('div');
            reportCard.className = 'report-card';
            reportCard.innerHTML = `
                <img src="${report.photo}" alt="${report.name}">
                <h2>${report.name}</h2>
            `;
            reportCard.onclick = () => showReportDetails(report);
            reportsContainer.appendChild(reportCard);
        });
    }
}

function showReportDetails(report) {
    const reportDetails = document.getElementById('reportDetails');
    reportDetails.innerHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>${report.name}</h2>
        <img src="${report.photo}" alt="${report.name}">
        <p><strong>Último Lugar Visto:</strong> ${report.lastSeenLocation}</p>
        <p><strong>Color:</strong> ${report.color}</p>
        <p><strong>Raza:</strong> ${report.breed}</p>
        <p><strong>Edad:</strong> ${report.age}</p>
        <p><strong>Descripción:</strong> ${report.description}</p>
        <p><strong>Enfermedad Crónica:</strong> ${report.chronicDisease}</p>
        <p><strong>Nombre del Dueño:</strong> ${report.ownerName}</p>
        <p><strong>Número de Teléfono:</strong> ${report.phoneNumber}</p>
        <p><strong>Red Social:</strong> ${report.socialMedia}</p>
    `;
    document.getElementById('reportDetailsModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('reportDetailsModal').style.display = 'none';
    document.getElementById('reportModal').style.display = 'none';
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('imagePreview');
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

window.onload = startWebSocket;
