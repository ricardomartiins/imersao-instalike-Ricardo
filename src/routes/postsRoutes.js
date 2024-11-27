// Importa o framework Express para criar aplicações web
import express from "express";

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Importa o módulo Multer para lidar com uploads de arquivos
import multer from "multer";

// Importa as funções controladoras para gerenciar posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Configura o armazenamento de arquivos para o upload
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo após o upload (mantém o nome original)
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware Multer com o armazenamento configurado
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Habilita o parsing de corpos de requisições JSON para interpretar dados como objetos
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota GET para listar todos os posts (delega a função listarPosts do controlador)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (delega a função postarNovoPost do controlador)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem e criação de post (usa o middleware upload.single para capturar um único arquivo e delega a função uploadImagem do controlador)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes para uso em outros módulos
export default routes;