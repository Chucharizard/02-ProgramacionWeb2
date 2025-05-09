import { petService } from "../service/pet-service.js";

const crear_nueva_fila = (nombre, edad, descripcion, id) => {
    const fila = document.createElement('tr');
    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${edad}</td>
        <td>${descripcion || ''}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_pet.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" type="button" id="${id}">Eliminar</button>
                </li>
            </ul>
        </td>
    `;
    fila.innerHTML = contenido;
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        petService.eliminarMascota(id)
            .then(() => {
                alert("Mascota eliminada");
                fila.remove();
            })
            .catch(error => alert("Error al eliminar la mascota"));
    });
    return fila;
};

const table = document.querySelector("[data-table]");

petService.lista_mascotas()
    .then(data => {
        data.forEach(({ nombre, edad, descripcion, id }) => {
            const nuevaFila = crear_nueva_fila(nombre, edad, descripcion, id);
            table.appendChild(nuevaFila);
        });
    })
    .catch(error => alert("Ocurrió un error al cargar las mascotas"));
