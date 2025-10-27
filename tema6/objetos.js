// Cargamos el contenido cuando la página esté lista
window.addEventListener('load', function () {

    let alumno = {
        nombre: 'Juan',
        apellidos: 'García Martínez',
        edad: 30,
        curso: 'DWEC',
        direccion: {
            calle: 'Calle Falsa',
            numero: 123,
            ciudad: 'Springfield'
        },
        mostrarInfo: function () {
            let direccionCompleta = `${this.direccion.calle} ${this.direccion.numero}, ${this.direccion.ciudad}`;
            return `<div class="card bg-info"><div class="card-body">
                ${this.nombre} ${this.apellidos}, ${this.edad} años, 
                curso: ${this.curso}, vive en ${direccionCompleta}.
            </div></div>`;
        }
    }

    // Crear un párrafo con la información del alumno
    const info = document.createElement('p');
    info.innerHTML = alumno.mostrarInfo();

    // Añadir el párrafo al final del main
    const main = document.getElementById('main');
    main.appendChild(info);


    // Ejemplo de creación de objetos con dos sintaxis diferentes
    // Usando llaves {}
    let persona = {
        nombre: 'Ana',
        apellidos: 'López Sánchez',
        edad: 28
    }

    // Usando new Object()
    let persona2 = new Object();
    persona2.nombre = 'Luis';
    persona2.apellidos = 'Pérez Gómez';
    persona2.edad = 35;

    // Ejemplo de borrado de la proiedad edad
    delete persona2.edad;

    console.log(persona);
    console.log(persona2);

    // Ejemplo de función dentro de un objeto
    let coche = {
        marca: 'Renault',
        modelo: 'Austral',
        año: 2022,
        mostrarInfo: function () {
            return `Coche: ${this.marca} ${this.modelo}, Año: ${this.año}`;
        }
    }

    console.log(coche.mostrarInfo());

});


