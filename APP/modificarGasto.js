let gastos = JSON.parse(localStorage.getItem('gastos'));

const id = getUrlVars()['id']
const index = gastos.map( (gasto) => gasto.indiceGasto).indexOf(parseInt(id));

console.log(index);


 tipoGasto = gastos[index].tipoGasto,
 cantidad = gastos[index].cantidad,
 fechaGasto = gastos[index].fechaGasto,
 ingresoEgreso = gastos[index].ingresoEgreso,
btnModificar = document.querySelector('#btnModificar');

document.querySelector('#tipoGasto').value = tipoGasto;
document.querySelector('#cantidadGasto').value = cantidad;
document.querySelector('#fechaGasto').value = fechaGasto;
document.querySelector('#IngresoEgreso').value = ingresoEgreso;

btnModificar.addEventListener('click',modificar);

function modificar(ev) {
    console.log(index);
    const tipoGastoM = document.querySelector("#tipoGasto").value;
    const cantidadM = document.querySelector("#cantidadGasto").value;
    const fechaGastoM = document.querySelector("#fechaGasto").value;
    const ingresoEgresoM = document.querySelector("#IngresoEgreso").value;

    // // debugger;

    gastos.forEach((gasto) => {
      if (gasto.indiceGasto == id) {
        gasto.tipoGasto = tipoGastoM;
        gasto.cantidad = cantidadM;
        gasto.fechaGasto = fechaGastoM;
        gasto.ingresoEgreso = ingresoEgresoM;
      }
    });
  
    // // debugger;

    localStorage.setItem("gastos", JSON.stringify(gastos));
    window.location.href = "index.html";
  }


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}