//Chapter 5: Scope Closure

//Closure:  when a function is able to remember and access it's lexical scope even when the function is executing outside it's own lexical scope


//bar() closes over the scope of foo() because bar() is nested inside of foo() but this is not a perfect example of closure...more an example of lexical scope.
function foo() {
  var a = 2;

  function bar() {
    console.log(a); //2
  }

  bar();
}

foo();

//good example of closure

function foo() {
  var a = 2;

  function bar() {
    console.log(a);
  }
  return bar;
}

var baz = foo();

baz(); //2 because bar is still running 

//anytime a function is passed around as a value or invoked in another location is an example of closure

function foo() {
  var a = 2;

  function baz(){
    console.log(a);//2
  }

  bar(baz);
}

function bar(fn) {
  fn(); //closure
}

//indirect passing of functions...
var fn;

function foo() {
  var a = 2;

  function baz() {
    console.log(a);
  }

  fn = baz; //assign 'baz' to a global variable
}

function bar() {
  fb(); // closure
}

foo();
bar(); //2 because baz is still running

//real world example of closure
function wait(message) {
  setTimeout(function timer() {
    console.log(message);
  }, 1000);
}

wait('hello closure');

//closure using jQuery
function setupBot(name, selector) {
  $(selector).click(function activator() {
    console.log('Activating: ' + name );     
  });
}

setupBot( 'Closure Bot 1', '#bot_1');
setupBot( 'Closure Bot 2', '#bot_2');

//Not all IIFE's are examples of closure

//this is an IIFE but not closure because the function IIFE is executed in it's own lexical scope.  It's not referenced outside it's own scope.  
var a = 2;

(function IIFE() {
  console.log(a);
})();

//Loops + Closure

for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}//returns 6 five times because the function runs five times effectively after the loop runs.

//Try again with the function as an IIFE
for (var i = 1; i <= 5; i++) {
  (function() {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  })();
}//returns same as above

//again with it's own variable declared in scope
for (var i = 1; i <= 5; i++) {
  (function() {
    var j = i;
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  })();
}//works correctly this time! 1, 2, 3, 4, 5

//You can also write it as...
for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}//returns 1, 2, 3, 4, 5

//block scoping inside for loops using let
for (var i = 1; i <= 5; i++) {
    let j = i; //creates block scope for closure
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
}// 1, 2, 3, 4, 5

//Special behavior for let declarations inside the head of a for loop...the variable will be declared for each iteration of the loop and initialized with the value from the end of the previous iteration.
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer(){
    console.log(i);
  }, i * 1000);
}//1,2,3,4,5

//Modules

//example not a module
//doSomething() and doAnother() have lexical scope and closure over the inner scope of foo...
function foo() {
  var something = 'cool';
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join( ' ! '));
  }
}

//example of a "Revealing Module"
function CoolModule() {
  var something = 'cool';
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join( ' ! '));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  }; //returning an object like a public API for out module in that the inner variables "something" and "cool" remain hidden.
}

var foo = CoolModule();

foo.doSomething(); //cool
foo.doAnother(); //1 ! 2 ! 3

//foo is accessing the inner properties of CoolModule!
//not all modules have to return objects
//they can return functions and you can still reference properties on the functions since all functions are objects in javascript.

//2 requirements for the module pattern...
//First, there must be an outer enclosing function and it must be invoked at least once (each time creates a new module instance)
//Second, the enclosing function must return back at least one inner function so the inner function has closure over the private scope and can access or modify that private state.

//example of a one-off module
//turned the module into an IIFE immediately invoking is and assigning it's return value directly to our single module instance identifier 'foo'.

var foo = (function CoolModule() {
  var something = 'cool';
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join( ' ! '));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
})();

foo.doSomething(); //cool
foo.doAnother(); //1 ! 2 ! 3

//modules are nothing more than functions so they can also receive parameters...

function CoolModule(id) {
  function identify() {
    console.log(id);
  }
  return {
    identify: identify
  };
}

var foo1 = CoolModule( 'foo 1');
var foo2 = CoolModule( 'foo 2');

foo1.identify(); // 'foo 1'
foo2.identify(); // 'foo 2'

//naming the return object as your publicAPI
var foo = (function CoolModule(id) {
  function change() {
    //modifying the public API
    publicAPI.identify = identify2;
  }

  function identify1() {
    console.log(id);
  }

  function identify2() {
    console.log(id.toUpperCase() );
  }

  var publicAPI = {
    change: change,
    identify: identify1
  };

  return publicAPI;
})('foo module');

foo.identify(); //foo module
foo.change();
foo.identify(); //FOO MODULE

//Modern Modules

var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }//invoking the definition wrapper function for a module (passing in any dependencies), and storing the return value, the module's API, into an internal list of modules tracked by name.

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get
  };
})();

//using the above to define some modules...
MyModules.define('bar', [], function(){
  function hello(who) {
    return "let me introduce: " + who;
  }
  return {
      hello: hello
  };
});

MyModules.define('foo', ['bar'], function(bar){
  var hungry = 'hippo';

  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }

  return {
    awesome: awesome
  };
});

var bar = MyModules.get('bar');
var foo = MyModules.get('foo');

console.log(
  bar.hello('hippo')
); //let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO

//Future Modules

//ES6 adds first class syntax for the concept of modules.  When using ES6 you can load each file as a separate module.  

//bar.js

function hello(who) {
  return 'Let me introduce: ' + who;
}

export hello;

//foo.js

  //import only 'hello()' from the 'bar' module...
import hello from 'bar';

var hungry = 'hippo';

function awesome() {
  console.log(
      hello(hungry).toUpperCase()
    );
}

export awesome;

//import the entire 'foo' and 'bar' modules
module foo from 'foo';
module bar from 'bar';

console.log(
  bar.hello('rhino')
); //let me introduce: rhino

foo.awesome(); //LET ME INTRODUCE: HIPPO

