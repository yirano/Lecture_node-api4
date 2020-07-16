const express = require("express")
const shoutsModel = require("./shouts-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
  // shoutsModel.find()
  // 	.then((data) => res.status(200).json(data))
  // 	.catch((err) => next(err))
  try {
    const data = await shoutsModel.find()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }

})

router.get("/:id", validateShoutId(), (req, res, next) => {
  res.status(200).json(req.shout)
})

router.post("/", (req, res, next) => {
  shoutsModel.add(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err))
})

router.delete("/:id", validateShoutId(), (req, res, next) => {
  Shouts.remove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err))
})

function validateShoutId() {
  return async (req, res, next) => {
    try {
      const shout = shoutsModel.findById(req.params.id)
      if (shout) {
        req.shout = shout
        next()
      } else {
        res.status(404).json({
          message: "Could not find shout",
        })
      }
    } catch (error) {
      next(error)
    }


    // .then((shout) => {
    //   if (shout) {
    //     req.shout = shout
    //     next()
    //   } else {
    //     res.status(404).json({
    //       message: "Could not find shout",
    //     })
    //   }
    // })
    // .catch(next)
  }
}

module.exports = router
