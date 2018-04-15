//Appendix A: Dynamic Scope

function foo() {
  console.log(a); //2 //3 if dynamic 
}

function bar() {
  var a = 3;
  foo();
}

var a = 2;

bar();

//Lexical scope cares where a function was declared, but dynamic scope cares where a function was called from.

//this cares how a function was called, which shows how closely related the this mechanism is to the idea of dynamic scoping.