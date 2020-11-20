const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const db = require('../database/models')
const Blogs = db.Blogs
const router = express.Router();

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'public/images/')
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage })

/* GET blog page. */
router.get('/add', function (req, res) {
    res.render('add', { title: 'Express Add Blog' });
});

router.post('/save', upload.single('gambar'), async (req, res) => {
    const data = {
        judul: req.body.judul,
        kategori: req.body.deskripsi,
        gambar: !req.file ? 'placeholder.jpg' : req.file.filename
    };
    try {
        await Blogs.create(data)
    } catch (error) {
        req.flash('msg_error', error);
        res.redirect('/')
    }
});

router.get('/edit/:id', async function (req, res) {
    const id = req.params.id
    const result = await Blogs.findByPk(id);
    const data = {
        title: 'Express Edit Blog',
        result: result.dataValues
    }
    res.render('edit', data);
});

router.post('/update/:id', upload.single('gambar'), (req, res) => {
    const id = req.params.id
    const data = {
        judul: req.body.judul,
        deskripsi: req.body.deskripsi
    };
    Blogs.findByPk(id).then((row) => {
        if (req.file) {
            if (row.dataValues.gambar !== 'placeholder.jpg') {
                fs.unlink(`public/images/${row.dataValues.gambar}`, () => {
                    return true
                })
            }
            data.gambar = req.file.filename
        }
        row.update(data);
        req.flash('msg_success', 'data berhasil diperbarui');
        res.redirect('/')
    }).catch((err) => {
        req.flash('msg_error', err);
        res.redirect('/')
    });
});

router.get('/delete/:id', function (req, res) {
    const id = req.params.id
    Blogs.findByPk(id).then((row) => {
        if (row.dataValues.cover != 'placeholder.jpg') {
            fs.unlink(`public/images/${row.dataValues.gambar}`, () => {
                return true;
            })
        }
        Blogs.destroy({
            where: {
                id: row.dataValues.id
            }
        }).then(() => {
            req.flash('msg_success', 'data terhapus');
            res.redirect('/')
        }).catch((err) => {
            req.flash('msg_error', err);
            res.redirect('/')
        })
    }).catch((err) => {
        req.flash('msg_error', err);
        res.redirect('/')
    })
});

module.exports = router;
