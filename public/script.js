const botonVaciarCarrito = document.querySelector('#vaciar-carrito')
const cajaCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const submenu = document.querySelector('.submenu');
let listaCursosCarrito = [];


eventos();
function eventos() {
    submenu.addEventListener('click', añadirClaseSubmenu);
    listaCursos.addEventListener('click', añadirContenido);
    cajaCarrito.addEventListener('click', eliminarCurso);
    botonVaciarCarrito.addEventListener('click', vaciarCarrito)
}

function añadirContenido(e) {

    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        informacionCurso(cursoSeleccionado);
    }

}

function informacionCurso(cursoSeleccionado) {
    const informacionCursoSeleccionado = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('.agregar-carrito').dataset.id,
        cantidad: 1
    }

    const revisarCursos = listaCursosCarrito.some(curso => curso.id === informacionCursoSeleccionado.id);
    if (revisarCursos) {
        const nuevaListaCursosCarrito = listaCursosCarrito.map(curso => {
            if (curso.id === informacionCursoSeleccionado.id) {
                curso.cantidad++;
                return curso
            }
            else {
                return curso;
            }
        })
        listaCursosCarrito = nuevaListaCursosCarrito;
    } else {
        listaCursosCarrito = [...listaCursosCarrito, informacionCursoSeleccionado]
    }
    eliminarCursoRepetido();

    añadirHtml();
}

function eliminarCursoRepetido() {
    while (cajaCarrito.firstChild) cajaCarrito.removeChild(cajaCarrito.firstChild);
}

function añadirHtml() {
    listaCursosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>  
                 <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad} </td>
            <td>
                 <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
       `
        cajaCarrito.appendChild(row);
    })
}

function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const id = e.target.dataset.id;
        listaCursosCarrito = listaCursosCarrito.filter(curso => curso.id != id);
        eliminarCursoRepetido();
        añadirHtml();
    }
}

function añadirClaseSubmenu(e) {
    const clase = 'submenu--active';
    if (e.target.classList.contains('submenu') || e.target.getAttribute('id') == 'img-carrito') {
        submenu.classList.contains(clase) ? submenu.classList.remove(clase) : submenu.classList.add(clase);
    }
}

function vaciarCarrito(e) {
    e.preventDefault();
    listaCursosCarrito = [];
    eliminarCursoRepetido();
}

