const express = require('express');
const calpoints = require('./calpoints');
const app = express(); 

app.use(express.json());

const receipts = [
        
    ]

app.get('/',(req, res) => {
    res.send('Hello welcome to Index page');
})

app.get('/:id',(req,res) => {
    const id = req.params.id; 
    const receipt  = receipts.find((item) => item.id === parseInt(id));
    if(receipt) {
        res.send(receipt);
    }
    else{
        res.status(400).send('Receipt Number does not exist.');
    }
})

app.get('/receipt/:id/points',(req,res) => {
    const id = req.params.id; 
    const receipt  = receipts.find((item) => item.id === parseInt(id));
    if(receipt) {
        res.send(receipt.points.toString());
    }
    else{
        res.status(400).send('Receipt Number does not exist.');
    }
})

app.post('/receipt/process', (req, res) => {
    let id = receipts.length + 1; 
    const receipt = {
        id: id,
        retailer: req.body.retailer,
        purchaseDate :  req.body.purchaseDate,
        purchaseTime : req.body.purchaseTime,
        items : req.body.items,
        total : parseFloat(req.body.total),
    }

    const result = validReceipt(receipt);

    if(result){
        const points = calpoints(receipt);
        receipt.points = points;

        receipts.push(receipt);
        res.send('{ Id:' + id.toString() + '}');
    }
    else{
        res.status(400).send('Invalid Data.');
    }

    
})

function validReceipt(receipt) {

    const retailerRegex = /^\S+$/;
    const totalRegex = /^\d+\.\d{2}$/;
    const shortDescriptionRegex = /^[\w\s\-]+$/;
    const priceRegex = /^\d+\.\d{2}$/;

    if(!retailerRegex.test(receipt.retailer)){
        console.log('Invalid Receipt Retailer');
        return false;
    }

    if(!totalRegex.test(receipt.total)){
        console.log('Invalid Total');
        return false;
    }

    for(let item of receipt.items)
    {
        if(!shortDescriptionRegex.test(item.shortDescription) || !priceRegex.test(item.price)){
            console.log('Invalid Short Description or Price');
            return false;
        }
    }
    return true;
}

// port 
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port ${port}`)})

