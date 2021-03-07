import express from 'express';
import indexRoutes from './routes/indexRoutes';

const app = express();
//Permite converter o dado que vem em json
app.use(express.json());
//Converter dados de um formulario em JSON
app.use(express.urlencoded({extended: false}));

//Importa as rotas
app.use(indexRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));