const {Router} = require('express');
const PostRoutes = require('../routes/posts');
const UserRoutes = require('../routes/users');
const AuthRoutes = require('../routes/Authentication');
const router = Router();

router.get('/', (req,res)=> {
    res.status(200).send({
    message: "KejaHunt API"
  })
});

// Authentication routes
router.use('/auth', AuthRoutes);

// Post routes
router.use('/posts', PostRoutes);

module.exports = router;
