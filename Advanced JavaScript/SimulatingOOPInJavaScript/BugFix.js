function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.name = this.firstName + " " + this.lastName;

    // another way with function
    // this.name = function () {
    // return this.firstName + " " + this.lastName;
    // }
}

var peter = new Person("Peter", "Jackson");
console.log(peter.name);
console.log(peter.firstName);
console.log(peter.lastName);

