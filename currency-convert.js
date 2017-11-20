const axios = require('axios');

const getExchangeRate = async (from,to)=>{
    try{
        const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
        return response.data.rates[to];
    }catch(e){
        throw new Error(`Unable to exchange rate ${from} to ${to}`);
    }
};

const getCountries = async (currencyCode)=>{
    try{
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country)=>country.name);
    }catch(e){
        throw new Error(`Unable to get coutries that use ${currencyCode}`);
    }
    
};

const convertCurrency = (from,to,amount)=>{
    let coutries;
    return getCountries(to).then(tempCoutries=>{
        coutries = tempCoutries;
        return getExchangeRate(from,to);
    }).then(rate=>{
        var exchangeAmount = rate * amount;
        return `${amount} ${from} is worth ${exchangeAmount} ${to} can be used in the following countries: ${coutries.join(',')}`;
    });
};

const convertCurrencyAlt = async (from,to,amount)=>{
    var coutries = await getCountries(to);
    var rate = await getExchangeRate(from,to);
    var exchangeAmount = rate * amount;
    return `${amount} ${from} is worth ${exchangeAmount} ${to} can be used in the following countries: ${coutries.join(',')}`;
};

// getExchangeRate('USD','EUR').then(rate=>{
//     console.log(rate);
// });

// getCountries('USD').then(callback=>{
//     console.log(callback);
// });

// convertCurrency('CAD','USD',20).then(callback=>{
//     console.log(callback);
// });

convertCurrencyAlt('USD','CAD',20).then(callback=>{
    console.log(callback);
}).catch(e=>{
    console.log(e.message);
});