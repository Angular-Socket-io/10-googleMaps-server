import {Request, Response, Router} from 'express'
import { Server } from '../models/server.models';
import {Grafica} from "../classes/grafica";
//import { mapa } from '../controllers/sockets.controller';
import { Mapa } from '../classes/mapa';

const router = Router();
const grafica = new Grafica;


// Mapa
export const mapa = new Mapa();
const lugares = [
    {
      id: '1',
      nombre: 'Udemy',
      lat: 37.784679,
      lng: -122.395936
    },
    {
      id: '2',
      nombre: 'Bahía de San Francisco',
      lat: 37.798933,
      lng: -122.377732
    },
    {
      id: '3',
      nombre: 'The Palace Hotel',
      lat: 37.788578,
      lng: -122.401745
    }
  ];

mapa.marcadores.push( ...lugares );

// Mapa
router.get('/mapa', ( req: Request, res: Response  ) => {
    res.json( mapa.getMarcadores() );
});


////
router.get('/grafica',(req,res) =>{
    const data = grafica.getDataGrafica()
    res.json({
        ok: true,
        data
    })
})

router.post('/grafica',(req, res) =>{
    const numPregunta = req.body.pregunta;
    const valor = Number(req.body.valor);
    const payload = {numPregunta, valor};
    const server = Server.instance;
    
    grafica.incrementarValor(numPregunta, valor)
    const data = grafica.getDataGrafica()
    server.io.emit('cambiar-grafica',data);
    res.json({
        ok: true,
        data
    })
})


export default router;