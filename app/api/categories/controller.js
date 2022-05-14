const { Category } = require('../../db/models');
const { wrap, ErrorMessage } = require('../../utils');

const createCategory = wrap(async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;

    const checkCategory = await Category.count({
        where: { name, userId },
    });

    if (checkCategory) {
        throw new ErrorMessage({
            message: 'Category already exists',
            statusCode: 400,
            data: { name, userId },
        });
    }

    await Category.create({
        name,
        userId,
    });

    res.status(201).send({
        code: 201,
        message: 'Category created',
    });
});

const getAllCategories = wrap(async (req, res) => {
    const categories = await Category.findAll({
        where: { userId: req.user.id },
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'name'],
    });

    res.status(200).send({
        code: 200,
        message: 'Categories fetched',
        data: categories,
    });
});

const updateCategory = wrap(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;

    const category = await Category.findOne({
        where: { id, userId },
    });

    if (!category) {
        throw new ErrorMessage({
            message: 'Category not found',
            statusCode: 404,
            data: { id, userId },
        });
    }

    const existedCategory = await Category.count({
        where: { name, userId },
    });

    if (existedCategory) {
        throw new ErrorMessage({
            message: 'Category already exists',
            statusCode: 400,
            data: { name, userId },
        });
    }

    await category.update({ name });

    res.status(200).send({
        code: 200,
        message: 'Category updated',
    });
});

const deleteCategory = wrap(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const checkCategory = await Category.count({
        where: { id, userId },
    });

    if (!checkCategory) {
        throw new ErrorMessage({
            message: 'Category not found',
            statusCode: 404,
            data: { id, userId },
        });
    }

    await Category.destroy({ where: { id, userId } });

    res.status(200).send({
        code: 200,
        message: 'Category deleted',
    });
});

module.exports = { createCategory, getAllCategories, updateCategory, deleteCategory };
