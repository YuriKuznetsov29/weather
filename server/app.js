const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: true//config.get('clientURLR') ?? 'http://localhost:3000'
}))
app.use('/api', routes)

const PORT = config.get('port') ?? 8080

if (process.env.NODE_ENV = 'production') {
    app.use('/', express.static(path.join(__dirname, 'client')))

    const indexPath = path.join(__dirname, 'index.html')

    app.get('/*', (req, res) => {
        res.sendFile(indexPath)
    })
}

async function start() {
    try {
        mongoose.connection.once('open', () => {
            initDatabase()
        })
        await mongoose.connect(config.get('mongoUriR'))
        console.log(chalk.green(`MongoDB has been connected`))
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has started on port ${PORT}`))
        })
    } catch (e) {
        console.log(chalk.red(e.message))
        process.exit(1)
    }
}

start()

//playeer2905
//y8QIYFNXemvBPLh8