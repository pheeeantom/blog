const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3333;

const path = require('path');

var bodyParser = require('body-parser');

const fs = require('fs');

const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(fileUpload());

const tokenKey = '1a2b-3c4d-5e6f-7g8h';

/*var multer = require('multer');
var uplodedImages = [];

var storagePic = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `public/${req.user.login}/pics/${req.body.pic}`);
        },
        filename: function (req, file, cb) {
            console.log(req.body);
            var newFileName = Date.now() + path.extname(file.originalname);
            req.newFileName = newFileName;
            cb(null, newFileName);
            uplodedImages.push(newFileName);
        }
});
var uploadPic = multer({ storage: storagePic}).single('pic');*/

app.use((req, res, next) => {
    const users = JSON.parse(fs.readFileSync('src/data/users.json',
        { encoding: 'utf8', flag: 'r' }));
    if (req.headers.authorization) {
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            tokenKey,
            (err, payload) => {
                if (err) next();
                else if (payload) {
                    for (let user of users) {
                        if (user.id === payload.id) {
                            req.user = user;
                            next();
                        }
                    }

                    if (!req.user) next();
                }
            }
        );
    }

    next();
});

app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/api/items', (req, res) => {
    //res.status(405).json({message: 'test'});
    console.log(req.user);
    let data = JSON.parse(fs.readFileSync('src/data/posts.json',
        { encoding: 'utf8', flag: 'r' }));
    let amount = data.length;
    if (req.query.sort === 'date') {
        data = data.sort((a, b) => b.id - a.id);
    } else {
        data = data.sort((a, b) => b.likes - a.likes);
    }
    data = data.slice(+req.query.start, +req.query.start + +req.query.limit);
    data = data.map(post => ({
        ...post, isLiked: req.user ? Boolean(req.user.likes?.includes(post.id)) : null
    }));
    return res.json({amount, data});
});

app.post('/api/auth', (req, res) => {
    const users = JSON.parse(fs.readFileSync('src/data/users.json',
        { encoding: 'utf8', flag: 'r' }));
    console.log(req.body.login);
    for (let user of users) {
        if (
            req.body.login === user.login &&
            req.body.password === user.password
        ) {
            return res.status(200).json({
                id: user.id,
                login: user.login,
                token: jwt.sign({ id: user.id }, tokenKey),
            });
        }
    }

    return res
        .status(404)
        .json({ message: 'Неверный пароль либо логин' });
});

app.post('/api/registrate', (req, res) => {
    const users = JSON.parse(fs.readFileSync('src/data/users.json',
        { encoding: 'utf8', flag: 'r' }));
    console.log(req.body.login);
    for (let user of users) {
        if (
            req.body.login === user.login
        ) {
            return res.status(500).json({ message: 'Логин уже существует' });
        }
    }
    const newUser = { id: users[users.length - 1].id + 1, login: req.body.login, password: Math.random().toString(36).slice(-8) };
    users.push(newUser);
    fs.writeFileSync('src/data/users.json', JSON.stringify(users), { encoding: 'utf8' })
    return res.status(200).json(newUser);
});

app.post('/api/items/create', (req, res) => {
    const users = JSON.parse(fs.readFileSync('src/data/users.json',
        { encoding: 'utf8', flag: 'r' }));
    const posts = JSON.parse(fs.readFileSync('src/data/posts.json',
        { encoding: 'utf8', flag: 'r' }));
    //console.log(req.body.login);
    if (
        req.user
    ) {
        console.log('hi1');
        const newPost = {
            id: posts[posts.length - 1].id + 1,
            pic: req.body.pic,
            author: req.user.login,
            header: req.body.header,
            text: req.body.text,
        };
        posts.push(newPost);
        fs.writeFileSync('src/data/posts.json', JSON.stringify(posts), { encoding: 'utf8' })
        const folderName = path.join(__dirname, `../../public/${req.user.login}`);
        try {
            if (!fs.existsSync(folderName)) {
              fs.mkdirSync(folderName);
            }
        } catch (err) {
            console.error(err);
        }
        const folderName2 = path.join(__dirname, `../../public/${req.user.login}/pics`);
        try {
            if (!fs.existsSync(folderName2)) {
              fs.mkdirSync(folderName2);
            }
        } catch (err) {
            console.error(err);
        }
        req.files.file.mv(path.join(__dirname, `../../public/${req.user.login}/pics/${req.body.pic}`), function(err) {
            if (err)
                return res.status(500).send(err);
        
            //res.send('File uploaded!');
        });
        /*var reader = new FileReader()
        console.log('hi2');
        reader.onload = function(){
            var buffer = new Buffer(reader.result)
            fs.writeFile(`public/${req.user.login}/${req.body.pic}`, buffer, {}, (err, res) => {
                if(err){
                    console.error(err);
                    return
                }
                console.log('file saved');
            })
        }
        reader.readAsArrayBuffer(req.body.file);*/
        return res.status(200).json(newPost);
    }

    console.log('else');

    return res.status(401).json({message: 'Not authorized'});
});

app.post('/api/items/like', (req, res) => {
    const users = JSON.parse(fs.readFileSync('src/data/users.json',
        { encoding: 'utf8', flag: 'r' }));
    const posts = JSON.parse(fs.readFileSync('src/data/posts.json',
        { encoding: 'utf8', flag: 'r' }));
    if (
        req.user
    ) {
        let newPosts;
        let newUsers;
        if (req.user.likes?.includes(req.body.id)) {
            newPosts = posts.map(post => {
                if (post.id === req.body.id) {
                    return {...post, likes: (post.likes ?? 0) - 1};
                } else {
                    return post;
                }
            });
            newUsers = users.map(user => {
                if (user.id === req.user.id) {
                    return {...user, likes: user.likes.filter(id => id !== req.body.id)};
                } else {
                    return user;
                }
            });
        } else {
            newPosts = posts.map(post => {
                if (post.id === req.body.id) {
                    return {...post, likes: (post.likes ?? 0) + 1};
                } else {
                    return post;
                }
            });
            newUsers = users.map(user => {
                if (user.id === req.user.id) {
                    return {...user, likes: [...(user.likes ?? []), req.body.id]};
                } else {
                    return user;
                }
            });
        }
        fs.writeFileSync('src/data/posts.json', JSON.stringify(newPosts), { encoding: 'utf8' });
        fs.writeFileSync('src/data/users.json', JSON.stringify(newUsers), { encoding: 'utf8' });
        return res.status(200);
    }

    return res.status(401).json({message: 'Not authorized'});
});

app.get('/user', (req, res) => {
    if (req.user) return res.status(200).json(req.user);
    else
        return res
            .status(401)
            .json({ message: 'Not authorized' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + "../../../dist/index.html"));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});