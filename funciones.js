
function fechaCita() {
  const fechaInput = document.querySelector('#fecha');
  fechaInput.addEventListener('input', e => {

      const dia = new Date(e.target.value).getUTCDay();
      
      if([0, 6].includes(dia)) {
          e.preventDefault();
          fechaInput.value = '';
          mostrarAlerta('Fines de Semana no son permitidos', 'error');
      } else {
          cita.fecha = fechaInput.value;

          console.log(cita);
      }
  })
}

function deshabilitarFechaAnterior() {
  const inputFecha = document.querySelector('#fecha');

  const fechaAhora = new Date();
  const year = fechaAhora.getFullYear();
  const mes = fechaAhora.getMonth() + 1;
  const dia = fechaAhora.getDate() + 1;
  const fechaDeshabilitar = `${year}-${mes}-${dia}`;

  inputFecha.min = fechaDeshabilitar;
}

function horaCita() {
  const inputHora = document.querySelector('#hora');
  inputHora.addEventListener('input', e => {

      const horaCita = e.target.value;
      const hora = horaCita.split(':');

      if(hora[0] < 10 || hora[0] > 18 ) {
          mostrarAlerta('Hora no válida', 'error');
          setTimeout(() => {
              inputHora.value = '';
          }, 3000);
      } else {
          cita.hora = horaCita;

          console.log(cita);
      }
  });
}