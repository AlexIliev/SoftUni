//Define a function add() which adds numbers in a functional manner.
function add(a) {

    var sum = a;

    function incrementBy(b) {
        sum += b;
        return incrementBy;
    }

    incrementBy.toString = function() { return  sum};

    return incrementBy;
}

console.log( add(1)(2).toString());  // 3
console.log( add(5)(-1)(2).toString());  // 6
console.log( add(6)(-1)(-2)(-3).toString());  // 0
console.log( add(0)(1)(2)(3)(4)(5).toString());  // 15

console.log();

//Store the result and reuse it.
var addTwo = add(2);
console.log(addTwo.toString());
addTwo = add(2);
console.log(addTwo(3).toString());
addTwo = add(2);
console.log(addTwo(3)(5).toString());
