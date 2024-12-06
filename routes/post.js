const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postControllers.js');
const myPost = require('../database/db.js')




router.post('/', postsController.store);
router.put('/:slug', postsController.update);
router.delete('/:slug', postsController.destroy);
router.get('/:slug', postsController.get);

router.get('/', (req, res) => {
    res.json(myPost)
})

module.exports = router