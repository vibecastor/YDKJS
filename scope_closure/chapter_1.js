//Chapter 1 - What is scope?

//Tokenizing/Lexing:  breaks the strings of characters into meaningful chunks...

//Parsing:  takes the stream (array) of tokens and turns it into a tree of nested elements. AKA:  "AST" Abstract Syntax Tree

var a = 2; //Variable Declaration (top level node)
  //a Identifier (child node)
  //= Assignment Expression (another child node)
  //2 Numeric Literal (child of assignment operator)

//  LHS:  who's the target of the assignment
//  RHS:  who's the source of the assignment
  

function foo(a) {
  console.log(a); // 2
}
foo(2); //foo is a RHS - what is the value of foo? //an LHS is performed to find the source of 2 which is assigned as a parameter of the function foo.

//Quiz LHS versus RHS lookups

function foo(a) { //LHS a = 2 (a parameter of 2)
	var b = a; //LHS b = // RHS = a
	return a + b; //RHS a+ //RHS + b
}

var c = foo( 2 );  //LHS c= LHS // RHS foo = 2

//Nested Scope

function foo(a) {
  console.log(a + b); //b is not scoped inside of foo so it goes up a level and finds it in the global scope.
}
var b = 2;  // here it is in global scope

foo(2); //4

//Errors

function foo(a) {
  console.log(a + b); 
  b = a;//RHS lookup will throw a ReferenceError for b
}

foo(2);

//ReferenceError: a failed RHS lookup...

//TypeError:  Lookup was successful but illegally operation such as trying to execute as a function some non-function value OR reference a property on an null or undefined value.  
	
	
//'Strict Mode':  added in ES5 disallows the automatic/implicit global variable creation that would be allowed in "lazy/normal/relaxed" mode...