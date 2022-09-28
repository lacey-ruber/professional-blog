import PostModel from '../models/Post.js'
import UserModel from '../models/User.js'

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec()

    if (!posts) {
      return res.json({ message: 'Постов нет' })
    }
    res.json(posts)
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось получить статьи',
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: 'Не удалось вернуть статью',
          })
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          })
        }

        res.json(doc)
      },
    ).populate('user')
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось получить статьи',
    })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = await PostModel.findByIdAndDelete(req.params.id)

    if (!postId) return res.json({ message: 'Поста не существует' })

    await UserModel.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    })

    res.json({ message: 'Пост успешно удален' })
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось получить статьи',
    })
  }
}

export const create = async (req, res) => {
  const doc = new PostModel({
    title: req.body.title,
    text: req.body.text,
    imageUrl: req.body.imageUrl,
    tags: req.body.tags.split(','),
    user: req.userId,
  })
  try {
    await doc.save()
    await UserModel.findByIdAndUpdate(req.userId, {
      $push: { posts: doc },
    })

    res.json(doc)
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось создать статью',
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags.split(','),
      },
    )

    res.json({
      message: 'Пост был обновлен',
    })
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось обновить статью',
    })
  }
}
