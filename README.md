# Bootcamp-gostack-desafio-01

Neste desafio criei uma api para listagar, criar, editar e remover.

Instalação

> `yarn install`

Rodar o projeto

> `yarn dev`

O projeto vai ser rodado em

> `http://localhost:3000`

---

## Rotas

Listar

> GET `http://localhost:3000/projects`

Criar um projeto:

> POST `http://localhost:3000/projects`
>
> Exemplo:
>
> `{"id": 1,"title": "Primeiro projeto"}`

Editar o projeto:

> PUT `http://localhost:3000/projects/:id`
>
> Exemplo:
>
> `{"title": "Projeto bem legal"}`

Criar tarefas do projeto:

> POST `http://localhost:3000/projects/:id/tasks`
>
> Exemplo:
>
> `{"title": "Primeira tarefa"}`

Deletar projeto:

> DELETE `http://localhost:3000/projects/:id`
