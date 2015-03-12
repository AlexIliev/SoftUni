String.prototype.startsWith = function comapareStringsStartsWith(substring){
    var thisString = this;
    var substringLength = substring.length;
    var thisStringSlice = thisString.slice(0, substringLength);

    if (thisStringSlice === substring) {
        return true;
    } else {
        return false;
    }
};

var example = "This is an example string used only for demonstration purposes.";
console.log(example.startsWith("This"));
console.log(example.startsWith("this"));
console.log(example.startsWith("other"));

String.prototype.endsWith = function comapareStringsEndsWith(substring){
    var thisString = this;
    var substringLength = substring.length;
    var startString = thisString.length - substringLength;
    var thisStringSlice = thisString.slice(startString, thisString.length);

    if(thisStringSlice === substring) {
        return true;
    } else {
        return false;
    }
};

example = "This is an example string used only for demonstration purposes.";
console.log(example.endsWith("poses."));
console.log(example.endsWith ("example"));
console.log(example.startsWith("something else"));

String.prototype.left = function stringToLeft(count){
    var thisString = this;
    if (thisString.length > count) {
        var thisStringSlice = thisString.slice(0, count);
        return thisStringSlice;
    } else {
        return thisString.toString();
    }

};

example = "This is an example string used only for demonstration purposes.";
console.log(example.left(9));
console.log(example.left(90));

String.prototype.right = function stringToRight(count){
    var thisString = this;
    if (thisString.length > count) {
        var thisStringSlice = thisString.slice(thisString.length- count, thisString.length);
        return thisStringSlice;
    } else {
        return thisString.toString();
    }
};

example = "This is an example string used only for demonstration purposes.";
console.log(example.right(9));
console.log(example.right(90));
// Combinations must also work
example = "abcdefgh";
console.log(example.left(5).right(2));

String.prototype.padLeft = function stringPadLeft(count, character){
    var thisString = this;

    if (!character) {
        character = ' ';
    }

    var resultString = '';
    for (var i = 0; i < count; i++) {
       resultString += character;
    }

    return resultString + thisString;
};

var hello = "hello";
console.log(hello.padLeft(5));
console.log(hello.padLeft(10));
console.log(hello.padLeft(5, "."));
console.log(hello.padLeft(10, "."));
console.log(hello.padLeft(2, "."));

String.prototype.padRight = function stringPadRight(count, character){
    var thisString = this;

    if (!character) {
        character = ' ';
    }

    var resultString = '';
    for (var i = 0; i < count; i++) {
        resultString += character;
    }

    return thisString + resultString;
};

hello = "hello";
console.log(hello.padRight(5));
console.log(hello.padRight(10));
console.log(hello.padRight(5, "."));
console.log(hello.padRight(10, "."));
console.log(hello.padRight(2, "."));

String.prototype.repeat = function stringRepeat(count){
    var thisString = this;

    var resultString = '';
    for (var i = 0; i < count; i++) {
        resultString += thisString;
    }

    return resultString;
};

var character = "*";
console.log(character.repeat(5));
// Alternative syntax
console.log("~".repeat(3));
// Another combination
console.log("*".repeat(5).padLeft(10, "-").padRight(15, "+"));
