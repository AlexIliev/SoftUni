//Problem 1
//Create a function printArgsInfo() with no parameters. For each argument passed to it, the function should return its type and its value.
//Call the function with different number and type of arguments

function printArgsInfo(){
    if (arguments.length > 0) {
        for(var i = 0; i < arguments.length; i+= 1) {
            console.log( arguments[i] + " " + "(" + typeof arguments[i] + ")");
        }
    }
    else {
        console.log("No arguments entered");
    }
}

printArgsInfo();
printArgsInfo(2, 3, 2.5, -110.5564, false);
printArgsInfo(null, undefined, "", 0, [], {});
printArgsInfo([1, 2], ["string", "array"], ["single value"]);
printArgsInfo("some string", [1, 2], ["string", "array"], ["mixed", 2, false, "array"], {name: "Peter", age: 20});
printArgsInfo([[1, [2, [3, [4, 5]]]], ["string", "array"]]);

console.log();

//Problem 2
//Call the function printArgsInfo() using call() and apply() as follows:
//Using call() without arguments
//Using call() with arguments
//Using apply() without arguments
//Using apply() with arguments


printArgsInfo.call();
printArgsInfo.call(null, 2, 3, 2.5, -110.5564, false);

console.log();

printArgsInfo.apply();
printArgsInfo.apply(null, [3, 5.6, "drum"]);