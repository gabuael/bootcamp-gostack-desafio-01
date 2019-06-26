const express = require("express");

const server = express();

server.use(express.json());

let projects = [];

let numReq = 0;

server.use((req, res, next) => {
  numReq++;
  console.log(numReq);
  next();
});

const validateId = (req, res, next) => {
  const { id } = req.params;
  let _project;
  let _index;
  projects.map((project, index) => {
    if (project.id == id) {
      _project = project;
      _index = index;
    }
  });
  if (!_project) {
    return res.status(400).json({ error: "Projeto não encontrado" });
  }
  req.mid = {
    project: _project,
    index: _index
  };
  next();
};

const validateCreate = (req, res, next) => {
  const { id } = req.body;

  let exist = false;
  projects.map(project => {
    if (project.id == id) {
      exist = true;
    }
  });
  if (exist) {
    return res.status(400).json({ error: "Já existe um projeto com esse id" });
  }
  next();
};

// Listar todos os projetos
server.get("/projects", (req, res) => {
  return res.json({ projects });
});

// Criar projeto
server.post("/projects", validateCreate, (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  });

  return res.json({ projects });
});

// Alterar titulo do projeto
server.put("/projects/:id", validateId, (req, res) => {
  const { project, index } = req.mid;
  const { title } = req.body;

  projects[index] = {
    ...project,
    title
  };

  return res.json({ projects });
});

// Deletar projeto
server.delete("/projects/:id", validateId, (req, res) => {
  const { index } = req.mid;

  projects.splice(index, 1);

  return res.json({ mensagem: "ok" });
});

// Criar tarefas dentro do projeto
server.post("/projects/:id/tasks", validateId, (req, res) => {
  const { project, index } = req.mid;
  const { title } = req.body;

  projects[index] = {
    ...project,
    tasks: [...project.tasks, title]
  };

  return res.json({ project: projects[index] });
});

server.listen(3000);
