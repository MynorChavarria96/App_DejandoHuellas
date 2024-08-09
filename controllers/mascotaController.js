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