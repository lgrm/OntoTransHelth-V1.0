const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(routes);

/**
 * Rota/ Recurso
 */
/**
 * Métodos HTTP:
 * 
 * GET: Buscar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 
 /** 
  * Tipos de parâmetros:
  * 
  * Query Params:  Parâmetro nomeados enviados na rota após "?"
  * Route Params: Parâmetros utilizados para ifentificar recursos
 */



app.listen(3333);


