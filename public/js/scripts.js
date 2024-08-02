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
                <strong>Desapareció el:<strong>
                <h2>${report.disappearanceDate}</h2>
                <div class="overlay">
                <div class="overlay-text">Me Perdí :(</div>
                </div>
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
        <p><strong>Fecha de Desaparición:</strong> ${report.disappearanceDate}</p>
        <p><strong>Hora de Desaparición:</strong> ${report.disappearanceTime}</p>
        <p><strong>Contáctame:</strong> <a  href=https://api.whatsapp.com/send/?phone=${report.phoneNumber}><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg></a> </p>
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

//NAVBAR
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-list a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

window.onload = startWebSocket;
