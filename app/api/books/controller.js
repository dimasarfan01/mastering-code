const fs = require('fs');
const path = require('path');
const config = require('../../config');
const { Book, Category } = require('../../db/models');
const { wrap, ErrorMessage } = require('../../utils');
const { Op } = require('sequelize');

const createBook = wrap(async (req, res) => {
    const { title, author, price, stock, categoryId } = req.body;
    const userId = req.user.id;

    const existedBook = await Book.count({
        where: { title, userId },
    });

    if (existedBook) {
        throw new ErrorMessage({
            message: 'Book already exists',
            statusCode: 409,
            data: { title, userId },
        });
    }

    const checkCategory = await Category.count({
        where: { id: categoryId, userId },
    });

    if (!checkCategory) {
        throw new ErrorMessage({
            message: 'Category does not exist',
            statusCode: 404,
            data: { categoryId, userId },
        });
    }

    await Book.create({
        userId,
        title,
        categoryId,
        author,
        image: req.file.filename,
        price,
        stock,
    });

    res.status(201).json({
        code: 201,
        message: 'Book created',
    });
});

const getAllBooks = wrap(async (req, res) => {
    const userId = req.user.id;
    const { title = '', category = '' } = req.query;

    const books = await Book.findAll({
        where: { userId, title: { [Op.like]: `%${title}%` } },
        attributes: {
            exclude: ['userId', 'categoryId', 'createdAt', 'updatedAt'],
        },
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['name'],
                where: { name: { [Op.like]: `%${category}%` } },
            },
        ],
    });

    res.status(200).json({
        code: 200,
        message: 'Books retrieved',
        data: books.map((book) => ({
            ...book.dataValues,
            image: `${config.appUrl}/uploads/${book.image}`,
            published: book.published.toISOString().split('T')[0],
            category: book.category.name,
        })),
    });
});

const updateBookById = wrap(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, author, price, stock, categoryId } = req.body;

    const book = await Book.findOne({
        where: { id, userId },
    });

    if (!book) {
        throw new ErrorMessage({
            message: 'Book does not exist',
            statusCode: 404,
            data: { id, userId },
        });
    }

    if (categoryId) {
        const checkCategory = await Category.count({
            where: { id: categoryId, userId },
        });

        if (!checkCategory) {
            throw new ErrorMessage({
                message: 'Category does not exist',
                statusCode: 404,
                data: { categoryId, userId },
            });
        }
    }

    if (req.file) {
        const uploadLocation = path.join(config.uploadPath, book.image);
        if (fs.existsSync(uploadLocation)) fs.unlinkSync(uploadLocation);
    }

    await book.update({
        title,
        author,
        image: req.file ? req.file.filename : book.image,
        price,
        stock,
        categoryId,
    });

    res.status(200).json({
        code: 200,
        message: 'Book updated',
    });
});

const destroyBookById = wrap(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const book = await Book.findOne({
        where: { id, userId },
    });

    if (!book) {
        throw new ErrorMessage({
            message: 'Book does not exist',
            statusCode: 404,
            data: { id, userId },
        });
    }

    const uploadLocation = path.join(config.uploadPath, book.image);

    if (fs.existsSync(uploadLocation)) fs.unlinkSync(uploadLocation);

    await book.destroy();

    res.status(200).json({
        code: 200,
        message: 'Book deleted',
    });
});

module.exports = {
    createBook,
    getAllBooks,
    updateBookById,
    destroyBookById,
};
