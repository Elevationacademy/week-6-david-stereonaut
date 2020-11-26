let p = $.get('/randomWord') //notice that we don't use a callback in this case! We can, but this is what we're avoiding.
console.log(p)


p
.then(function (word) {
    console.log(word)
})


$.get('/sentiment/Ploy')
    .then(function(sentiment){
        console.log(sentiment)
    })

$.get('/randomWord')
    .then(function (word) {
        return $.get(`/synonyms/${word}`)
    })
    .then(function (synonyms) {
        console.log(synonyms)
    })

const printResults = function (word, synonyms, sentiment) {
    console.log(`
        The word ${word} has a 
        ${sentiment === 1 ? "Positive" : sentiment === -1 ? "Negative" : "Neutral"} sentiment,
        its synonyms are: ${synonyms}`
    )
}

$.get('/randomWord')
    .then(function (word) {
        let synonymsPromise = $.get(`/synonyms/${word}`)
        let sentimentPromise = $.get(`/sentiment/${word}`)
        Promise.all([synonymsPromise, sentimentPromise])
            .then(function (results) {
                printResults(word, results[0], results[1])
            })
    })

$.get('/randomWord')
    .then(function (word) {
        let bookPromise =  $.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${word}`)
        let gifPromise = $.get(`http://api.giphy.com/v1/gifs/search?q=${word}&api_key=j2Rcc2eiIWFfUwuJCusU5s8gjIJ92EML`)
        Promise.all([bookPromise, gifPromise])
            .then(function(results){
                $('body').append(`<p>${results[0].items[0].volumeInfo.title}</p>`)
                $('body').append(`<img src="${results[1].data[0].images.original.url}">`)
            })
    })