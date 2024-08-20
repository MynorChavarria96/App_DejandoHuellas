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
