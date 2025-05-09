import { petService } from "../service/pet-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    
    if (!id) {
        window.location.href = "../screens/error.html";
        return;
    }
    
    const nombre = document.querySelector("[data-nombre]");
    const edad = document.querySelector("[data-edad]");
    const descripcion = document.querySelector("[data-descripcion]");
    
    try {
        const mascota = await petService.obtenerMascota(id);
        if (mascota.nombre) {
            nombre.value = mascota.nombre;
            edad.value = mascota.edad || "";
            descripcion.value = mascota.descripcion || "";
        } else {
            throw new Error();
        }
    } catch (error) {
        console.error("Error:", error);
        window.location.href = "../screens/error.html";
    }
};

obtenerInfo();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector("[data-nombre]").value;
    const edad = document.querySelector("[data-edad]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;
    
    petService.actualizarMascota(nombre, edad, descripcion, id)
        .then(() => {
            window.location.href = "../screens/edicion_concluida_pet.html";
        })
        .catch((error) => {
            console.error(error);
            window.location.href = "../screens/error.html";
        });
});
