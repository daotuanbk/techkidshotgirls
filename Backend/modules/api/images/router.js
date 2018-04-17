const express = require('express');
const router = express.Router();

const imageController = require('./controller')

router.get('/', (req, res) => {
  imageController
    .getAllImages(req.query.page || 1)
    .then(images => res.send(images)) // gui ve cai gi, thi no se luu vao bien images
    .catch(err => {
      console.error(err);
      res.status(500).send(err); //500 enternal sever error
      //200-> 299 ok
      //300 redirect
      //404 not found 
    })
})

router.post('/', (req, res) => {
  imageController
    .createImage(req.body) //tra het, k du thi bao loi
    .then(result => res.send(result))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.get('/:id', (req, res) => {
  imageController
    .getImage(req.params.id)
    .then(image => res.send(image)) // gui ve cai gi, thi no se luu vao bien images
    .catch(err => {
      console.error(err);
      res.status(500).send(err); //500 enternal sever error
      //200-> 299 ok
      //300 redirect
      //404 not found 
    })
})

router.delete('/:id', (req, res) => {
  imageController
  .deleteImage(req.params.id)
  .then(image => res.send(image))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
})

router.post('/:imageId/comments', (req, res) => {
  imageController
    .addComment(req.params.imageId, req.body) //noi dung cua form
    .then(id => res.send(id))
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
});

router.delete('/:id/comments/:commentid', (req, res) => {
  imageController
  .deleteComment(req.params.id, req.params.commentid)
  .then(id => res.send(id))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
})

router.post('/:id/like' , (req, res) => {
  imageController
  .likeImage(req.params.id)
  .then(result => res.send(result))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
})

router.delete('/:id/like' , (req, res) => {
  imageController
  .unlikeImage(req.params.id)
  .then(result => res.send(result))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  })
})

module.exports = router;