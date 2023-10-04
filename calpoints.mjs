const RETAILER_NAME_POINTS = 1;
const ROUND_DOLLAR_POINTS = 50;
const QUATER_DOLLAR_POINTS = 25;
const ITEM_PAIR_POINTS = 5;
const ITEM_DESCRIPTION_POINTS = 0.2;
const DATE_POINTS = 6;
const TIME_POINTS = 10;

// Utility function to calculate points for retailer name crtieria 
function calculateRetailerNamePoints(retailer) {
    const trimmedRetailer = retailer.trim();
    let points = 0;

    for(let char of trimmedRetailer) { 
        const charCode = char.charCodeAt(0);
        
        if( 
            (charCode > 47 && charCode<58 ) || 
            (charCode > 64 && charCode < 91) || 
            (charCode > 96 && charCode < 123)
        ){
            points += RETAILER_NAME_POINTS;
        }
    }

    return points;
}

// Utility function to calculate points for Total crtieria 
function calculateTotalPoints(total){
    
    if(parseInt(total) === total)
    {
        return ROUND_DOLLAR_POINTS + QUATER_DOLLAR_POINTS;
    }
    if((total * 100) % 25 === 0 )
    {
        return QUATER_DOLLAR_POINTS;
    }

    return 0;
}

// Utility function to calculate points for Item crtieria  
function calculateItemsPoints(items){
    const len = items.length;

    let points = parseInt((len/2)) * ITEM_PAIR_POINTS;

    for(const item of items)
    {
        if(item.shortDescription.trim().length % 3 === 0)
        {
            points +=  Math.ceil(parseFloat(item.price) * ITEM_DESCRIPTION_POINTS);
        }
    }

    return points;
}

// Utility function to calculate points for retailer time crtieria 
function calculateTimePoints(time){

    return time.startsWith('1') && (time.charCodeAt(1) === 52 || time.charCodeAt(2) === 53) ? TIME_POINTS : 0;
}

// Utility function to calculate points for retailer date crtieria
function calculateDatePoints(date){
    
    return parseInt(date.charCodeAt(9)) % 2 === 1 ? DATE_POINTS : 0;
}

function calpoints(receipt) {
    
    const retailerPoints = calculateRetailerNamePoints(receipt.retailer);
    const totalPoints = calculateTotalPoints(receipt.total);
    const itemsPoints = calculateItemsPoints(receipt.items);
    const timePoints = calculateTimePoints(receipt.purchaseTime);
    const datePoints = calculateDatePoints(receipt.purchaseDate);
    
    return retailerPoints + totalPoints + itemsPoints + timePoints + datePoints;
}

export default calpoints;

