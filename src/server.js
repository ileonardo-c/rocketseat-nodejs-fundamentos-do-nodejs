// CommonJS => require
// const http = require('http')

// ESModules => import/export
import http from 'node:http'

// Aplicações HHTP => API's

// - HTTP
//  - Método HTTP
//  - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// Stateful - Stateless
// JSON - JavaScript Object Notation
// Cabeçalhos (Requisição/resposta) => Metadados
// HTTP Status Code

// Criar um usuário (nome, email, senha)
const users = []

const server = http.createServer((req, res) => {
    const { method, url } = req

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
        })
        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

// localhost:3333
server.listen(3333)
