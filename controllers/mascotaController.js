// controllers/mascotaController.js
const fetch = require('node-fetch');

exports.obtenerEspecies = async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/api/mascotas/especies');
    const especies = await response.json();
    res.json(especies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las especies' });
  }
};

exports.obtenerGeneros = async (req, res) => {
    try {
      const response = await fetch('http://localhost:3000/api/mascotas/generos');
      const generos = await response.json();
      res.json(generos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los géneros' });
    }
  };

  exports.misMascotas = async (req, res) => {
    try {
        const propietarioId = req.session.propietarioId;
        const response = await fetch(`http://localhost:3000/api/mascotas/mismascotas/${propietarioId}`);
        const mascotas = await response.json();
        res.json(mascotas);

    } catch (error) {
      res.status(500).json({ message: 'No se encontraron' });
    }
};




  exports.registrarMascota = async (req, res) => {
    try {
      // Enviar los datos a la API
      const response = await fetch('http://localhost:3000/api/mascotas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        res.status(200).json({ message: 'Mascota registrada con éxito' });
      } else {
        res.status(400).json({ message: result.message || 'Error al registrar mascota' });
      }
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };


  
  