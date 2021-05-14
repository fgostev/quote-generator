const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];
newArr = "";

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// New quote at the ditme
function newQuote(){
showLoadingSpinner();
    // pick random quote
   const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
   quoteText.textContent = quote.text;
//    check if author unknown
   if(!quote.author){
authorText.textContent = "Unkown"   
} else {
       authorText.textContent = quote.author;
   }
// check quote length for styling
   if(quote.text.length > 100){
       quoteText.classList.add('long-quote');
   }else{
    quoteText.classList.remove('long-quote');
   }
//    Set Quote, Hide Loader
quoteText.textContent = quote.text;
removeLoadingSpinner();
}



// Get quotes from API

async function getQuotes(){
    showLoadingSpinner();
    try{
        const resp = await fetch('https://type.fit/api/quotes');
        apiQuotes = await resp.json();
        newQuote();
    }
    catch(err){
        console.log("NOOOO!")
    }
}

// tweet the quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


// Event Listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// getQuotes();

getQuotes();