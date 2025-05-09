import { petService } from "../service/pet-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const edad = document.querySelector("[data-edad]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;

    petService
        .crearMascota(nombre, edad, descripcion)
        .then(() => {
            window.location.href = "../screens/registro_completo_pets.html";
        })
        .catch((error) => {
            console.error(error);
            window.location.href = "../screens/error.html";
        });
});