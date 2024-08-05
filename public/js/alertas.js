document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
      logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        Swal.fire({
          title: 'Confirmar cierre de sesión',
          text: "¿Seguro que quieres cerrar sesión?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, cerrar sesión'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/users/logout';
          }
        });
      });
    }
  });