/* =========================================================================
   Tema 5 – Práctica DOM - Archivo del Alumno
   
   INSTRUCCIONES:
   1. Completa la funcionalidad de cada ejercicio siguiendo los comentarios
   2. Usa solo JavaScript vanilla (sin librerías externas)
   3. Sigue el patrón del Ejercicio 1 que está completado como ejemplo
   ========================================================================= */

/* ==============================================================
   Ejercicio 1 – Selectores y modificación (EJEMPLO COMPLETADO)
   ============================================================== */

// 1. Seleccionamos los elementos que vamos a usar
const contenido = document.getElementById('contenido');
const btnEj1 = document.getElementById('btn-ej1');

// 2. Añadimos el evento click al botón
btnEj1.addEventListener('click', function () {
   // Cambiar el texto del primer párrafo
   const primerParrafo = contenido.querySelector('p');
   primerParrafo.textContent = 'Este texto ha sido modificado con JavaScript';

   // Cambiar el color del segundo párrafo
   const segundoParrafo = contenido.querySelectorAll('p')[1];
   if (segundoParrafo) {
      segundoParrafo.style.color = 'blue';
   }

   // Añadir clase "resaltado" a todos los párrafos
   const todosLosParrafos = contenido.querySelectorAll('p');
   for (let i = 0; i < todosLosParrafos.length; i++) {
      todosLosParrafos[i].classList.add('resaltado');
   }
});

/* ============================================================
   TODO: Ejercicio 2 – Crear y eliminar elementos del DOM
   ============================================================ */

// TODO: 1. Seleccionar los botones con IDs: btn-add y btn-remove
const contenido2 = document.getElementById('contenido2');
const btnEj2n1 = document.getElementById('btn-add');
const btnEj2n2 = document.getElementById('btn-remove');

// TODO: 2. Crear función para el botón "Añadir párrafo"
//         - Crear un nuevo elemento <p>
//         - Asignar texto: "Nuevo párrafo añadido"
//         - Añadir clase Bootstrap: "mb-2"
//         - Agregarlo al contenedor #contenido
//         - Aplicar eventos hover (función del ejercicio 3)
btnEj2n1.addEventListener('click', function () {
   // Crear nuevo párrafo
   const nuevoParrafo = document.createElement('p');
   // Asignar texto y clase
   nuevoParrafo.textContent = 'Nuevo párrafo añadido';
   // Añadir clase Bootstrap
   nuevoParrafo.classList.add('mb-2');
   // Agregar al contenedor
   contenido2.appendChild(nuevoParrafo);
});

// TODO: 3. Crear función para el botón "Eliminar párrafo"
//         - Buscar todos los párrafos en #contenido
//         - Si hay párrafos, eliminar el último
btnEj2n2.addEventListener('click', function () {
   // Buscar todos los párrafos
   const parrafos = contenido2.getElementsByTagName('p');
   // Eliminar el último si existe
   if (parrafos.length > 0) {
      // Eliminar el último párrafo del contenedor
      contenido2.removeChild(parrafos[parrafos.length - 1]);
   }
});

/* ==========================================
   TODO: Ejercicio 3 – Eventos de ratón (hover)
   ========================================== */

// TODO: 1. Crear función para cuando entra el ratón
//         - Cambiar backgroundColor a '#e7f5ff'

// TODO: 2. Crear función para cuando sale el ratón
//         - Restaurar backgroundColor a ''

// TODO: 3. Crear función para aplicar eventos hover a un párrafo
//         - Usar addEventListener para 'mouseover' y 'mouseout'

// TODO: 4. Aplicar hover a todos los párrafos existentes inicialmente
const contenido3 = document.getElementById('contenido3');
const parrafos_Ej1 = contenido.getElementsByTagName('p');
const parrafos_Ej3 = contenido3.getElementsByTagName('p');

// Función para aplicar eventos hover a un párrafo
function aplicarHover(parrafo) {
   // Evento mouseover
   parrafo.addEventListener('mouseover', function () {
      // Cambiar color de fondo
      parrafo.style.backgroundColor = '#e7f5ff';
   });
   // Evento mouseout
   parrafo.addEventListener('mouseout', function () {
      // Restaurar color de fondo
      parrafo.style.backgroundColor = '';
   });
}

// Aplicar hover a todos los párrafos del Ejercicio 1
for (let i = 0; i < parrafos_Ej1.length; i++) {
   aplicarHover(parrafos_Ej1[i]);
}
// Aplicar hover a los párrafos del Ejercicio 3
for (let i = 0; i < parrafos_Ej3.length; i++) {
   aplicarHover(parrafos_Ej3[i]);
}

/* ======================================================
   TODO: Ejercicio 4 – Trabajar con inputs y formularios
   ====================================================== */

// TODO: 1. Seleccionar elementos: input (#nuevoTexto), botón (#btn-cambiar), mensaje error (#msg-ej4)
const inputEj4 = document.getElementById('nuevoTexto');
const btnEj4 = document.getElementById('btn-cambiar');
const msgErrorEj4 = document.getElementById('msg-ej4');

// TODO: 2. Crear función para el botón "Cambiar texto"
//         - Obtener valor del input (usar .trim())
//         - Si está vacío: mostrar mensaje error, enfocar input
//         - Si tiene texto: ocultar error, cambiar texto del primer párrafo
btnEj4.addEventListener('click', function () {
   // Obtener y limpiar texto del input
   const nuevoTexto = inputEj4.value.trim();
   // Seleccionar el primer párrafo dentro de #contenido4
   const primerParrafoEj4 = document.querySelector('#contenido4 p');

   // Validar si el texto está vacío
   if (nuevoTexto === '') {
      // Mostrar mensaje de error
      msgErrorEj4.classList.remove('d-none');
      // Enfocar input
      inputEj4.focus();
   } else {
      // Ocultar mensaje de error
      msgErrorEj4.classList.add('d-none');
      // Cambiar texto del primer párrafo
      if (primerParrafoEj4) {
         // Actualizar el texto del párrafo
         primerParrafoEj4.textContent = nuevoTexto;
      }
   }
});

/* ===================================================
   TODO: Ejercicio 5 – Lista de tareas (To-Do List)
   =================================================== */

// TODO: 1. Seleccionar elementos: input (#tareaInput), botones (#btn-tarea, #btn-borrar-completadas), lista (#listaTareas)
const inputTarea = document.getElementById('tareaInput');
const btnAñadirTarea = document.getElementById('btn-tarea');
const btnBorrarCompletadas = document.getElementById('btn-borrar-completadas');
const listaTareas = document.getElementById('listaTareas');

// TODO: 2. Función para añadir tarea
//         - Obtener texto del input
//         - Si no está vacío: crear <li>, añadir texto, agregar evento click para toggle clase 'completada'
//         - Limpiar input y enfocar
btnAñadirTarea.addEventListener('click', function () {
   // Obtener y limpiar texto del input
   const textoTarea = inputTarea.value.trim();
   if (textoTarea !== '') {
      // Crear nuevo elemento <li>
      const nuevaTarea = document.createElement('li');
      nuevaTarea.textContent = textoTarea;
      // Añadir evento click para marcar como completada
      nuevaTarea.addEventListener('click', function () {
         nuevaTarea.classList.toggle('completada');
      });
      // Agregar a la lista de tareas
      listaTareas.appendChild(nuevaTarea);
      // Limpiar y enfocar input
      inputTarea.value = '';
      inputTarea.focus();
   } else {
      return;
   }
});

// TODO: 3. Función para borrar tareas completadas
//         - Buscar todos los <li> con clase 'completada'
//         - Eliminar cada uno de la lista
btnBorrarCompletadas.addEventListener('click', function () {
   const tareasCompletadas = listaTareas.querySelectorAll('.completada');
   // Eliminar cada tarea completada
   tareasCompletadas.forEach(function (tarea) {
      listaTareas.removeChild(tarea);
   });
});