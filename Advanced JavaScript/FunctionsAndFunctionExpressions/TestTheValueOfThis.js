//Using global scope with this
function testContext() {
    console.log(this);
}

testContext();

//Inside another function
function outsideTest(){

    function insideTest(){
       testContext();
    }

    insideTest();
}

outsideTest();

//Call the function as an object
var testObj = new testContext();
//console.log(testObj);
