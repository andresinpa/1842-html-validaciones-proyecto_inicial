export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
       validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
];

const mensajesDeError ={
    nombre: {
        valueMissing: 'Este campo no puede estar vacio'
    },
    email: {
        valueMissing: 'Este campo no puede estar vacio',
        typeMismatch: 'El correo no es válido'
    },
    password: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'Al menos 6 caracteres, máximo 12 debe contener minimo una mayuscula, una minuscula y no puede tener caracteres especiales'
    },
    nacimiento: {
        valueMissing: 'Este campo no puede estar vacio',
        CustomError: 'Debe tener más de 18 años de edad',
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El formato requerido es xxxxxxxxxx',
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La dirección debe tener entre 10 y 40 caracteres',
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La ciudad debe tener entre 4 y 40 caracteres',
    },
    estado: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El estado debe tener entre 4 y 40 caracteres',
    }


}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
           console.log(mensajesDeError[tipoDeInput][error])
           mensaje = mensajesDeError[tipoDeInput][error]
        }
    })
    return mensaje
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje ="";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    console.log(fecha + " ----- " + fechaActual)
    return diferenciaFechas <= fechaActual;

}