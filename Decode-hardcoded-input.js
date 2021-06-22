let unsorted = {
    "9780736639859" : ["Leo Tolstoy", "Anna Karenina", "Happy families are all alike; every unhappy family is unhappy in its own way", "Everything was in confusion in the Oblonskys' house"],
    "9788491051329" : ["Jane Austen", "Pride and Prejudice", "It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife", "However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters"],
    "9780140232929" : ["Neal Stephenson", "Snow Crash", "The Deliverator belongs to an elite order, a hallowed subcategory", "He's got esprit up to here"],
    "9780140232925" : ["Ben Gorman", "Waterlily", "The Deliverator belongs to an elite order, a hallowed subcategory", "He's got esprit up to here"],
    "9780140237777" : ["John Cena", "Cup of Tea", "The Deliverator belongs to an elite order, a hallowed subcategory", "He's got esprit up to here"],
    "9780140232555" : ["Neal Stephenson", "Something Else", "Another text to an elite order, a hallowed subcategory", "He's got esprit up to here"],
};
let formatName = function (name) {
    let nameSp = name.split(" ");
    let lastName = nameSp[nameSp.length-1];
    nameSp.pop();
    let firstName = nameSp.join(" ");
    return lastName+((nameSp.length>0)?", ":"")+firstName;
}
let formatBook = function (obj) {
    let texts = [];
    for(let i=3;i<obj.length;i++) {
        texts.push(obj[i]);
    }
    return {
        "title": obj[2],
        "isbn": obj[0],
        "text": texts
    };
}
function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current[1] < inputArr[j][1])) {
                inputArr[j+1] = inputArr[j];
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;
}
let arr = [];
let keys = Object.keys(unsorted);
for(let i=0;i<keys.length;i++) {
    unsorted[keys[i]][0] = formatName(unsorted[keys[i]][0]);
    unsorted[keys[i]].unshift(keys[i]);
    arr.push(unsorted[keys[i]]);
}
let sorted = insertionSort(arr);
let newArr = [];
for(let i=0;i<sorted.length;i++) {
    let found = -1;
    let j=0;
    for(;j<newArr.length && found<0;j++) {
        if(newArr[j].name.localeCompare(sorted[i][1])===0) {
            found = j;
        }
    }
    if(found>=0) {
        newArr[found].books.push(formatBook(sorted[i]));
    } else {
        newArr.push({
            "name": sorted[i][1],
            "books": [
                formatBook(sorted[i])
            ]
        });
    }
}
console.log(newArr);
/*
Result:
[
  { name: 'Austen, Jane', books: [ [Object] ] },
  { name: 'Cena, John', books: [ [Object] ] },
  { name: 'Gorman, Ben', books: [ [Object] ] },
  { name: 'Stephenson, Neal', books: [ [Object], [Object] ] },
  { name: 'Tolstoy, Leo', books: [ [Object] ] }
]
*/