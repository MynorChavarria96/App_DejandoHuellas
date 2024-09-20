exports.infoQR = (req, res) => {
  res.render('infoQr', { layout: false });
};

exports.mascotaQR = async (req, res) => {
  try {
      const { identificador_qr } = req.params;
      const response = await fetch(`http://localhost:3000/api/infoqr/${identificador_qr}`);
      const mascota = await response.json();

      if (!mascota) {
          return res.status(404).json({ message: 'Mascota no encontrada' });
      }

      res.json(mascota);
  } catch (error) {
      console.error('Error al obtener la mascota:', error);
      res.status(500).json({ message: 'Error al obtener la información de la mascota' });
  }
};

exports.reporte = async (req, res) =>{
  try {
    
    const response = await fetch('http://localhost:3000/api/nuevo/reporte', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Reporte Enviado', resulta: result });
    } else {
      res.status(400).json({ message: result.message || 'Error al enviar reporte' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }

}