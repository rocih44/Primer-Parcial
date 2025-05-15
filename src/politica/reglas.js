const seguridad = [
    {
        regla: "Longitud minima de 8 caracteres",
        fn: (password)=> password.length >= 8, 
    },
    {
        regla: "Longitud maxima de 12 caracteres",
        fn: (password)=> password.length<=12,
    },
    {
        regla: "No puede contener espacios en blanco",
        fn: (password)=> {
            const sinEspacio = password.split(" ");
            return sinEspacio
        }
    },
    {
        regla: "Contener al menos uno de los sig. caracteres",
        fn: (password)=> {
            const caracteres= ['!', '#', '$', '%','&', '='];
            return caracteres.some ( (c)=> password.includes(c));
        }
    },
    {
        regla: "Contener al menos un numero",
        fn: (password)=> {
            const numeros= ['0', '1', '2', '3','4', '5', '6', '7', '8', '9'];
            return numeros.some ( (n)=> password.includes(n));
        }
    },
{
        regla: "El último dígito no debe tener ciertos caracteres",
        fn: (password) => {
            const prohibidos = ['!', '#', '$', '%', '&', '='];
            const ultimoCaracter = password.trim().slice(-1);
            return !prohibidos.includes(ultimoCaracter);
    }
}


]
const validacion= (usuario)=> seguridad.every((r)=> r.fn(usuario.password));

module.exports= {seguridad, validacion};
