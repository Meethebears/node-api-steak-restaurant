const { forEach } = require('lodash');
const SaleItems = require('../Models/SaleItem')

exports.read = async (req, res) => {
    try {
        const id = req.params.id
        const saleItem = await SaleItems.find({ _id: id }).exec();
        res.send(saleItem)
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Sever Error')
    }

}

exports.create = async (req, res) => {
    try {
        let sum = []
        const prices = req.body.order.map((item) => (item.price));
        const quantity = req.body.order.map((item) => (item.quantity));
        prices.forEach((element, index) => (
            sum.push(element * quantity[index])
        ))
        let total = sum.reduce((prev, curr) => prev + curr, 0);
        let order = req.body.order
        let data = {
            order,
            tablenumber: req.body.tablenumber,
            totalprice: total,
            payment: 'not paid'
        }
        const saleItem = await SaleItems(data).save()
        res.send(saleItem)

    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {
    try {
        const SaleItem = await SaleItems.find({}).exec();
        res.send(SaleItem)
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const updated = await SaleItems.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec()
        res.send(updated)
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

exports.listTotal = async (req, res) => {
    try {
        let Total = []
        const TotalSale = await SaleItems.find({ "payment": "paid" }, { "totalprice": 1, _id: 0 })
        TotalSale.map(item => Total.push(item.totalprice))
        let sum_total = Total.reduce((prev, curr) => prev + curr, 0)
        res.send([sum_total])
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error")
    }
}

exports.listTodaySales = async (req, res) => {
    try {
        let total_today = []
        let start = new Date()
        start.setHours(7, 0, 0, 0)
        let startISOdate = start.toISOString()
        let end = new Date()
        end.setHours(30, 59, 59, 999)
        let endISOdate = end.toISOString()
        const TodaySales = await SaleItems.find({ updated_at: { $gte: startISOdate, $lt: endISOdate } })
        TodaySales.map(item => total_today.push(item.totalprice))
        let sum_total_today = total_today.reduce((prev, curr) => prev + curr, 0)
        res.send([sum_total_today])

    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error")
    }
}

exports.listMonthSales = async (req, res) => {
    try {
        const total_month = []
        const month = new Date().getMonth()+1;
        const year = new Date().getFullYear();
        let start = new Date(year+"-"+month+"-"+"1");
        start.setHours(7, 0, 0, 0);
        let startISOdate = start.toISOString();
        let end = new Date(year+"-"+month+"-"+"31");
        end.setHours(30, 59, 59, 999);
        let endISOdate = end.toISOString();
        const MonthSales = await SaleItems.find({ updated_at: { $gte: startISOdate, $lt: endISOdate }, payment: "paid" })
        MonthSales.map(item => total_month.push(item.totalprice))
        let sum_total_month = total_month.reduce((prev, curr) => prev + curr, 0)
        res.send([sum_total_month]);
    }
    catch (err) {
        console.log(err);
        res.status(500).sent("Server Error")

    }
}