const {Router} = require('express');
const postController = require('../ controllers/postController');
const VerifyToken = require('../middleware/AuthMiddleware');
const router = Router();

router.post('/',  VerifyToken, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:postId', VerifyToken, postController.getPostById);
router.put('/:postId', VerifyToken, postController.updatePost);
router.delete('/:postId', VerifyToken, postController.deletePost);



module.exports = router;
