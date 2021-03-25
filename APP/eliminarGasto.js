let gastos = JSON.parse(localStorage.getItem('gastos'));


const id = getUrlVars()['id'];

const index = gastos.map( (gasto) => gasto.indiceGasto).indexOf(parseInt(id));


 tipoGasto = gastos[index].tipoGasto,
 cantidad = gastos[index].cantidad,
 fechaGasto = gastos[index].fechaGasto,
 ingresoEgreso = gastos[index].ingresoEgreso,
 btnModificar = document.querySelector('#btnEliminar');

document.querySelector('#tipoGasto').value = tipoGasto;
document.querySelector('#cantidadGasto').value = cantidad;
document.querySelector('#fechaGasto').value = fechaGasto;
document.querySelector('#IngresoEgreso').value = ingresoEgreso;

btnModificar.addEventListener('click',eliminarGasto);



function eliminarGasto(ev) {
     
    // const index = gastos.map(function (gasto) {return gasto.indiceGasto} ).indexOf(parseInt(id));
     const index = gastos.map( (gasto) => gasto.indiceGasto).indexOf(parseInt(id));
     index > -1 && gastos.splice(index, 1);

    renumerarIndices(gastos)

    localStorage.setItem("gastos", JSON.stringify(gastos));
    window.location.href = "index.html";
}


function renumerarIndices(gastos) {

    gastos.forEach((gasto,indice) => {

        gasto.indiceGasto = indice;

    });

     return gastos;
}


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}