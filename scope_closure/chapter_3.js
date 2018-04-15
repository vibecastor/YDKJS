//Chapter 3:  Function versus Block Scope

//Javascript has function based scope
//Each function creates a bubble of it's own scope

//foo includes three identifiers (a, b, c and bar) because they all fall within foo's curly braces or parameters.
function foo(a) { //foo is in global scope
  var b = 2;
  //some code
  function bar() { //bar also has it's own scope but bar is part of foo's scope
    //more code
  }
  //even more code
  var c = 3;
}

bar(); //fails because it would need to called inside of foo.
console.log(a,b,c); //all three fail because they are inside foo's scope.  the console.log would need to be placed inside of foo's scope as well.

//Hiding Scope

//"Principle of Least Privilege":  expose only what is minimally necessary and hide anything else...


//doSomethingElse and b should be hidden from the outside scope....
function doSomething(a) {
  b = a + doSomethingElse(a * 2);
  console.log(b * 3);
}

function doSomethingElse(a) {//this function should be hidden from the outside scope
  return a - 1;
}

var b;//no reason to share b outside of doSomething's scope

doSomething(2);

//This accomplishes the same but is a better and more secure design because b and doSomethingElse are not exposed to the surrounding scope.
function doSomething(a) {
  function doSomethingElse(a) {
    return a - 1;
  }
  var b;

  b = a + doSomethingElse(a * 2);
  console.log(b * 3);
}

doSomething(2);

//Collision Avoidance

function foo() {
  function bar(a) {
    i = 3; //changing the 'i' in the enclosing scope's for-loop//declaring var i = 3 would solve this....not sure why anyone would just say i = 3???  
    console.log(a + i);
  }
  for (var i = 0; i < 10; i++) {//i = 3 now!
    bar(i * 2); //danger, infinite loop!
  }
}

foo();


//Global "Namespaces"
//Libraries often create a single variable declaration of an object scoped in teh global context.  The object is then used as a "namespace" for that library.

//everything is safely stored inside of MyReallyCoolLibrary
var MyReallyCoolLibrary = {
  awesome: "stuff",
  doSomething: function() {
    //code
  },
  doAnotherThing: function() {
    //code
  }
};

//Functions As Scopes
//function declaration versus function expression

//you can wrap any snippet of code in a function and hide any function or variable declarations from the outside scope...

//Not ideal because it pollutes the surrounding scope with a declared function name "foo".  We also have to call it in order for the code to run....

//function declaration
var a = 2;

function foo() {  //insert this
  var a = 3;
  console.log(a); //3
} //and this
foo();// and this

console.log(a); //a = 2 from line 84 above

//A better alternative would be if the name was also hidden from the surrounding scope and the code ran automatically (sounds like functional programming!!!)

//function expression
var a = 2;

(function foo(){ //insert this
  var a = 3;
  console.log(a); //3
})(); //and this

console.log(a); //2

//Anonymous vs. Named functions

//function expressions as callback parameters...
setTimeout( function() { //anonymous callback expression
  console.log('I waited 2 seconds!!');
}, 2000);

//Anonymous callback function expressions have 3 drawbacks...
  //1.  no useful name to display in stack traces - makes debugging difficult
  //2.  no way to refer to itself
  //3.  not readable 

  //inline function expressions

  //best practice to always name your function expressions...
  setTimeout( function timeoutHandler() { //Look, I haz namez!
    console.log('I waited 30 seconds!');
  }, 30,000);

//IIFE: Immediately Invoked Function Expressions
var a = 2;

(function IIFE() { //the external parens makes it a function expression
  var a = 3;
  console.log(a); //3
})();//() calls the function immediately

console.log(a);  //2

//Different stylistically but same outcome...
var a = 2;

(function IIFE() {
  var a = 3;
  console.log(a);
}()); //you can invoke the function inside the wrapping parens as well.  Same outcome.
console.log(a); //still 2

//another variation on IIFE's is to pass in arguments like so...

var a = 2;

(function IIFE(global) {//you can pass in anything from the surrounding scope and you can name the parameters whatever you want.
  var a = 3;
  console.log(a); //3
  console.log(global.a); //2
})(window);

console.log(a); //still 2

//ensuring undefined is in fact the undefined from the current code block
undefined = true;  //danger...do not do this in real life!  Only defining undefined for purposes of the example below.

(function IIFE(undefined) {
  var a;
  if (a === undefined) {
    console.log('Undefined is safe here!');
  }
})();

//Another variation on IIFE's
//slightly more verbose but perhaps easier to read...
var a = 2;

(function IIFE(def) {
  def(window);
}) (function def(global) {
  var a = 3;
  console.log(a); //3
  console.log(global.a); //2
});

//Blocks as Scopes

//for loops are a common example of block-scope
for (var i = 0; i < 10; i++) {
  console.log(i);//i is available here!
}

//block scoping is declaring variables as close as possible, as local as possible to where they will be used.

//another example of block scope.
var foo = true;

if (foo) {
  var bar = foo *2;//not truly block scoped because we used var which makes it available in the surrounding scope.
  bar = something(bar);
  console.log(bar);
}

//Unfortunately, javascript has no obvious way to block scope code...

//"with" is an example of block scope but don't use it.

//try/catch:  variable declarations in catch statements are block scoped.
try {
  undefined(); //illegal operation on purpose.
}
catch (err) {
  console.log(err);  //works!
}

console.log(err); //ReferenceError: 'err' not found because 'err' only exists in the catch clause.

//let keyword:  attached the variable declaration to the block scope i.e {} it's called in...
var foo = true;

if (foo) {
  let bar = foo *2;
  bor = something(bar);
  console.log(bar);
}

console.log(bar);//ReferenceError because bar is locally scoped inside the if statement

//explicitly defining scope by added additional code blocks {...}
var foo = true;

if (foo) {
  {//explicit block
    let bar = foo * 2;
    bar = something(bar);
    console.log(bar);
  }
}

console.log(bar);//ReferenceError...still

//let declarations do not 'hoist to the code entire code block.  They don't exist until they are declared...
{
  console.log(bar);//ReferenceError
  let bar = 2;
}

//Garbage Collection

function process (data) {
  //do something here
}

var someReallyBigData = {...};

process(someReallyBigData);

var btn = document.getElementById('my_button');
btn.addEventListener('click', function click(event){
  console.log('button clicked');
}, /*capturingPhase=*/false);


//Block scoping can free up memory such as...
function process(data) {
  //do something here
}

//anything in this block can be garbage collected after it runs...
{
  let someReallyBigData = {...};
  process(someReallyBigData);
}
var btn = document.getElementById('my_button');

btn.addEventListener('click', function click(event){
  console.log('button clicked');
}, /*capturingPhase=*/false);

//let fixes for loops!

for (let i = 0; i < 10; i++) {
  console.log(i);//ReferenceError because i is not available
}

//let also binds the variable to each iteration of the loop...
{
  let j;
  for(j = 0; j < 10; j++) {
    let i = j; // j is re-bound for each iteration
    console.log(i);
  }
}

//take care when refactoring code from var to let...

//bar is not blocked scoped.....
var foo = true, baz = 10;

if (foo) {
  var bar = 3;

  if (baz > bar) {
    console.log(baz);
  }
  //...
}

//bar becomes blocked scoped....

var foo = true, baz = 10;

if (foo) {
  var bar = 3;
  //...
}

if (baz > bar) {//bar is ony available because we used var and not let...
  console.log(baz);
}

//CONST:  creates a block-scoped variable that is immutable

var foo = true;

if (foo) {
  var a = 2;
  const b = 3; //block scoped to the containing 'if'

  a = 3;//works
  b = 4;//Uncaught TypeError: Assignment to constant variable.
}
console.log(a); //3
console.log(b);  //ReferenceError: b is not defined





