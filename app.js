import express from 'express'
import fs from 'fs'
import multer from 'multer'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations.js'
import { handleValidationErrors, checkAuth } from './utils/index.js'
import { UserController, PostController } from './controllers/index.js'

const app = express()
dotenv.config()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads')
    }
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/uploads', express.static('uploads'))

// Routes

// Auth
app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register,
)
app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login,
)
app.get('/auth/me', checkAuth, UserController.getMe)

// Images
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

// Posts
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create,
)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
)

const PORT = process.env.PORT || 4000
const BD = process.env.MONGO_URI

if(process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  const indexPath = path.resolve(__dirname, 'client', 'build', 'index.html')
  app.get('*', (req, res) => {
    res.sendFile(indexPath)
  })
}

async function start() {
  try {
    await mongoose.connect(`${BD}`)
    app.listen(4000, () => console.log(`Сервер запущен на порту ${PORT}`))
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

start()
