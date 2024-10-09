// controllers/mascotaController.js
const fetch = require('node-fetch');


exports.showIndex = (req, res) => {
  res.render('index');
};


exports.showMisMascotas= (req, res) => {
  res.render('misMascotas');
};
exports.showreportesMascotas= (req, res) => {
  res.render('reportes');
};
exports.vistaImpresion = (req, res) => {


  res.render('imprimir', { layout: false });

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

exports.getReporteimprimir = async (req, res) => {
  const { mascota_id} = req.params;
  try {
    const response = await fetch(`http://localhost:3000/api/mascotas/vacunas/imprimir/${mascota_id}`);
    const inforeporte = await response.json();
    res.json(inforeporte);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la informacion de la mascota' });
  }
};


// mascotaController.js
exports.showConsejos = (req, res) => {
  // Definir las entradas de blog manualmente
  const entradas = [
    {
        titulo: "Vacunación y Prevención de Enfermedades",
        contenido: "La vacunación es crucial para proteger a las mascotas de enfermedades graves y potencialmente mortales. Es importante seguir un calendario de vacunación recomendado por los veterinarios y mantener actualizados los registros de vacunación."
    },
    {
        titulo: "Nutrición Adecuada",
        contenido: "Una dieta equilibrada es esencial para la salud de las mascotas. Los alimentos deben ser adecuados para la especie, la edad, el tamaño y el nivel de actividad de la mascota. Consulta con un veterinario para obtener recomendaciones personalizadas."
    },
    {
        titulo: "Ejercicio Regular",
        contenido: "El ejercicio no solo ayuda a mantener un peso saludable, sino que también contribuye al bienestar mental de las mascotas. Los paseos diarios, los juegos y la interacción con otras mascotas pueden ser actividades beneficiosas."
    },
    {
        titulo: "Salud Mental y Estimulación",
        contenido: "Las mascotas necesitan estimulación mental para evitar el aburrimiento y el estrés. Juguetes interactivos, entrenamiento de obediencia y tiempo de juego pueden ayudar a mantener su mente activa."
    },
    {
        titulo: "Control de Parásitos",
        contenido: "Los parásitos como pulgas, garrapatas y lombrices pueden afectar la salud de las mascotas. Es importante realizar controles regulares y seguir tratamientos preventivos recomendados por los veterinarios."
    },
    {
        titulo: "Higiene y Cuidado Personal",
        contenido: "El cuidado regular del pelaje, las uñas y los dientes de las mascotas es vital para su salud general. La higiene adecuada previene problemas de piel y enfermedades dentales."
    },
    {
        titulo: "Socialización y Comportamiento",
        contenido: "La socialización temprana y el entrenamiento adecuado son fundamentales para el desarrollo de un comportamiento equilibrado. Esto incluye la exposición a diferentes personas, animales y entornos."
    },
    {
        titulo: "Atención Veterinaria Regular",
        contenido: "Las visitas periódicas al veterinario son esenciales para el cuidado preventivo y la detección temprana de problemas de salud. Mantén un registro de las visitas y consultas médicas."
    },
    {
        titulo: "Uso de Collares con Placas QR para Mascotas Perdidas",
        contenido: "Los collares con placas QR son una herramienta tecnológica innovadora para prevenir que las mascotas se pierdan. Al escanear el código QR con un smartphone, cualquier persona que encuentre a tu mascota puede acceder a información de contacto y detalles importantes, facilitando su rápida devolución."
    },
    {
        titulo: "Importancia de la Esterilización y Castración",
        contenido: "La esterilización y castración no solo ayudan a controlar la población de mascotas, sino que también ofrecen beneficios de salud, como la reducción del riesgo de ciertas enfermedades y comportamientos no deseados. Consulta con tu veterinario sobre el mejor momento para realizar estos procedimientos."
    },
    {
        titulo: "Identificación y Manejo del Estrés en Mascotas",
        contenido: "El estrés puede afectar negativamente la salud y el comportamiento de las mascotas. Aprende a identificar las señales de estrés y descubre estrategias efectivas para manejarlo, como la creación de un entorno seguro, el uso de juguetes estimulantes y la implementación de rutinas consistentes."
    },
    {
        titulo: "Adiestramiento Positivo para una Mejor Convivencia",
        contenido: "El adiestramiento positivo se basa en recompensas y refuerzos positivos para enseñar a las mascotas comportamientos deseados. Este método fomenta una relación de confianza y respeto, mejorando la convivencia y reduciendo problemas de comportamiento."
    },
    {
        titulo: "Selección de Juguetes Adecuados para la Estimulación de tu Mascota",
        contenido: "Elegir los juguetes adecuados es esencial para mantener a tu mascota entretenida y estimulada mentalmente. Opta por juguetes que se adapten a las preferencias y necesidades específicas de tu mascota, ya sea para morder, buscar o resolver puzzles."
    },
    {
        titulo: "Seguridad en el Hogar para Perros y Gatos",
        contenido: "Asegurar tu hogar es fundamental para prevenir accidentes y garantizar la seguridad de tus mascotas. Revisa y elimina posibles peligros, como productos tóxicos, cables eléctricos expuestos y objetos pequeños que puedan ser ingeridos. Crea espacios seguros donde tus mascotas puedan moverse libremente."
    }
];


  // Definir los videos manualmente
  const videos = [
      {
          titulo: "Como cuidar a cachorro",
          videoid: "9dDemBxxulo"
      },
      {
          titulo: "Consejos de Alimentación",
          videoid: "your-video-id-2" // Reemplaza con el ID real del video
      },
      {
          titulo: "Ejercicio para Mascotas",
          videoid: "your-video-id-3" // Reemplaza con el ID real del video
      },
      {
          titulo: "Señales de Salud en Mascotas",
          videoid: "your-video-id-4" // Reemplaza con el ID real del video
      },
      {
          titulo: "Cómo Socializar a tu Perro",
          videoid: "your-video-id-5" // Reemplaza con el ID real del video
      },
      {
          titulo: "Importancia de la Vacunación",
          videoid: "your-video-id-6" // Reemplaza con el ID real del video
      }
  ];

  // Renderiza la vista y pasa las entradas y videos
  res.render('consejos', { entradas, videos });
};





