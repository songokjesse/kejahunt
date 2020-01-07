const {Router} = require('express');
const PostRoutes = require('../routes/posts');
const router = Router();

router.get('/', (req,res)=> {
    res.status(200).send({
    message: "KejaHunt API"
  })
});

// Post routes
router.use('/posts', PostRoutes);

module.exports = router;
