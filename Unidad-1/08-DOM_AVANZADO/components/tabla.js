import cards from "./cards.js";
const tabla = (() => {
    const cuerpoTabla = document.getElementById('taskTable').getElementsByTagName('tbody')[0]; //recupero el cuerpo de la tabla
    //recupero el cuerpo de la tabla    

    const addTask = (task) => {
        const nuevaFila = cuerpoTabla.insertRow(); //inserto una fila en la tabla
        nuevaFila.insertCell(0).textContent = task.task; //inserto una celda en la fila
        nuevaFila.insertCell(1).textContent = task.description; 
        nuevaFila.insertCell(2).textContent = task.date;
        nuevaFila.insertCell(3).textContent = task.priority;

        const accionCell = nuevaFila.insertCell(4); 
        const accions = document.createElement('div'); //creo un div
        accions.className= 'actions'; //le asigno una clase

        //crear boton
        const completeButton = document.createElement('button'); 
        completeButton.textContent = 'completar';
        completeButton.className = 'view';
        completeButton.addEventListener('click',()=>{
            nuevaFila.classList.toggle('completed');

            cards.update();
        });

        accions.appendChild(completeButton); //agrego el boton al div

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'eliminar';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click',()=>{
            cuerpoTabla.deleteRow(nuevaFila.rowIndex-1);

            cards.update();

        });

        accions.appendChild(deleteButton); //agrego el boton al div
        accionCell.appendChild(accions); //agrego el div a la celda

    };
//recupero los datos de la tabla
const getTasks = () => {
    return Array.from(cuerpoTabla.rows).map(row=>( {
        task: row.cells[0].textContent,
        description: row.cells[1].textContent,
        date: row.cells[2].textContent,
        priority: row.cells[3].textContent,
        completed: row.classList.contains('completed')

        
    }));
};

return {addTask, getTasks};

})();

export default tabla; //exporto la funcion tabla