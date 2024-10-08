// controllers/mascotaController.js
const fetch = require('node-fetch');


exports.showIndex = (req, res) => {
  res.render('index');
};

exports.showConsejos= (req, res) => {
  res.render('consejos');
};
exports.showMisMascotas= (req, res) => {
  res.render('misMascotas');
};
exports.showreportesMascotas= (req, res) => {
  res.render('reportes');
};
exports.showDetalles= (req, res) => {
  res.render('detalles-mascota', {tunel_LocalHost: process.env.TUNEL_LOCALHOST});
};
exports.showVacunas= (req, res) => {
  res.render('vacunas', {tunel_LocalHost: process.env.TUNEL_LOCALHOST});
};

exports.obtenerEspecies = async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/api/mascotas/especies');
    const especies = await response.json();
    res.json(especies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las especies' });
  }
};

exports.obtenerVacunas = async (req, res) => {
  try {
    const mascota_id = req.params.id;
    const response = await fetch(`http://localhost:3000/api/mascotas/vacunas/${mascota_id}`);
    const vacunas = await response.json();
    res.json(vacunas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las vacunas' });
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
      res.status(200).json({ message: 'Mascota registrada con éxito', resulta: result });
    } else {
      res.status(400).json({ message: result.message || 'Error al registrar mascota' });
    }
  } catch (error) {
    console.error('Error al registrar la mascota:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.actualizarMascota = async (req, res) => {
  try {
    // Obtener el id de la mascota de la solicitud
    const { mascota_id } = req.params;

    // Enviar los datos a la API
    const response = await fetch(`http://localhost:3000/api/mascotas/update/${mascota_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Mascota actualizada' });
    } else {
      res.status(400).json({ message: result.message || 'Error al actualizar mascota' });
    }
  } catch (error) {
   
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
exports.eliminarMascota = async (req, res) => {
  try {
    // Obtener el id de la mascota de la solicitud
    const { mascota_id } = req.params;

    // Enviar los datos a la API
    const response = await fetch(`http://localhost:3000/api/mascotas/delete/${mascota_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
     
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Mascota eliminada' });
    } else {
      res.status(400).json({ message: result.message || 'Error al eliminar mascota' });
    }
  } catch (error) {
    console.error('Error al eliminar la mascota:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.registrarVacunacion= async (req, res) => {
  try {
    // Enviar los datos a la API
    const response = await fetch('http://localhost:3000/api/mascotas/vacunas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Vacunación registrada con éxito', resulta: result });
    } else {
      res.status(400).json({ message: result.message || 'Error al guardar el registro de vacunacion' });
    }
  } catch (error) {
    console.error('Error al registrar vacunación', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.actualizarVacunacion= async (req, res) => {
  try {
    const { id_vacunacion } = req.params;

    // Enviar los datos a la API
    const response = await fetch(`http://localhost:3000/api/mascotas/vacunas/update/${id_vacunacion}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Vacunación actualizada con éxito', resulta: result });
    } else {
      res.status(400).json({ message: result.message || 'Error al actualizar el registro de vacunacion' });
    }
  } catch (error) {
    console.error('Error al actualizar vacunación', error);
    res.status(500).json({ message: 'Error interno del servidor', eerr });
  }
};

exports.eliminarVacunacion = async (req, res) => {
  try {
    // Obtener el id de la mascota de la solicitud
    const { id_vacunacion } = req.params;

    // Enviar los datos a la API
    const response = await fetch(`http://localhost:3000/api/mascotas/vacunas/${id_vacunacion}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
     
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Vacuna eliminada' });
    } else {
      res.status(400).json({ message: result.message || 'Error al eliminar vacuna' });
    }
  } catch (error) {
    console.error('Error al eliminar la vacuna:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};







