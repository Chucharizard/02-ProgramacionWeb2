import {Grid, Card, CardContent, Typography, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const BookList = ({libros, onDelete, onEdit}) => (
    <Grid container spacing={2}>
        {libros.map((libro) => (
        <Grid size={{ xs: 12, sm: 6 }} key={libro.Id}>
            <Card variant='outlined'>
                <CardContent>
                    <Typography variant='h6'>{libro.Titulo}</Typography>
                    <Typography variant='body2' color='secondary'>{libro.Autor} ({libro.Anio})</Typography>
                    <IconButton color='primary' onClick={() => onEdit(libro)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton color='error' onClick={() => onDelete(libro.Id)}>
                        <DeleteIcon/>
                    </IconButton>
                </CardContent>
            </Card>
        </Grid>
        ))}
    </Grid>
);

export default BookList;