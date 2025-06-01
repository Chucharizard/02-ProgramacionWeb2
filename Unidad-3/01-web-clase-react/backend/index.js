const express = require('express');
const cors=require('cors');
const sql=require('mssql');

const app=express();
app.use(cors());
app.use(express.json());

const config = {
    user:'library_user',
    password:'Library123!',
    server:'localhost',
    database:'BibliotecaDB',
    options:{
        encrypt:false,
        trustServerCertificate:true
    }
};

let pool;

const conectarBD = async() => {
    try {
        pool=await sql.connect(config);
        console.log('Conectado a la base de datos exitosamente');
    }catch(err) {
        console.error('todo mal', err);
    }
};

app.get('/api/libros', async(req, res) => {
    try {
        const result = await pool.request()
            .query('SELECT * FROM Libros ORDER BY Id DESC');
        res.json(result.recordset);
    } catch(err) {
        console.error('Error al obtener libros:', err);
        res.status(500).send('Error al obtener libros');
    }
});

app.post('/api/libros', async(req, res) => {
    const {titulo, autor, anio} = req.body;
    if (!titulo || !autor || !anio) {
        return res.status(400).send('datos incompletos')
    }
    try {
        await pool.request()
        .input('titulo', sql.VarChar, titulo)
        .input('autor', sql.VarChar, autor)
        .input('anio', sql.VarChar, anio)
        .query('INSERT INTO Libros (Titulo, Autor, Anio) VALUES (@titulo, @autor, @anio)');
        res.sendStatus(200);
    }catch(err) {
        console.error('No se pudo agregar', err);
        res.status(500).send('Error en cargado')
    }
});

app.delete('/api/libros/:id', async(req, res) => {
    const { id } = req.params;
    try {
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Libros WHERE Id = @id');
        res.sendStatus(200);
    } catch(err) {
        console.error('Error al eliminar libro:', err);
        res.status(500).send('Error al eliminar libro');
    }
});

app.put('/api/libros/:id', async(req, res) => {
    const { id } = req.params;
    const { titulo, autor, anio } = req.body;
    if (!titulo || !autor || !anio) {
        return res.status(400).send('datos incompletos');
    }
    try {
        await pool.request()
            .input('id', sql.Int, id)
            .input('titulo', sql.VarChar, titulo)
            .input('autor', sql.VarChar, autor)
            .input('anio', sql.Int, anio)
            .query('UPDATE Libros SET Titulo = @titulo, Autor = @autor, Anio = @anio WHERE Id = @id');
        res.sendStatus(200);
    } catch(err) {
        console.error('Error al actualizar libro:', err);
        res.status(500).send('Error al actualizar libro');
    }
});

const PORT = 5000;
app.listen(PORT, async() => {
    console.log('corre');
    await conectarBD();
})