// criteria - 1 : Name of Retailers
function retailerNamePoints(retailer){
    let points = 0;

    for(let char of retailer.trim()){

        let charCode = char.charCodeAt(0);

        // console.log(`${char} : ${charCode}`);
        
        if( 
            (charCode > 47 && charCode<58 ) || 
            (charCode > 64 && charCode < 91) || 
            (charCode > 96 && charCode < 123)
        ){
            points = points + 1;
        }
    }

    return points;
}

// criteria - 2 : Total is round and is divided by 0.25 
function totalPoints(total){
    let roundTotalPoints = 50;
    let quaterPoints = 25; 

    if(parseInt(total) === total)
    {
        return roundTotalPoints + quaterPoints;
    }
    if((total * 100) % 25 === 0 )
    {
        return quaterPoints;
    }
    return 0;
}

// criteria - 3 : Items pair and Short Description 
function itemsPoints(items){
    let len = items.length;
    let points = parseInt((len/2)) * 5;

    for(let item of items)
    {
        if(item.shortDescription.trim().length % 3 === 0)
        {
            points = points + Math.ceil(parseFloat(item.price)*0.2);
        }
    }
    return points;
}

// criteria - 4 : If Time is between 2 - 4 pm
function timePoints(time){

    let point = 10;

    let charCode = time.charCodeAt(1);
    if( time.charAt(0) === '1' && (charCode === 52 || charCode === 53) )
    {
        return point;
    }

    return 0;
}

// criteria - 5 : If date is odd or even
function datePoints(date){
    let data = date.charCodeAt(9);

    if(parseInt(data) % 2 === 1)
    {
        return 6;
    }

    return 0;
}

function calpoints(receipt) {
    
    let point = retailerNamePoints(receipt.retailer) + totalPoints(receipt.total)  
                    + itemsPoints(receipt.items) + timePoints(receipt.purchaseTime) + datePoints(receipt.purchaseDate);
    
    /*
        console.log(retailerNamePoints(receipt.retailer));
        console.log(totalPoints(receipt.total));
        console.log(itemsPoints(receipt.items));
        console.log(timePoints(receipt.purchaseTime));
        console.log(datePoints(receipt.purchaseDate));
    */
    return point;
}

//console.log(calpoints(receipts));

module.exports = calpoints;

