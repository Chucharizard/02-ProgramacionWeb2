const Form = (() => {

    //recuperando data de formulario
const form = document.querySelector('[data-form]');
const inputTask = document.querySelector('[data-input-task]');
const inputDescription = document.querySelector('[data-input-descripcion]');
const date = document.querySelector(['data-input-fecha'])
const inputPrioridad= document.querySelector(['data-input-prioridad'])

const datosForm=()=>{
    return{
        task: inputTask.value.trim(),
        description: inputDescription.value.trim(),
        date: date.value.trim(),
        priority: inputPrioridad.value.trim(),
    }
};

})