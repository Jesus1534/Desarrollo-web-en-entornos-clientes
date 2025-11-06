// Plantilla para alumnos - Tema07 Ejercicio 1
// Completa las funciones marcadas con TODO y ejecuta desde el navegador.

// Ejercicio 1 - raizCuadrada (plantilla)
document.getElementById('run-e1').addEventListener('click', function () {
  const v = parseFloat(document.getElementById('a-e1').value);
  const out = document.getElementById('out-e1');
  // TODO: implementar raizCuadrada(numero)
  function raizCuadrada(numero) {
    if (numero < 0) {
      return 'Error: introduce un número válido y positivo.';
    }
    return Math.sqrt(numero);
  }

  const res = raizCuadrada(v);
  out.textContent = `Resultado: ${res}`;

});


// Ejercicio 2 - alerta (plantilla)
document.getElementById('run-e2').addEventListener('click', function () {
  const msg = document.getElementById('a-e2').value || 'Mensaje de ejemplo';
  function alerta(mensaje) {
    alert(mensaje);
  }

  document.getElementById('out-e2').textContent = 'Implementa la función alerta(mensaje) para mostrar un alert en el navegador.';
  alerta(msg);

});


// Ejercicio 3 - new Function (plantilla)
document.getElementById('run-e3').addEventListener('click', function () {

  // TODO: usa new Function para construir y ejecutar una función que sume a y b
  const a = parseFloat(document.getElementById('a-e3a').value);
  const b = parseFloat(document.getElementById('a-e3b').value);

  const suma = new Function('a', 'b', 'return a + b;');

  const res = suma(a, b);
  document.getElementById('out-e3').textContent = `Resultado: ${res}`;

});


// Ejercicio 4 - Hoisting con var (plantilla)
document.getElementById('run-e4').addEventListener('click', function () {
  // TODO: reproduce el ejemplo en el código editando esta función. 
  console.log('El valor de x antes de la declaración es: ' + x);
  
  var x = 10;
  console.log('El valor de x después de la declaración es: ' + x);
});


// Ejercicio 5 - IIFE (plantilla)
document.getElementById('run-e5').addEventListener('click', function () {
  // TODO: crea una IIFE que haga console.log y devuelva un valor. Luego muestra el resultado aquí.
  const resultado = (function () {
    console.log('Esta es una IIFE');
    return 42;
  })();

  document.getElementById('out-e5').textContent = `Resultado de la IIFE: ${resultado}`;

});


// Ejercicio 6 - Función anónima dividir (plantilla)
document.getElementById('run-e6').addEventListener('click', function () {
  // TODO: define y usa esa función para devolver el resultado
  const dividir = function (a, b) {
    if (b === 0) return 'Error: división por cero';
      return a / b;
    };

  const a = parseFloat(document.getElementById('a-e6a').value);
  const b = parseFloat(document.getElementById('a-e6b').value);
  const res = dividir(a, b);
  document.getElementById('out-e6').textContent = `Resultado: ${res}`;

});


// Ejercicio 7 - Función flecha multiplicar (plantilla)
document.getElementById('run-e7').addEventListener('click', function () {
  // TODO: implementa una función flecha multiplicar = 
  const multiplicar = (a, b) => a * b;

  const a = parseFloat(document.getElementById('a-e7a').value);
  const b = parseFloat(document.getElementById('a-e7b').value);
  const res = multiplicar(a, b);
  document.getElementById('out-e7').textContent = `Resultado: ${res}`;

});


// Ejercicio 8 - Parámetros por defecto (plantilla)
document.getElementById('run-e8').addEventListener('click', function () {

  // TODO: implementar function saludar
  function saludar(nombre = 'Invitado') {
    return `Hola, ${nombre}!`;
  }

  const nombre = document.getElementById('a-e8').value;
  const res = saludar(nombre);
  document.getElementById('out-e8').textContent = res;

});


let contador = 0;
// Ejercicio 9 - Funciones anidadas (plantilla)
document.getElementById('run-e9').addEventListener('click', function () {
  // TODO: implementar función externa e interna
  function externa() {
    contador++;
    function interna() {
      console.log(contador);
      console.log('Función interna');
    }
    interna();
  }

  externa();
  document.getElementById('out-e9').textContent = 'Revisa la consola para ver el resultado';
});


// Ejercicio 10 - Métodos nativos (plantilla)
document.getElementById('run-e10').addEventListener('click', function () {

  // TODO: usa los métodos nativos vistos (length, toUpperCase, trim, indexOf, Math.random, Date.now)
  const input = document.getElementById('a-e10').value;

  const output = `
    Longitud: ${input.length}
    / Mayúsculas: ${input.toUpperCase()}
    / Sin espacios: ${input.trim()}
    / Índice de 'A': ${input.indexOf('A')}
    / Número aleatorio: ${Math.random()}
    / Timestamp: ${Date.now()}
  `;

  document.getElementById('out-e10').textContent = output;

});
