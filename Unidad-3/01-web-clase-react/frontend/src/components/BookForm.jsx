import {TextField, Button, Box} from '@mui/material'

const BookForm = ({libro, onChange, onSubmit, editando, onCancel}) => (
    <Box component='form' sx={{mb:4, display:'flex', gap:2}}>
        <TextField label='Titulo' name='titulo' value={libro.titulo} onChange={onChange} fullWidth/>
        <TextField label='Autor' name='autor' value={libro.autor} onChange={onChange} fullWidth/>
        <TextField label='Año' name='anio' value={libro.anio} onChange={onChange} fullWidth/>
        <Button variant='contained' color='primary' onClick={onSubmit}>
            {editando ? 'Actualizar' : 'Agregar'}
        </Button>
        {editando && (
            <Button variant='outlined' onClick={onCancel}>
                Cancelar
            </Button>
        )}
    </Box>
);

export default BookForm;