// // Registro de usuario
// function registerUser(event) {
//     event.preventDefault();
//     const formData = new FormData(document.getElementById('registerForm'));
  
//     fetch('/api/users/register', {
//       method: 'POST',
//       body: JSON.stringify({
//         username: formData.get('username'),
//         password: formData.get('password'),
//         firstName: formData.get('firstName'),
//         lastName: formData.get('lastName'),
//         address: formData.get('address'),
//         phone: formData.get('phone')
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then(response => response.json())
//       .then(data => {
//         if (data.errors) {
//           // Manejar errores
//           console.error(data.errors);
//         } else {
//           // Registro exitoso
//           console.log('Registro exitoso', data);
//         }
//       }).catch(error => console.error('Error:', error));
//   }
  
//   // Inicio de sesión
//   function loginUser(event) {
//     event.preventDefault();
//     const formData = new FormData(document.getElementById('loginForm'));
  
//     fetch('/api/users/login', {
//       method: 'POST',
//       body: JSON.stringify({
//         username: formData.get('username'),
//         password: formData.get('password')
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then(response => response.json())
//       .then(data => {
//         if (data.errors) {
//           // Manejar errores
//           console.error(data.errors);
//         } else {
//           // Inicio de sesión exitoso
//           console.log('Inicio de sesión exitoso', data);
//         }
//       }).catch(error => console.error('Error:', error));
//   }
  
//   document.getElementById('registerForm').addEventListener('submit', registerUser);
//   document.getElementById('loginForm').addEventListener('submit', loginUser);