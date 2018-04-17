const imageModel = require('./model');

const createImage = ({ imageUrl, title, description, createdBy }) => new Promise((resolve, reject) => {
  imageModel.create({
    imageUrl,
    title,
    description,
    createdBy
  })
    .then(data => resolve({ id: data._id }))
    .catch(err => reject(err))
});

const getAllImages = page => new Promise((resolve, reject) => {
  imageModel.find({
    'active': true
  })
    .sort({ createAt: -1 }) // lay nhung thu moi nhat
    .skip((page - 1) * 20) //lay bao nhieu database
    .limit(20)
    .select("_id imageUrl title description createdAt created By view like")
    .exec() //thuc hien, thuong exec se duoc goi cuoi cung
    .then(data => resolve(data))
    .catch(err => reject(err))
});



const updateImage = (id, { imageUrl, title, description }) =>
  new Promise((resolve, reject) => {
    imageModel.update({
      _id: id //tim thang co _id co gia tri id, mongoose default la _id
    }, {
        imageUrl,
        title,
        description,
        createBy
      })
      .then(data => resolve({ id: data._id }))
      .catch(err => reject(err))
  })

const deleteImage = id => new Promise((resolve, reject) => {
  imageModel.update({
    _id: id
  }, {
      active: false
    })
    .then(data => resolve({ id: data._id }))
    .catch(err => reject(err))
})

const getImage = id => new Promise((resolve, reject) => {
  imageModel.findOne({
    active: true,
    _id: id
  })
    .select("_id imageUrl title description createdAt created By view like comment")
    .exec() //thuc hien, thuong exec se duoc goi cuoi cung
    .then(data => resolve(data))
    .catch(err => reject(err))
});

 const addComment = (imageId, { createBy, content }) =>
  new Promise((resolve, reject) => {
    imageModel
      .update(
        {
          _id: imageId
        },
        {
          $push: { comment: { createBy, content } }
        }
      )
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const deleteComment = (imageId, commentId) => 
  new Promise((resolve, reject) => {
    imageModel
      .update(
        {
          _id: imageId
        },
        {
          $pull: { comment: {_id: commentId}}
        }
      )
      .then(data => resolve(data))
      .catch(err => reject(err))
  })


const likeImage = imageId =>
  new Promise((resolve, reject) => {
    imageModel
      .update(
        {
          _id: imageId
        },
        {
          $inc: { like: 1 }
        }
      )
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const unlikeImage = imageId =>
  new Promise((resolve, reject) => {
    imageModel
      .update({
        _id: imageId
      },
        {
          $inc: { like: -1 }
        }
      )
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
//like image
//unlike image

module.exports = {
  createImage,
  getAllImages,
  updateImage,
  deleteImage,
  getImage,
  addComment,
  deleteComment,
  likeImage,
  unlikeImage
}