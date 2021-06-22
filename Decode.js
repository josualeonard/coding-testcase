'use strict';

process.stdin.resume();
process.stdin.setEncoding('ascii');

let inputString = '';

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
function sort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            let current = inputArr[i];
            let j = i-1; 
            while ((j > -1) && (current[1] < inputArr[j][1])) {
                inputArr[j+1] = inputArr[j];
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;
}

process.stdin.on('data', function(input) {
    inputString += input;
});

process.stdin.on('end', function() {
    let unsorted = JSON.parse(inputString);
    let keys = Object.keys(unsorted);
    // Create array
    let arr = [];
    for(let i=0;i<keys.length;i++) {
        unsorted[keys[i]][0] = formatName(unsorted[keys[i]][0]);
        unsorted[keys[i]].unshift(keys[i]);
        arr.push(unsorted[keys[i]]);
    }
    let sorted = sort(arr);
    let newArr = [];
    // Merge sorted
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
    process.stdout.write(JSON.stringify(newArr));
});
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