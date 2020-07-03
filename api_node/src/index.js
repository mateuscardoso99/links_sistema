/*
libs instaladas:
npm install --save dotenv //permite criar arquivo .env para o banco de dados,
 depois renomear arquivo config.json para config.js, colocar module.exports nele para exportar
 e colocar as variaveis do arquivo .env

npm install --save mysql2
npm install --save sequelize
npm install --save nodemon
npm install --save bcrypt // criptografar senhas
npm install --save @hapi/joi // validacao
npm install --save jsonwebtoken //autenticacao jwt
--gerar arquivo de configuração sequelize: npx sequelize-cli init:config
--gerar arquivo model sequelize: npx sequelize-cli init:models
--gerar arquivo migrate adicionar coluna em account: npx sequelize-cli migration:create --name add_jwtVersion_to_account
e criar arquivo .sequelizerc
*/

const express = require('express')
const cors = require('cors')
const db = require('./models')
const response = require('./middlewares/response')
const checkJwt = require('./middlewares/jwt')

const authController = require('./controllers/auth')
const linkController = require('./controllers/link')

const app = express()

app.use(cors())
app.use(response)
app.use(checkJwt)
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/auth', authController)
app.use('/link', linkController)

app.get('/', (req, res)=>{
    return res.json('Api running...')
})

db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log('EXECUTANDO...')
    })
})
