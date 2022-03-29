var express = require('express')
var router = express.Router()

HOSTPATH = process.env.HOSTPATH;

router.get('/orders', function (req, res) {
    Order.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('pages/staff-orders.ejs', { orders: result })
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/menu', function (req, res) {
    res.render('pages/staff-menu.ejs');
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Order.findByIdAndDelete(id)
        .catch((err) => console.log(err));
})

router.get('/staff', function (req, res) {
    res.redirect('/staff/orders');
})

router.post('/menu', (req, res) => {
    var menu = req.body.menu;
    //save to menu.json

    /*fs.readFile(__dirname+'/link-data.json', (err, data)=>{
        if (err) throw err
        dataJson = JSON.parse(data) //object with your link-data.json file
        postData = JSON.parse(body) //postData is the variable containing your data coming from the client.
        dataJson.push(postData)//adds the data into the json file.

        //Update file
        fs.writeFile(__dirname+'/link-data.json', JSON.stringify(dataJson), (err)=>{
            if(err) console.log(err)
            res.end()
        })
    })*/
})

module.exports = router;