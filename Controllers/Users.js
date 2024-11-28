const Users = require('../Models/Users')
const bcrypt = require('bcrypt');

exports.read = async (req, res) => {
    try {
        const data = req.body
        const dataformDB = await Users.findOne(data.user)
        if (!dataformDB) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        const isMatch = await bcrypt.compare(data.password, dataformDB.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid password',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Login successfully',
            id: dataformDB._id,
            username: dataformDB.user,
            role: dataformDB.role
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: err,

        })
    }

}

exports.create = async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new Users({ user: req.body.username, password: hashedPassword, role: 'admin' });
        await user.save();
        res.status(200).send({
            success: true,
            message: 'User created successfully',
            data: user
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: err,

        })
    }
} 