//Appendix B: Polyfilling Block Scope

//block scope in pre-ES6 environs...

//in ES6...
{
  let a = 2;
  console.log(a); //2
}

console.log(a); //ReferenceError

//Using catch pre-ES6...

try{throw 2}catch(a){
  console.log(a); //2
}
console.log(a); //ReferenceError

//Traceur:  a Google project to transpile ES6 code to ES5 environs...

//Traceur would produce...so you can use block scope back to ES3 when try/catch was implemented

{
  try{
    throw undefined;
  } catch (a) {
    a = 2;
    console.log(a);
  }
}

console.log(a);

//Implicit versus Explicit Blocks

//using "let blocks" or "let statements" versus the "let declarations" which is what you are used to seeing...
let (a = 2) {
  console.log(a); //2
}

console.log(a); //ReferenceError

//...a function wrapped around any arbitrary code changes the meaning, inside of that code, of this, return, break, and continue.

