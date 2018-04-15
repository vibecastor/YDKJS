//Chapter 4: Hoisting

//Hoisting:  variable and function declarations are moved to the top of the code and assignments are left in place to be used during execution.

//first example
a = 2;
var a;
console.log(a); // 2 due to hoisting

//another example
console.log(a);
var a = 2;
//results in undefined

//the function declaration foo is hoisted by the complier along with it's value.
foo();

function foo() {
  console.log(a); //undefined needs to be below the variable declaration.

  var a =2;//a will be hoisted because it's scoped inside foo.
}

//below is the same as the above...
function foo() {
  console.log(a); //undefined

  var a =2;
}

foo();

//function expressions will not be hoisted...
foo(); //results in a TypeError.  The engine recognizes the function but does not know the value

var foo = function bar() {
  //...
};

//example of scope errors
foo(); //results in TypeError
bar(); // results in ReferenceError

var foo = function bar() {
  //...
};

//The above is interpreted same as...
var foo;

foo();
bar();

foo = function() {
  var bar = bar
    //...
}

//functions are hoisted before variables...

foo(); //1

var foo;

function foo() {
  console.log(1);
}

foo = function() {
  console.log(2);
}; 

//1 is printed instead of 2 because the engine interprets the code as ...
function foo() {
  console.log(1);
} 

foo(); //1

foo = function() {
  console.log(2);
};

//function declarations are hoisted before normal variables (see above)

//the most recent function declaration will override earlier ones....duplicate definitions in the same scope are a bad idea!
foo(); //3

function foo() {
  console.log(1);
}
var foo = function() {
  console.log(2);
};
function foo() {
  console.log(3);//this one wins!
}

