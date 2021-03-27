import express from 'express';
import authMiddleware from './middlewares/authMiddleware';
import indexRoutes from './routes/indexRoutes';

const app = express();
//Permite converter o dado que vem em json
app.use(express.json());
//Converter dados de um formulario em JSON
app.use(express.urlencoded({extended: false}));

//Protegendo as rotas, exceto a de login e criacao de usuario
app.use(/\/((?!login)(?!createUser).)*/, authMiddleware);

//Importa as rotas
app.use(indexRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
