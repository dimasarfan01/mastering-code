const { jwtSecret } = require('../../config');
const { User } = require('../../db/models');
const { wrap, ErrorMessage } = require('../../utils');

const signin = wrap(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email },
    });

    if (!user) {
        throw new ErrorMessage({
            message: 'Email tidak ditemukan',
            statusCode: 404,
            data: { email },
        });
    }

    const decodePassword = require('bcryptjs').compareSync(password, user.password);

    if (!decodePassword) {
        throw new ErrorMessage({
            message: 'Password is incorrect',
            statusCode: 401,
            data: { password },
        });
    }

    const token = require('jsonwebtoken').sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        jwtSecret,
        { expiresIn: '1h' }
    );

    res.status(200).send({
        code: 200,
        message: 'Success',
        data: { token },
    });
});

const signup = wrap(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        throw new ErrorMessage({
            message: 'Password and Confirm Password is not same',
            statusCode: 400,
            data: { password, confirmPassword },
        });
    }

    const user = await User.count({
        where: { email },
    });

    if (user) {
        throw new ErrorMessage({
            message: 'Email sudah digunakan',
            statusCode: 400,
            data: { email },
        });
    }

    await User.create({
        name,
        email,
        password: require('bcryptjs').hashSync(password, 10),
    });

    res.status(201).send({
        code: 201,
        message: 'User created',
    });
});

module.exports = { signin, signup };
