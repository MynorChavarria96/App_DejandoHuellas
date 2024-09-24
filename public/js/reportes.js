
let reports = [];
document.addEventListener('DOMContentLoaded', function() {
    
    updateReports();
});

async function updateReports() {
    const reportsContainer = document.getElementById('reportsContainer');
    if (!reportsContainer) {
        console.error('El elemento con ID "reportsContainer" no se encontró en el DOM.');
        return;
    }

    reportsContainer.innerHTML = '';
 
    try {
        const response = await fetch('info/reporte/getReporteDes');
        // Verifica si la respuesta es correcta (status 200-299)
        if (!response.ok) {
            throw new Error('Error al obtener los reportes: ' + response.statusText);
        }

        reports = await response.json(); // Supone que la respuesta es en formato JSON

        console.log(reports)
        // Verifica si no hay reportes
        if (reports.length === 0) {
            const noReportsMessage = document.createElement('p');
            noReportsMessage.textContent = 'No hay reportes disponibles.';
            reportsContainer.appendChild(noReportsMessage);
        } else {
            // Itera sobre cada reporte y crea una tarjeta
            reports.forEach(report => {
                const reportCard = document.createElement('div');
                const fecha_desaparicion = formatDate(new Date(report.fecha_desaparicion));
                reportCard.className = 'report-card';
                reportCard.innerHTML = `
                    <img src="${report.foto}" alt="${report.nombre}">
                    <h3>${report.nombre}</h3>
                    <h5>${report.raza}</h5>
                    <strong>Desapareció el:</strong>
                    <h2>${fecha_desaparicion}</h2>
                    <div class="overlay">
                        <div class="overlay-text">Desaparecido</div>
                    </div>
                `;
                // Agrega un evento clic para mostrar los detalles del reporte
                reportCard.onclick = () =>showReport(report.identificador_qr);
                //reportCard.onclick = () => showReportDetails(report);
                reportsContainer.appendChild(reportCard);
            });
        }
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'No se pudieron cargar los reportes. Inténtalo más tarde.';
        reportsContainer.appendChild(errorMessage);
    }
}

function showReport(codigo){
window.location.href = `${tunel_LocalHost}info/${codigo}`
}

function showReportDetails(report) {
    const reportDetails = document.getElementById('reportDetails');
    reportDetails.innerHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>${report.nombre}</h2>
        <img src="${report.foto}" alt="${report.nombre}">
        <p><strong>Último Lugar Visto:</strong> ${report.lastSeenLocation}</p>
        <p><strong>Color:</strong> ${report.color}</p>
        <p><strong>Raza:</strong> ${report.breed}</p>
        <p><strong>Edad:</strong> ${report.age}</p>
        <p><strong>Descripción:</strong> ${report.description}</p>
        <p><strong>Enfermedad Crónica:</strong> ${report.chronicDisease}</p>
        <p><strong>Nombre del Dueño:</strong> ${report.ownerName}</p>
        <p><strong>Fecha de Desaparición:</strong> ${report.disappearanceDate}</p>
        <p><strong>Hora de Desaparición:</strong> ${report.disappearanceTime}</p>
        <p><strong>Contáctame:</strong> <a href="https://api.whatsapp.com/send/?phone=${report.phoneNumber}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg></a></p>
    `;
    document.getElementById('reportDetailsModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('reportDetailsModal').style.display = 'none';
    document.getElementById('reportModal').style.display = 'none';
}
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Obtiene el día y lo convierte a string
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (recuerda que es 0-indexado)
    const year = date.getFullYear(); // Obtiene el año

    return `${day}-${month}-${year}`; // Retorna la fecha en formato dd-mm-yyyy
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('imagePreview');
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}


