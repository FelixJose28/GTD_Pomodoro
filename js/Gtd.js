$(function() {
    $("#header").load("Header.html")
});
//variables
const formulario = document.querySelector('#formulario');
const cardMostrar = document.querySelector('#cardMostrar');
const btnCancelar = document.querySelector('#btnCancelar');
const btnEditar = document.querySelector('#btnEditar');

let = listaTareas = []
let edit = false
let indexToEdit = 0

const crearItem = (titulo, descripcion, fecha, radioB) => {

    const item = {
        titulo: titulo,
        descripcion: descripcion,
        fecha: fecha,
        radioB: radioB
    }
    listaTareas.push(item)
}

const Guardar = () => {

    localStorage.setItem('listaTareas', JSON.stringify(listaTareas))
    renderTareas()

}

const ponerEspera = (a) =>{

}


const renderTareas = () => {

    cardMostrar.innerHTML = ''

    listaTareas = JSON.parse(localStorage.getItem('listaTareas'))
    //console.log(listaTareas)

    if (listaTareas === null) {
        listaTareas = []
    } else {
        listaTareas.forEach((den, i) => {
            cardMostrar.innerHTML += `

                <div class="col-6 mb-3">
                    <div class="card p-2 mt-2 ${den.radioB}">
                        <div>
                            <h2 class="text-white text-center text-uppercase">${den.titulo}</h2>
                        </div>
                        <div>
                            <p class="pBold text-white ">Descripcion</p>
                            <p class="text-white">${den.descripcion}</p>
                        </div>
                        <div>
                            <p class="pBold text-white">Fecha</p>
                            <p class="text-white" >${den.fecha}</p>
                        </div>
                            <button id="btnTerminado" onclick="Delete(${i})" class="mx-auto  w-50">Terminada</button>
                        </div>
                </div>
 `
        });
    }
}

const Delete = (index) => {
    
    Swal.fire({
        title: 'Seguro que esta tarea esta finalizada?',
        showDenyButton: true,
        denyButtonText: 'No',
        confirmButtonText: `Si`,
        showConfirmButtom: true,
    }).then((result) => {
        if (result.isConfirmed) {
            listaTareas.splice(index, 1)
            Guardar();
        }
    });



}



formulario.addEventListener('submit', (e) => {
    let radioB = document.querySelector('input[type="radio"]:checked');
    e.preventDefault();

    let titulo = document.querySelector('#titulo').value;
    let descripcion = document.querySelector('#descripcion').value;
    let fecha = document.querySelector('#fecha').value;
    let radioBa = radioB.value;


    crearItem(titulo, descripcion,fecha, radioBa)
    Guardar()

    formulario.reset()
})

document.addEventListener('DOMContentLoaded', renderTareas)