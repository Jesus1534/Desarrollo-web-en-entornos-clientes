window.addEventListener('load', function () {

    // Creación de un array de cadenas
    let lenguajes = ['JavaScript', 'Python', 'Java', 'C#', 'PHP'];

    // Mostrar el array en consola
    console.log('Array de lenguajes:', lenguajes);

    // Creación de un array usando new Array()
    let frameworks = new Array('React', 'Angular', 'Vue', 'Django', 'Spring');

    // Mostrar el array en consola
    console.log('Array de frameworks:', frameworks);

    // Creamos un array usando new con tamaño fijo
    let personajes = new Array(5); // Array de 5 posiciones

    personajes[0] = 'Mario';
    personajes[1] = 'Luigi';
    personajes[2] = 'Peach';
    personajes[3] = 'Bowser';
    personajes[4] = 'Yoshi';

    // Mostrar el array en consola
    console.log('Array de personajes:', personajes);

    // Acceder a elementos del array
    let unLenguaje = lenguajes[2]; // Java
    console.log('Lenguaje en posición 2:', unLenguaje);

    let unPersonaje = personajes[0]; // Mario
    console.log('Personaje en posición 0:', unPersonaje);

    // Uso de la propiedad length
    let numeroLenguajes = lenguajes.length;
    console.log('Número de lenguajes:', numeroLenguajes);

    // Bucle for para recorrer el array
    for (let i = 0; i < numeroLenguajes; i++) {
        console.log(`Lenguaje en posición ${i}:`, lenguajes[i]);
    }

    // Bucle forEach para recorrer el array
    frameworks.forEach(function (nombre, index) {
        console.log(`Framework en posición ${index}:`, nombre);
    });

    // Bucle foreach con función flecha
    personajes.forEach((nombre, index) => {
        console.log(`Personaje en posición ${index}:`, nombre);
    });

    // Ejemplo de iteración sobre arrays
    const main = document.getElementById('main');
    const lista = document.createElement('ul');

    // Agregar lenguajes a la lista
    lenguajes.forEach((nombre) => {
        const item = document.createElement('li');
        item.textContent = nombre;
        lista.appendChild(item);
    });

    main.appendChild(lista);

    // Lo mismo con frameworks con notación clásica
    const lista2 = document.createElement('ul');
    for (let i = 0; i < frameworks.length; i++) {
        const item = document.createElement('li');
        item.textContent = frameworks[i];
        lista2.appendChild(item);
    }
    main.appendChild(lista2);

    // Mostramos personajes de forma clásica
    let text = '<ul>';
    for (let i = 0; i < personajes.length; i++) {
        text += `<li>${personajes[i]}</li>`;
    }
    text += '</ul>';
    main.innerHTML += text;

    // Añadimos un elemento al array de frameworks
    frameworks.push('Laravel');
    console.log('Frameworks después de push:', frameworks);

    // Añadimos un elemento al final usando length
    frameworks[frameworks.length] = 'Symfony';
    console.log('Frameworks después de añadir con length:', frameworks);

    // Eliminamos el último elemento del array
    let ultimo = frameworks.pop();
    console.log('Framework eliminado con pop:', ultimo);
    console.log('Frameworks después de pop:', frameworks);

    // Eliminamos el primer elemento del array
    let primero = frameworks.shift();
    console.log('Framework eliminado con shift:', primero);
    console.log('Frameworks después de shift:', frameworks);

    // Concatenamos dos arrays
    let tecnologias = lenguajes.concat(frameworks);
    console.log('Array concatenado de lenguajes y frameworks:', tecnologias);

    // Ejemplo de splice y slice
    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];

    // Eliminar 2 elementos desde la posición 2
    let eliminados = meses.splice(2, 2);
    console.log('Meses después de splice (eliminados):', eliminados);
    console.log('Meses después de splice (restantes):', meses);

    // Extraer una sección del array
    let algunosMeses = meses.slice(1, 3);
    console.log('Algunos meses (slice):', algunosMeses);

    // Ordenamos un array de lenguajes
    lenguajes.sort();
    console.log('Lenguajes ordenados:', lenguajes);

    lenguajes.reverse();
    console.log('Lenguajes en orden inverso:', lenguajes);

    // Ordenamos lenguajes con orden personalizado por longitud de cadena    
    lenguajes.sort(function (a, b) {
        return a.length - b.length;
    });
    console.log('Lenguajes ordenados por longitud:', lenguajes);

    // Ejemplos de filtros. Filtramos lenguajes que contienen 'a'
    let filtrados = lenguajes.filter(function (elem) {
        return elem.toLowerCase().includes('a');
    });
    console.log("Lenguajes que contienen 'a':", filtrados);

    // Buscar un elemento en el array, pasado como argumento
    function buscarLenguaje(arr, texto) {
        return arr.find(function (elem) {
            return elem.toLowerCase() === texto.toLowerCase();
        });
    }
    let buscado = buscarLenguaje(lenguajes, 'python');
    console.log('Lenguaje buscado (find):', buscado);


});