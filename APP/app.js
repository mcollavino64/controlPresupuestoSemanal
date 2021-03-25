let restante = 0;

// let indiceGasto = localStorage.length;

console.log(indiceGasto)
const guardarPresupuesto = ()=>{


    let presupuesto =parseInt(document.querySelector('#presupuestoInicial').value);

    if(presupuesto < 1 || isNaN(presupuesto)){
        mostrarError("#msj_error_pregunta","CANTIDAD NO VALIDA")
        return;
    }

    localStorage.setItem("presupuesto",presupuesto);
    localStorage.setItem("gastos",JSON.stringify([]));
    actualizarVista();
}

const actualizarVista=()=>{
    let presupuesto=localStorage.getItem("presupuesto");
    
    restante = presupuesto;

    let divPregunta = document.querySelector("#pregunta");
    let divGastos = document.querySelector("#divGastos");
    let divControlGastos = document.querySelector("#divControlGastos");

    divPregunta.style.display="none";
    divGastos.style.display="none";

    let controlGastos=`<div class="gastos-realizados">
                            <h2>Listado de Gastos</h2>
                            <div class="alert alert-primary">
                            Presupueto :${presupuesto}</div>
                            <div class="alert alert-success">
                            Restante :${presupuesto}</div>
                        </div>`;

    if(!presupuesto){
        divPregunta.style.display='block';
    }else{
        divPregunta.style.display='none';
        divGastos.style.display='block';
        divControlGastos.innerHTML=controlGastos;

        refrescarListado();
    }
}

const agregarGasto=()=>{
    tipoGasto = document.querySelector('#tipoGasto').value;
    cantidad = parseInt(document.querySelector('#cantidadGasto').value);
    fechaGasto = document.querySelector('#fechaGasto').value;
    ingresoEgreso = document.querySelector('#IngresoEgreso').value;


    if(cantidad<1 || isNaN(cantidad) || tipoGasto.trim()==='' || ingresoEgreso === ''){
        mostrarError('#msj_error_creargasto','COMPLETAR TODOS LOS CAMPOS');
        return;
    }

    console.log(restante)
    if(cantidad>restante && ingresoEgreso=='Egreso'){
        mostrarError('#msj_error_creargasto','ERROR CANTIDAD MAYOR AL RESTANTE');
        return;
    }


    let NuevoGasto ={
        indiceGasto,
        tipoGasto,
        cantidad,
        fechaGasto,
        ingresoEgreso
    }

    let gastos=JSON.parse(localStorage.getItem('gastos'));
    gastos.push(NuevoGasto);
    localStorage.setItem('gastos',JSON.stringify(gastos));


    indiceGasto+=1;
    
    refrescarListado();

    document.querySelector('#formGastos').reset();
    

}

const refrescarListado=()=>{

    let presupuesto=localStorage.getItem("presupuesto");
    let gastos=JSON.parse(localStorage.getItem('gastos'));

    let totalGastos=0;
    let listadoHTML=``;

    gastos.map(gasto=>{
        listadoHTML+=`<li class="list-group-item list-group-item-action list-group-item-success">
                        <p> ${gasto.tipoGasto} <span>/ ${gasto.fechaGasto}</span>
                            <span 
                                class='list-group-item list-group-item-action list-group-item-secondary' > $ ${gasto.cantidad} - Tipo: ${gasto.ingresoEgreso}                                                              
                                <i class="fas fa-edit icon-edit" onclick="modificarGasto(${gasto.indiceGasto})" ></i>
                                <i class="fa fa-trash icon-delete" aria-hidden="true" onclick="eliminarGasto(${gasto.indiceGasto})"  ></i>
                            </span>
                        </p>
                    </li>`;
        
        if(gasto.ingresoEgreso=='Ingreso'){
            CantidadPresupuesto = parseInt(presupuesto) + parseInt(gasto.cantidad);
            presupuesto=CantidadPresupuesto
        }else{
            totalGastos+=parseInt(gasto.cantidad);
        }
    });
    ///   console.log("Total de gastos: " + totalGastos) ;

   restante = presupuesto-totalGastos;
   presupuesto = restante;

   let divControlGastos=document.querySelector('#divControlGastos');
   divControlGastos.innerHTML=``;

    if ((presupuesto/4)>restante) {
        clase = 'alert alert-danger'
    } else {
        if ((presupuesto/2)>restante) {
            clase = 'alert alert-warning'
        } else {
            clase = 'alert alert-success'
        }
    }

    divControlGastos.innerHTML=`<div class='gastos-realizados'>
                                    <h2>Listado de Gastos</h2>
                                    ${listadoHTML} 
                                    <div class="alert alert-primary">
                                    Presupueto :${presupuesto} </div>
                                    <div class='${clase}'>
                                    Restante :${restante}</div>

                                    <button 
                                        onclick='reiniciarPresupuesto()' 
                                        class='button button-primary'> Reiniciar Presupuesto 
                                    </button>

                                </div>`;

}

const modificarGasto=(id)=>{

    window.location.href = ('modificar.html?id' + '=' + id)

}

const eliminarGasto=(id)=>{
    window.location.href = ('eliminar.html?id' + '=' + id)
}



const reiniciarPresupuesto=()=>{
    localStorage.clear();
    location.reload(true); //recargar la pagina
}

const mostrarError=(elemento,mensaje)=>{
    divError=document.querySelector(elemento);
    divError.innerHTML=`<p class="alert alert-danger error">${mensaje}</p>`;
    setTimeout(() => { divError.innerHTML= ``;}, 2000);
}