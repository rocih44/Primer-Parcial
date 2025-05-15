const express = require("express");
const app = express();
const usrs = require('./data/usuarios.json');
const {seguridad, validacion}= require('./politica/reglas.js');
const puerto = process.env.PORT ?? 3007;

app.use (express.json());

app.get ('/usuarios', (req,res)=>{
    res.status(200).json(usrs);
});

app.get('/validador', (req,res)=>{
    const invalidos = usrs
    .filter(usuario => !validacion(usuario))
    .map(usuario => ({nombre:usuario.userName,email:usuario.email}));
    res.status(201).json(invalidos)
});



app.get('/validador-validados', (req, res)=> {
    try {
        const validados = usrs.filter((u)=> validacion(u));
        const respuesta = validados.map((usu)=> ({
            userName: usu.userName,
            email: usu.email
        }));

        console.log(usrs);
        res.status(200).json(respuesta);
    } catch (error) {
        console.error('Error al validar contraseñas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(puerto, ()=>{
    console.log(`La aplicacion inicio en el puerto: ${puerto}`);
});


