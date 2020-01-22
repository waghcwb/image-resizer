const express = require('express')
const logger = require('morgan')
const path = require('path')
const sharp = require('sharp/lib/index')
const debug = require('debug')('imagereducer:app')
const serverless = require('serverless-http')
const _request = require('request').defaults({ encoding: null })
const { promisify } = require('util')

const app = express()
const router = express.Router()
const request = promisify(_request)

router.get('/:width/:base64/:compressionLevel?/:quality?', async (req, res, next) => {
  try {
    res.send('ok')
    // const { base64, width, quality, compressionLevel } = req.params
    // const base64Buffer = new Buffer(base64, 'base64')
    // const img = base64Buffer.toString('ascii')
    // const { body, statusCode } = await request(img)
    // const options = {}
    //
    // if (compressionLevel !== undefined && !/^[0-9]$/g.test(compressionLevel)) {
    //   throw new Error('compression level must be between 0 and 9')
    // }
    //
    // if (compressionLevel) {
    //   options.compressionLevel = Number(compressionLevel)
    // }
    //
    // if (quality) {
    //   options.quality = Number(quality)
    // }

    // const resize = await sharp(body)
    //   .resize({
    //     width: Number(width),
    //     fit: 'inside'
    //   })
    //   .png(options)
    //   .toBuffer()
    //
    // res.header({
    //   'Content-Type': 'image/png',
    //   'Content-Length': resize.length
    // })
    //
    // res.status(statusCode).send(resize)
    // res.send(base64Buffer)
  } catch (err) {
    next(err)
  }
})

app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use('/.netlify/functions/app', router)
app.use('/', (req, res) => res.sendFile(path.resolve(path.join(__dirname, '../public/index.html'))))

module.exports.handler = serverless(app)