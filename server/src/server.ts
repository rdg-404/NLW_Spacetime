import 'dotenv/config'
import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { authRoutes } from './routes/auth'
import multipart from '@fastify/multipart'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)

// tornar pasta publica para o navegador
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

// todos podem acessar os dados do back end
app.register(cors, {
  origin: true,
})
// registar rota jwt
app.register(jwt, {
  secret: 'spacetime',
})
app.register(authRoutes) // rota de autenticação
app.register(uploadRoutes)
app.register(memoriesRoutes) // pega funcao de get de arquivo separado

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('server online')
  })
