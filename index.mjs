import express from 'express';
import calpoints from './calpoints.mjs';

const app = express();
app.use(express.json());

const receipts = [];

app.get('/', (req, res) => {
  res.send('Welcome to the Index page');
});

app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const receipt = receipts.find((item) => item.id === id);

  if (receipt) {
    res.send(receipt);
  } else {
    res.status(404).send('Receipt Number not found.');
  }
});

app.get('/receipt/:id/points', (req, res) => {
  const id = parseInt(req.params.id);
  const receipt = receipts.find((item) => item.id === id);

  if (receipt) {
    res.send(receipt.points.toString());
  } else {
    res.status(404).send('Receipt Number not found.');
  }
});

app.post('/receipt/process', (req, res) => {
  const id = receipts.length + 1;
  const receipt = {
    id,
    retailer: req.body.retailer,
    purchaseDate: req.body.purchaseDate,
    purchaseTime: req.body.purchaseTime,
    items: req.body.items,
    total: req.body.total,
  };

  const result = isValidReceipt(receipt);

  if (result) {
    receipt.total = parseFloat(receipt.total);
    
    const points = calpoints(receipt);
    receipt.points = points; 

    receipts.push(receipt);
    res.status(201).json({ Id: id });
  } else {
    res.status(400).send('Invalid Data.');
  }
});

function isValidReceipt(receipt) {
    
    const errors = [];
    
    const retailerRegex = /^\S+$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const totalRegex = /^\d+\.\d{2}$/;
    const shortDescriptionRegex = /^[a-zA-Z0-9\s\-]+$/;
    const priceRegex = /^\d+\.\d{2}$/;
    
    if (!retailerRegex.test(receipt.retailer)) {
        errors.push('Retailer name is invalid');
    }
    
    if (!dateRegex.test(receipt.purchaseDate)) {
        errors.push('Purchase date is invalid');
    }
    
    if (!timeRegex.test(receipt.purchaseTime)) {
        errors.push('Purchase time is invalid');
    }
    
    if (!totalRegex.test(receipt.total.toString())) {
        errors.push('Total amount is invalid');
    }
    
    if (!Array.isArray(receipt.items) || receipt.items.length === 0) {
        errors.push('Items are missing or not an array');
    } else {
        for (let item of receipt.items) {
        if (!shortDescriptionRegex.test(item.shortDescription) || !priceRegex.test(item.price.toString())) {
            errors.push('Item details are invalid');
            break; // Stop checking items if one fails
        }
        }
    }
    
    if (errors.length > 0) {
        console.log('Validation errors:');
        for (let error of errors) {
        console.log(error);
        }
        return false;
    }
    
    return true;
}
      

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
