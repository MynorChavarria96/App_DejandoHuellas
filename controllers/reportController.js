const { broadcastReport, reports } = require('../websocket');
const fs = require('fs');
const path = require('path');

exports.addReport = (req, res) => {
    const report = {
        id: Date.now(),
        name: req.body.name,
        lastSeenLocation: req.body.lastSeenLocation,
        color: req.body.color,
        breed: req.body.breed,
        age: req.body.age,
        description: req.body.description,
        chronicDisease: req.body.chronicDisease,
        ownerName: req.body.ownerName,
        phoneNumber: req.body.phoneNumber,
        photo: req.file ? `/uploads/${req.file.filename}` : null,
        disappearanceDate: req.body.disappearanceDate,
        disappearanceTime: req.body.disappearanceTime
    };

    // Solo agregar a la lista si no está ya presente
    const reportExists = reports.find(r => r.id === report.id);
    if (!reportExists) {
        reports.push(report);
    }

    broadcastReport(report);  // Enviar el reporte a través de WebSocket
    res.status(200).json(report);
};

exports.getReports = (req, res) => {
    res.render('perdidos', { reports });
};

exports.showIndex = (req, res) => {
    res.render('index');
};

exports.showConsejos= (req, res) => {
    res.render('consejos');
};
exports.showMisMascotas= (req, res) => {
    res.render('misMascotas');
};
exports.showEncontrados= (req, res) => {
    res.render('encontrados');
};