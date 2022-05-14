const { Transaction, DetailTransaction, Book, sequelize } = require('../../db/models');
const { wrap, ErrorMessage } = require('../../utils');

const checkout = wrap(async (req, res) => {
    const { payload } = req.body;
    const userId = req.user.id;

    const result = await sequelize.transaction(async (t) => {
        const transaction = await Transaction.create(
            {
                invoice: `T-${Date.now()}-${Math.floor(Math.random() * 100)}`,
                userId,
            },
            { transaction: t }
        );

        const errorBookIds = [];
        const errorBookStocks = [];
        const updateBookStocks = [];
        const detailTransactionsData = [];

        for (let i = 0; i < payload.length; i++) {
            const { bookId } = payload[i];

            const book = await Book.findOne({
                where: { id: bookId, userId },
            });

            if (!book) {
                errorBookIds.push(bookId);
                continue;
            }

            if (book.stock < payload[i].quantity || book.stock === 0) {
                errorBookStocks.push({
                    id: bookId,
                    stock: book.stock,
                    quantity: payload[i].quantity,
                });
                continue;
            }

            updateBookStocks.push({
                id: bookId,
                quantity: payload[i].quantity,
                userId,
            });

            detailTransactionsData.push({
                transactionId: transaction.id,
                userId,
                titleBook: book.title,
                imageBook: book.image,
                priceBook: book.price,
                quantity: payload[i].quantity,
            });
        }

        if (errorBookIds.length > 0) {
            throw new ErrorMessage({
                statusCode: 404,
                message: 'Book not found',
                data: errorBookIds,
            });
        }

        if (errorBookStocks.length > 0) {
            throw new ErrorMessage({
                statusCode: 400,
                message: 'Book stock not enough or out of stock',
                data: errorBookStocks,
            });
        }

        await Promise.all(
            updateBookStocks.map((book) =>
                Book.decrement(
                    {
                        stock: book.quantity,
                    },
                    {
                        where: { id: book.id, userId },
                    },
                    { transaction: t }
                )
            ),
            DetailTransaction.bulkCreate(detailTransactionsData, {
                transaction: t,
            })
        );

        return {
            code: 201,
            message: 'Checkout success',
        };
    });

    res.status(result.code).send(result);
});

const getListTransactions = wrap(async (req, res) => {
    const { Op } = require('sequelize');
    const { invoice = '' } = req.query;
    const userId = req.user.id;

    const transactions = await Transaction.findAll({
        where: { userId, invoice: { [Op.like]: `%${invoice}%` } },
        attributes: ['id', 'invoice', 'date'],
        include: [
            {
                model: DetailTransaction,
                attributes: ['titleBook', 'imageBook', 'priceBook', 'quantity'],
                as: 'detailTransactions',
            },
        ],
    });

    res.status(200).send({
        code: 200,
        message: 'Get list transactions success',
        data: transactions,
    });
});

const getTransactionById = wrap(async (req, res) => {
    const { transactionId } = req.params;
    const userId = req.user.id;

    const transaction = await Transaction.findOne({
        where: { id: transactionId, userId },
        attributes: ['id', 'invoice', 'date'],
        include: [
            {
                model: DetailTransaction,
                attributes: ['titleBook', 'imageBook', 'priceBook', 'quantity'],
                as: 'detailTransactions',
            },
        ],
    });

    res.status(200).send({
        code: 200,
        message: 'Get transaction success',
        data: transaction,
    });
});

module.exports = { checkout, getListTransactions, getTransactionById };
