const listaCarrito = document.querySelector('#lista-carrito');
const contenidoCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listadoCursos = document.querySelector('#lista-cursos');

let cursosCarrito = [];

// Ejecutador de eventos
eventsListener();
function eventsListener() {

    // Agregar Curso Al Carrito
    listadoCursos.addEventListener('click', agregarAlCarrito);

    // Vaciar Carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Eliminar Curso Del Carrito
    listaCarrito.addEventListener('click', eliminarCurso);

    document.addEventListener('DOMContentLoaded', () => {

        cursosCarrito = JSON.parse( localStorage.getItem('productos') ) || [];

        cursosEnHTML();

    });

}

// Funciones Event Listener
function agregarAlCarrito(e) {

    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito') ) {

        const curso = e.target.parentElement.parentElement;
        
        // Agregar Curso Al Carrito
        agregarCurso(curso);
    }

}

function vaciarCarrito() {

    cursosCarrito = [];

    limpiarHTML();

    localStorage.removeItem('productos');

}

function eliminarCurso(e) {

    if( e.target.classList.contains('borrar-curso') ) {

        const cursoID = e.target.getAttribute('data-id');

        cursosCarrito = cursosCarrito.filter( curso => curso.id !== cursoID );

        cursosEnHTML();
        
    }

}

// Funciones

function agregarCurso(curso) {
    
    // Objeto Con Info Del Curso
    const cursoInfo = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        cantidad: 1
    }

    // Verificar Si Existe Curso En Lista
    const existe = cursosCarrito.some( curso => curso.id === cursoInfo.id );
    
    if(existe) {

        // Aumentar Cantidad
        const cursos = cursosCarrito.map( curso => {

            if(curso.id === cursoInfo.id) {
                
                curso.cantidad++;

                return curso;

            } else {

                return curso;

            }
            
        });

        cursosCarrito = [...cursos];

    } else{

        // Agregar Al Arreglo
        cursosCarrito = [...cursosCarrito, cursoInfo];
    }

    // Dibujar los cursos en el HTML
    cursosEnHTML();
}

function cursosEnHTML() {

    // Limpiar HTML
    limpiarHTML();
    
    // Recorremos Cursos Del Carrito
    cursosCarrito.forEach( curso => {

        const { id, imagen, nombre, precio, cantidad } = curso;

        // Creamos Elemento HTMl
        const row = document.createElement('tr');

        row.innerHTML = `
            <td> <img src="${imagen}" width="100"> </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
        `;

        contenidoCarrito.appendChild(row);

    });

    guardarLocalStorage();

}

function limpiarHTML() {

    // Removemos todos los hijos del contenido
    while(contenidoCarrito.firstChild) {

        contenidoCarrito.removeChild(contenidoCarrito.firstChild);

    }

}

function guardarLocalStorage() {

    localStorage.setItem('productos', JSON.stringify(cursosCarrito));

}