const generatePayload = require('promptpay-qr');
const QRcode = require('qrcode')
const _ = require('lodash')

exports.create = async (req, res) => {
    const amount = parseFloat(_.get(req, ["body", "amount"]));
    const mobileNumber = '0940277004'
    const payload = generatePayload(mobileNumber, { amount });
    option = {
        color: {
            dark: '#000',
            light: '#fff'
        }
    }
    QRcode.toDataURL(payload, option, (err, url) => {
        try {
            res.status(200).json({
                RespCode: 200,
                RespMessage: "good",
                Result: url
            })

        } catch (err) {
            res.status(400).json({
                RespCode: 400,
                RespMessage: "bad :" + err
            })
        }
    })
}