//Chapter 2:  this all makes sense now


//Call-site:  

//Call-stack:

//call-stack and call-site demo...
function baz() {
  //call-stack is: 'baz'
  //so, our call-site is in the global scope
}
console.log('baz');
bar(); // <-- call-site for 'bar'

function bar() {
  //call-stack is: 'baz' -> 'bar'
  //so, our call-site is in 'baz'

  console.log('bar');
  foo(); // <-- call-site for 'foo'
}

function foo() {
  //insert debugger here!
  //call-stack is: 'baz' -> 'bar' -> 'foo'
  //so, our call-site is in 'bar'

  console.log('foo');
}

baz(); // <-- call-site for 'baz'


//4 rules for determining where 'this' will point...

//1 - Default Binding:  stand alone function invocation
function foo() {
  console.log(this.a);//this points to the global object because foo is invoked in the global scope but doesn't work in 'strict mode'
}
var a = 2;//global variable

foo(); //2 -OR- undefined

//2 - Implicit Binding:  if the function is referenced in an object then the 'this' refers to the object
function foo() {
  console.log(this.a); //this.a is synonymous with obj.a 
}

var obj = {
  a: 2,
  foo: foo //foo is referenced as a property of obj
};

obj.foo(); //2

//only the top/last level of an object property reference chain matters to the call-site.
function foo() {
  console.log(this.a);//will reference obj2.a
}

var obj2 = {
  a: 42,
  foo: foo
};

var obj1 = {
  a: 2,
  obj2: obj2
};

obj1.obj2.foo(); //42

//3 - Implicitly Lost - usually to global scope OR undefined in 'strict mode'
function foo() {
  console.log(this.a);//won't work because a is declared as a global variable below.
}

var obj = {
  a: 2,
  foo: foo
};

var bar = obj.foo; //function reference/alias!

var a = 'oops, global';  //'a' also a property on global object

bar(); //'oops, global'

//Implicit loss when passing a callback function
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  //'fn' is just another reference to 'foo'
  fn(); // <-- call-site!
}

var obj = {
  a: 2,
  foo: foo
};

var a = 'oops, global'; //'a' is also a property on the global object

doFoo(obj.foo);  //'oops, global'

//same if passing a callback to a built-in function like setTimeout
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

var a = 'oops, global again'; //'a' is also a property on the global object

setTimeout(obj.foo, 100); //'oops, global again'

//Explicit Binding:  directly stating what you want the 'this' to be....

  //call();
  //apply();

  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 2
  };

  foo.call(obj); //2 //explicit binding foo.call(..) forces foo's 'this' to be 'obj'.

  //boxing:  If you pass a simple primitive value (of type string, boolean, or number) as the this binding, the primitive value is wrapped in its object-form (new String(..), new Boolean(..), or new Number(..), respectively). This is often referred to as "boxing".

  //Hard Binding:
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 2
  };

  var bar = function() {
    foo.call(obj);
  };

  bar(); //2
  setTimeout(bar, 100); //2
//'bar' hard binds 'foo's' 'this' to 'obj'
//it cannot be overwritten
  bar.call(window); //2

  //most typical to wrap a function with a hard binding to create a pass-thru of any arguments passed and and return value received.
  function foo(something) {
    console.log(this.a, something);
    return this.a + something;
  }

  var obj = {
    a:2
  };

  var bar = function() {
    return foo.apply(obj, arguments);
  };

  var b = bar(3); //2 3
  console.log(b); //5

  //Same pattern used to create a re-usable helper
  function foo(something) {
    console.log(this.a, something);
    return this.a + something;
  }
  
  //simple 'bind' helper
  function bind(fn, obj) {
    return function() {
      return fn.apply(obj, arguments);
    };
  }

  var obj = {
    a: 2
  };

  var bar = bind(foo, obj);

  var b = bar(3); //2 3
  console.log(b); //5

//Built is ES5 utility, Function.prototype.bind
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2
};

var bar = foo.bind(obj);//bind returns a new function hard coded to call the original function with the 'this' context set as you specified.

var b = bar(3); //2 3
console.log(b); //5

//API Call "Contexts"
//many built in functions and libraries have a standard parameter 'context' so you don't have to use bind().
function foo(el) {
  console.log(el, this.id);
}

var obj = {
  id: 'awesome'
};

//use 'obj' as 'this' for 'foo(..)' calls
[1, 2, 3].forEach(foo, obj); // 1 "awesome" 2 "awesome" 3 "awesome"

//4 - new Binding

//new Function
  //1- a brand new object is created (constructed)
  //2- the newly constructed object is [[Prototype]] - linked
  //3- the newly constructed object is set as the 'this' binding for that function call
  //4- unless the function returns it's own alternate object, the 'new' invoked function call will automatically return the newly constructed object.

  function foo(a) {
    this.a = a;
  }

  var bar = new foo(2);
  console.log(bar.a); //2

  //explicit binding takes precedence over implicit
  function foo() {
    console.log(this.a);
  }

  var obj1 = {
    a: 2,
    foo: foo
  };

  var obj2 = {
    a: 3,
    foo: foo
  };

  obj1.foo(); //2
  obj2.foo();  //3

  obj1.foo.call(obj2); //3 //using call() explicitly binds
  obj2.foo.call(obj1); //2 //using call() explicitly binds

  //new?
  function foo(something) {
    this.a = something;
  }

  var obj1 = {
    foo: foo
  };

  var obj2 = {};

  obj1.foo(2);
  console.log(obj1.a); //2

  obj1.foo.call(obj2, 3);
  console.log(obj2.a); //3

  var bar = new obj1.foo(4);
  console.log(obj1.a); //2
  console.log(bar.a); //4

  //hard binding (explicit) versus new...
  function foo(something) {
    this.a = something;
  }

  var obj1 = {};

  var bar = foo.bind(obj1);
  bar(2);
  console.log(obj1.a); //2

  var baz = new bar(3);
  console.log(obj1.a); //2
  console.log(baz.a); //3 - new wins

  //polyfill Function.prototype.bind() ES5 form MDN
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (typeof this !== "function") {
        //closest possible to ECMA 5 script
        //internal IsCallable function
        throw new TypreError("Function.prototype.bind - what " + "is trying to be bound is not callable");
      }

      var aArgs = Array.prototype.slice.call(arguments, 1)
        fToBind = this,
        fNOP = function(){},
        fBound = function(){
          return fToBind.apply(
            (
              this instanceof fNOP && oThis ? this : oThis
            ),
            aArgs.concat(Array.prototype.slice.call(arguments))
          );
        }
  fNOP.prototype - this.prototype;
  fBound.prototype = new fNOP();

  return fBound;
  };
}

//"currying"?
function foo(p1, p2) {
  this.val = p1 + p2;
}
//using 'null' here because we don't care about the 'this' hard-binding in the scenario, and it will be overridden by the 'new' call anyway!
var bar = foo.bind(null, "p1");

var baz = new bar("p2");

baz.val; //p1p2

//exceptions to the rulez

//ignored this

function foo() {
  console.log(this.a);
}

var a = 2;

foo.call(null); //2

//OR
function foo(a, b) {
  console.log('a:' + a + ', b:' + b);
}

//spreading out array parameters
foo.apply( null, [2, 3] ); // a:2, b:3

//currying with 'bind(..)'
var bar = foo.bind(null, 2);
bar(3); //a:2, b:3

//passing an empty object or DMZ object
function foo(a, b) {
  console.log("a:" + a + ". b:" + b);
}

//DMZ object
var 0 = Object.create(null);

//spreading out array parameters
foo.apply( 0, [2, 3] ); // a:2, b:3

//currying with 'bind(..)'
var bar = foo.bind(0, 2);
bar(3); //a:2, b:3

//indirect reference to a function creates a default binding...
function foo() {
  console.log(this.a);
}

var a = 2;
var o = { a: 3, foo: foo};
var p = { a: 4};

o.foo(); //3
(p.foo = o.foo)(); //2

//Softening Binding
if (!Function.prototype.softBind) {
	Function.prototype.softBind = function(obj) {
		var fn = this,
			curried = [].slice.call( arguments, 1),
			bound = function bound() {
				return fn.apply(
					(!this ||
						(typeof window !== "undefined" &&
							this === window) ||
						(typeof global !== "undefined" &&
							this === global)
					) ? obj : this,
					curried.concat.apply( curried, arguments )
				);
			};
		bound.prototype = Object.create( fn.prototype );
		return bound;
	};
}

//softBind()
function foo() {
  console.log("name: " + this.name);
}

var obj = { name: "obj" },
   obj2 = { name: "obj2" },
   obj3 = { name: "obj3" };

var fooOBJ = foo.softBind( obj );

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2   <--look!!!

fooOBJ.call( obj3 ); // name: obj3   <--look!

setTimeout( obj2.foo, 10 ); // name: obj   <-- falls back to soft-binding

//lexical this
function foo() {
	// return an arrow function
	return (a) => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	};
}

var obj1 = {
	a: 2
};

var obj2 = {
	a: 3
};

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, not 3!

//arrow function cannot be overwritten even by 'new'
function foo() {
	setTimeout(() => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	},100);
}

var obj = {
	a: 2
};

foo.call( obj ); // 2

//pre-ES6
function foo() {
	var self = this; // lexical capture of `this`
	setTimeout( function(){
		console.log( self.a );
	}, 100 );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2

