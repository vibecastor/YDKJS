//Chapter 2 - Lexical Scope

//Lexical Scope:  scope is defined by author-time decisions of where functions are declared

// Lexical Scope:  Most common and used by JS
// Dynamic Scope:  used by Perl, Bash etc.

// Nested scope
function foo(a) {//foo creates it's own scope with foo as the identifier
  
  var b = a * 2;//foo has three identifiers in it's scope (a, bar and b)

  function bar(c) {//bar creates it's own scope containing the identifier c
    console.log(a,b,c);
  }

  bar(b * 3);
}

foo(2); // 2 4 12

//Shadowing:  using the same identifier in different scopes.

//Cheating Lexical Scope

//don't use eval() because it created it's own scope.
//don't use setTimeOut(), or setInterval()
//don't use 'with'  because it leaks to the next lexical scope

//example of using eval to cheat lexical scope
function foo(str, a) {
  eval(str); //cheating
}
var b = 2;

foo("var b = 3;", 1); //1 3

//example of how 'use strict' keeps the engine from creating global variables that were not authored
function foo(str) {
  "use strict"; //why would you ever do this???
  eval(str);
  console.log(a); //throws a ReferenceError: a is not defined
}

foo("var a = 2");

//example:  "with" keyword to cheat lexical scope

var obj = {
  a: 1,
  b: 2,
  c: 3
};

//tedious repetition ro "obj"
obj.a = 2;
obj.b = 3;
obj.c = 4;

//easier short-hand using "with"
with (obj) {
  a = 3;
  b = 4;
  c = 5;
}

//example 2:  "with" keyword

function foo (obj) {
  with (obj) {
    a = 2;
  }
}
var o1 = {
  a: 3
};
var o2 = {
  b: 3
};

foo(o1);
console.log(o1.a); // 2

foo(o2);
console.log(o2.a); //undefined
console.log(a); // a should = 3 but scope leak from the next level scope

//do not cheat scope because it slows down your code.  Using eval, with, setInterval and setTimer will bypass the engines built in performance optimizations.