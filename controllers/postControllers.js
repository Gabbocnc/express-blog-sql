const myPost = require('../database/db.js')
const fs = require('fs')
const connection = require('../database/connection.js')

const index = (req, res) => {


    const sql = 'SELECT * FROM posts'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        const responseData = {
            data: results,
            counter: results.length
        }

        res.status(200).json(responseData);
    })
}

const store = (req, res) => {
    const newPost = {
        ...req.body
    }
    myPost.push(newPost)

    fs.writeFileSync('./database/db.js', `module.exports = ${JSON.stringify(myPost, null, 4)}`)

    res.json({
        data: myPost
    })
}

const update = (req, res) => {

    const post = myPost.find(post => post.slug.toLocaleLowerCase() === req.params.slug)



    if (!post) {
        return res.status(404).json({
            error: 'no post found with that title'
        })
    }

    post.title = req.body.title
    post.slug = req.body.slug
    post.content = req.body.content
    post.image = req.body.image
    post.tags = [req.body.tags]

    fs.writeFileSync('./database/db.js', `module.exports = ${JSON.stringify(myPost, null, 4)}`)

    res.status(200).json({
        status: 200,
        data: post
    })
}


const destroy = (req, res) => {
    const slugToDelete = req.params.slug.toLowerCase();
    console.log(slugToDelete);

    const postIndex = myPost.find(post => post.slug.toLowerCase() === slugToDelete);

    myPost.splice(myPost.indexOf(postIndex), 1);


    fs.writeFileSync('./database/db.js', `module.exports = ${JSON.stringify(myPost, null, 4)}`);


    res.json({
        status: 200,
        message: 'Post deleted successfully',
        data: myPost
    });
};

const get = (req, res) => {
    const showBlog = myPost.find(post => post.slug.toLowerCase() === req.params.slug.toLowerCase())

    res.json({
        data: showBlog
    })

}
module.exports = {
    store,
    update,
    destroy,
    get,
    index
}