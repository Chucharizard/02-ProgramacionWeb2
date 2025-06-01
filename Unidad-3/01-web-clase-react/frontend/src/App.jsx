import { useState, useEffect } from "react";
import {Container, Typography} from '@mui/material'
import BookList from "./components/BookList"
import BookForm from "./components/BookForm"

const App = () => {
  const [libros, setLibros] = useState([]);
  const [nuevoLibro, setNuevoLibro] = useState({titulo:'', autor:'', anio:''});
  const [editandoId, setEditandoId] = useState(null);
  const [filtro, setFiltro] = useState('');

  const obtenerLibros = async() => {
    const res = await fetch('http://localhost:5000/api/libros')
    const data = await res.json();
    setLibros(data);
  };
  useEffect(() => {
    obtenerLibros();
  },[]);

  const handleChange = (e) => {
    setNuevoLibro({...nuevoLibro, [e.target.name]: e.target.value});
  };

  const agregarLibro = async () => {
    if(!nuevoLibro.titulo || !nuevoLibro.autor || !nuevoLibro.anio) return;
    
    if (editandoId) {
      // Actualizar libro existente
      await fetch(`http://localhost:5000/api/libros/${editandoId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(nuevoLibro)
      });
      setEditandoId(null);
    } else {
      // Crear nuevo libro
      await fetch('http://localhost:5000/api/libros', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(nuevoLibro)
      });
    }
    
    setNuevoLibro({titulo:'', autor:'', anio:''});
    obtenerLibros();
  }

  const eliminarLibro = async(id) => {
    try {
      await fetch(`http://localhost:5000/api/libros/${id}`, {
        method: 'DELETE'
      });
      obtenerLibros(); // Recargar la lista
    } catch(err) {
      console.error('Error al eliminar:', err);
    }
  }

  const editarLibro = (libro) => {
    setNuevoLibro({
      titulo: libro.Titulo,
      autor: libro.Autor,
      anio: libro.Anio
    });
    setEditandoId(libro.Id);
  }

  const cancelarEdicion = () => {
    setNuevoLibro({titulo:'', autor:'', anio:''});
    setEditandoId(null);
  }

  const handleBuscar=(e) => {
    setFiltro(e.target.value);
  }
  const librosFiltrados = libros.filter((libro) =>
    libro.Titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    libro.Autor.toLowerCase().includes(filtro.toLowerCase())
  );
  return (
    <Container maxWidth='md' sx={{mt:4}}>
      <Typography variant='h4' gutterBottom>Mi primera app en React con Vite</Typography>
      <BookForm 
        libro={nuevoLibro} 
        onChange={handleChange} 
        onSubmit={agregarLibro}
        editando={editandoId !== null}
        onCancel={cancelarEdicion}
      />
      <BookList 
        libros={libros} 
        onDelete={eliminarLibro}
        onEdit={editarLibro}
      />
    </Container>
  )
}

export default App;

/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/
