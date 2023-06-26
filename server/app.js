const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')

const app = express()

const PORT = config.get('port') ?? 8080

if (process.env.NODE_ENV = 'production') {

}

app.listen(PORT, () => {
    console.log(chalk.green(`Server has started on port`))
})