
// Guardaremos los contactos en este array
// Las variables declaradas fuera de las funciones son globales
let personas = []
// Guardaremos en esta variable la persona que esté seleccionada
let idPersonaSel = null

let trSeleccionado = null

function insertarPersona(){
    let persona = {
        id        : Math.round(Math.random()*10000),
        nombre    : document.getElementById("nombre").value,
        direccion : document.getElementById("direccion").value,
        telefono  : document.getElementById("telefono").value,
        correoE   : document.getElementById("correoE").value,
    }
    //La añadimos al array
    personas.push(persona)
    //Vaciamos el formulario
    vaciarFormulario()
    //Actualizamos la tabla
    rellenarTabla()
}

function vaciarFormulario(){
    //Vaciamos tambien la variable en la que guardamos el id de la persona seleccionada
    idPersonaSel = null;
    document.getElementById("nombre").value    = ""
    document.getElementById("direccion").value = ""
    document.getElementById("telefono").value  = ""
    document.getElementById("correoE").value   = ""
    if(trSeleccionado){
        trSeleccionado.style.background = "white"
    }
    modoInsercion()
}

function rellenarFormulario(persona){
    idPersonaSel = persona.id
    document.getElementById("nombre").value    = persona.nombre
    document.getElementById("direccion").value = persona.direccion
    document.getElementById("telefono").value  = persona.telefono
    document.getElementById("correoE").value   = persona.correoE
    modoSeleccion()
}

function rellenarTabla(){
    let tablaPersonas = document.getElementById("tablaPersonas")
    tablaPersonas.innerHTML = ""
    for(let persona of personas){
        let tr   = document.createElement("tr")
        let td1  = document.createElement("td")
        let td2  = document.createElement("td")
        let td3  = document.createElement("td")
        let td4  = document.createElement("td")
        let txt1 = document.createTextNode(persona.nombre)
        let txt2 = document.createTextNode(persona.direccion)
        let txt3 = document.createTextNode(persona.telefono)
        let txt4 = document.createTextNode(persona.correoE)
        td1.append(txt1)
        td2.append(txt2)
        td3.append(txt3)
        td4.append(txt4)
        tr.append(td1, td2, td3, td4)

        //Esta funcion es una función anidada
        //Ej JS las funciones anidadas son closures
        //Cuando se declara una función anidada que utiliza una variable de la función nido
        //la funcion anidada tendrá declarada de manera implícita dicha variable con el valor
        //correspondiente es su contexto
        tr.onclick = function(){
            //La variable persona no está declarada aqui!
            rellenarFormulario(persona)
            tr.style.background = "#FABADA"
            if(trSeleccionado){
                trSeleccionado.style.background = "white"
            }
            trSeleccionado = tr
        }
        tablaPersonas.append(tr)
        //Para que se rellene la segunda tabla
        rellenarTabla2()
    }
}

function rellenarTabla2(){
    let tablaPersonas2 = document.getElementById("tablaPersonas2")
    tablaPersonas2.innerHTML = ""

    for(let persona of personas){
        let trHtml =
        `<tr>
            <td>${persona.nombre}</td>
            <td>${persona.direccion}</td>
            <td>${persona.telefono}</td>
            <td>${persona.correoE}</td>
        </tr>`

        let tbody = document.createElement("tbody")
        tbody.innerHTML = trHtml

        //let tr = tbody.childNodes[0]
        let tr = tbody.firstElementChild
        tr.onclick = function(){
            rellenarFormulario(persona)
        }

        tablaPersonas2.append(tr)
    }
}

function borrarPersona(){
    for(a=0; a<personas.length; a++){
        let persona = personas[a]
        if(persona.id==idPersonaSel){
            personas.splice(a,1)
            break
        }
    }
    rellenarTabla()
    vaciarFormulario()
}

function modificarPersona(){
    for(let persona of personas){
        if(persona.id == idPersonaSel){
            persona.nombre    = document.getElementById("nombre").value
            persona.direccion = document.getElementById("direccion").value
            persona.telefono  = document.getElementById("telefono").value
            persona.correoE   = document.getElementById("correoE").value
            break
        }
    }
    rellenarTabla()
    vaciarFormulario()
}

//Para cuando no hay nada seleccionado en la tabla
function modoInsercion(){
    document.getElementById("btnInsertar").disabled  = false
    document.getElementById("btnModificar").disabled = true
    document.getElementById("btnBorrar").disabled    = true
}

//Para cuando el usuario selecciona una persona
function modoSeleccion(){
    document.getElementById("btnInsertar").disabled  = true
    document.getElementById("btnModificar").disabled = false
    document.getElementById("btnBorrar").disabled    = false
}

function guardarDatos(){
    //En el session/local storage solo podemos guardar cadenas de texto
    //sessionStorage.setItem("clave","valor")
    //sessionStorage.getItem("clave")
    //sessionStorage.removeItem("clave")
    //sessionStorage.clear()

    //localStorage.setItem("clave","valor")
    //localStorage.getItem("clave")
    //localStorage.removeItem("clave")
    //localStorage.clear()

    //No podemos guardar directamente el array
    //localStorage.setItem("personas", personas)
    localStorage.setItem("personas", JSON.stringify(personas))
}

function cargarDatos(){
    let personasJSON = localStorage.getItem("personas")
    //if( personasJSON != null){
    if( personasJSON ) {
        personas = JSON.parse(personasJSON)
        rellenarTabla()
    }
}

function inicializar(){
    document.getElementById("btnInsertar").onclick  = insertarPersona
    document.getElementById("btnVaciar").onclick    = vaciarFormulario
    document.getElementById("btnModificar").onclick = modificarPersona
    document.getElementById("btnBorrar").onclick    = borrarPersona
    document.getElementById("btnGuardar").onclick   = guardarDatos

    cargarDatos()
    modoInsercion()
}

window.onload = inicializar