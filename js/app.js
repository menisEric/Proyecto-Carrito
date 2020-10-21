//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
	//Cuando agregas un curso presionando "Agregar al Carrito"
	listaCursos.addEventListener('click', agregarCursos);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', () => {

     	articulosCarrito = [];

     	vaciarCarrito();
     });

}


// Funciones
function agregarCursos(e){
	if (e.target.classList.contains('agregar-carrito')) {
		const cursoSeleccionado = e.target.parentElement.parentElement;
		
		leerDatosCurso(cursoSeleccionado);
	}

}



//lee el conteniddo del HTML al que le dimos click 
function leerDatosCurso(curso) {

	//Crear un objeto con el contenido actual
	const infoCurso = {
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1
	}
	
	if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     console.log(articulosCarrito)

	carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {

	//Limpiar el HTML
	vaciarCarrito();


	//Recorre el carrito y genera el HTML
	articulosCarrito.forEach( curso => {
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>
				<img src="${curso.imagen}" width="100">
			</td>
			<td>${curso.titulo}</td>
			<td>${curso.precio}</td>
			<td>${curso.cantidad}</td>
			<td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
              </td>
		`;

		//Agrega el HTML del carrito en el body
		contenedorCarrito.appendChild(row);
	});
}


//Elimina los cursos del body
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}











