const fs = require('fs');
const {parse} = require('csv');

const {getAnimes, getAnimeById, createAnime} = require('../services/animes.service');

let animeAll = async (req, res) => {
    let animes = await getAnimes();
    return animes;
}

let animeById = async (id) => {
    let animes = await getAnimeById(id);
    return animes[0];
}

let csvImport = async (req, res) => {
    let index = 0;
    const parseador = parse({
        delimiter: ',',//Delimitador, por defecto es la coma ,
        cast: true, // Intentar convertir las cadenas a tipos nativos
        comment: '' // El carácter con el que comienzan las líneas de los comentarios, en caso de existir
    });
    parseador.on('readable',async function () {
        let fila;
        while (fila = parseador.read()) {
            if(index !== 0){
                let data = {
                    "id": parseInt(fila[0]),
                    "name" : fila[1],
                    "genre" : fila[2].split(', '),
                    "type" : fila[3],
                    "episodes" : fila[4],
                    "ratiung" : fila[5].toString(),
                    "members" : fila[6]
                }
                await createAnime(data);
            }else{
                index = 1;
            }
            
        }
    });
    
    parseador.on('error', function (err) {
        console.error("Error al leer CSV:", err.message);
    });
    
    fs.createReadStream("anime.csv") // Abrir archivo
        .pipe(parseador) // Pasarlo al parseador a través de una tubería
        .on("end", function () {// Y al finalizar, terminar lo necesario
            console.log("Se ha terminado de leer el archivo");
            parseador.end();
        });
    res.send('paso');
    // let animes = await getAnimes();
    // res.send(animes);
}
module.exports = {
    animeAll,
    animeById,
    csvImport
}