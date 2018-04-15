//Chapter 3:  Objects

//Object literals (declarative)
var myObj = {
	key: value
	// ...
};

//Constructor form (imperative)
var myObj = new Object();
myObj.key = value;


var strPrimitive = "I am a string";
typeof strPrimitive;	// "string"
strPrimitive instanceof String;	// false

var strObject = new String( "I am a string" );
typeof strObject; // "object"
strObject instanceof String;	// true

// inspect the object sub-type
Object.prototype.toString.call( strObject );	// [object String]

//Use ojeject literal as opposed to constructor form whenever possible...
var strPrimitive = "I am a string";

console.log( strPrimitive.length );// 13

console.log( strPrimitive.charAt( 3 ) );// "m"

//references to values are sometimes stored inside objects...not the values themselves
var myObject = {
	a: 2
};

myObject.a;// 2

myObject['a']// 2


//. requires a valid property name identifer and [...] can use a string
var wantA = true;
var myObject = {
	a: 2
};

var idx;

if (wantA) {
	idx = "a";
}
// later
console.log( myObject[idx] ); // 2

//Object property names are always strings or they will be converted to strings...
var myObject = { };

myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"];	// "foo"
myObject["3"];		// "bar"
myObject["[object Object]"];// "baz"

//Using myObject[...] to access property names...
var prefix = "foo";

var myObject = {
	[prefix + "bar"]: "hello",
	[prefix + "baz"]: "world"
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world

//property versus method...
  //just because a function is a value or a property does not make it a method...
function foo() {
	console.log('foo');
}

var someFoo = foo;	// variable reference to `foo`

var myObject = {
	someFoo: foo
};

foo;// function foo(){..}

someFoo;// function foo(){..}

myObject.someFoo;// function foo(){..}

//even funciton expressions are still just references to the function (nothing special about their relationship to the object and doensn't make them a method.)
var myObject = {
	foo: function foo() {
		console.log( "foo" );
	}
};

var someFoo = myObject.foo;

someFoo;// function foo(){..}

myObject.foo;// function foo(){..}

//Arrays
var myArray = ['foo', 42, 'bar'];
myArray.length;// 3
myArray[0];// "foo"
myArray[2];// "bar"

//Arrays are objects so you can add properties...
//adding named properties (regardless of . or [ ] operator syntax) does not change the reported length of the array.
var myArray = ['foo', 42, 'bar'];
myArray.baz = 'baz';
myArray.length;	// 3
myArray.baz;// "baz"

//If you add a property that looks like a numeric value it may add an index value...
var myArray = ['foo', 42, 'bar'];
myArray['3'] = 'baz';
myArray.length;// 4
myArray[3];// "baz"

//copying objects is not so simple...
function anotherFunction() { /*..*/ }

var anotherObject = {
	c: true
};

var anotherArray = [];

var myObject = {
	a: 2,
	b: anotherObject,	// reference, not a copy!
	c: anotherArray,	// another reference!
	d: anotherFunction
};

anotherArray.push( anotherObject, myObject );

//instead use JSON
var newObj = JSON.parse( JSON.stringify(someObj));

//Object.assign() make s shallow copy of an object as of ES6
var newObj = Object.assign( {}, myObject );

newObj.a;		// 2
newObj.b === anotherObject;		// true
newObj.c === anotherArray;		// true
newObj.d === anotherFunction;	// true

//Property Descriptors:  read only or writable?
var myObject = {
	a: 2
};

Object.getOwnPropertyDescriptor( myObject, "a" );
// {
//    value: 2,
//    writable: true,
//    enumerable: true,
//    configurable: true
// }

//Declaring propertied descriptors....
var myObject = {};

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: true,
	configurable: true,
	enumerable: true
} );

myObject.a; // 2

//You can change the value of a property if it's 'writable'
var myObject = {};

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: false, // not writable!
	configurable: true,
	enumerable: true
} );

myObject.a = 3;

myObject.a; // 2

//strict mde throws an error when you try to change an unwritable property value
"use strict";

var myObject = {};

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: false, // not writable!
	configurable: true,
	enumerable: true
} );

myObject.a = 3; // TypeError


//You can configure a property if it's set to allow configuration...
var myObject = {
	a: 2
};

myObject.a = 3;
myObject.a;// 3

Object.defineProperty( myObject, 'a', {
	value: 4,
	writable: true,
	configurable: false,// not configurable!
	enumerable: true
} );

myObject.a;// 4
myObject.a = 5;
myObject.a;// 5

Object.defineProperty( myObject, "a", {
	value: 6,
	writable: true,
	configurable: true,
	enumerable: true
} ); // TypeError


// if the property is already configurable:false, writable can always be changed from true to false without error, but not back to true if already false.
var myObject = {
	a: 2
};

myObject.a;// 2
delete myObject.a;
myObject.a;// undefined

Object.defineProperty( myObject, 'a', {
	value: 2,
	writable: true,
	configurable: false,
	enumerable: true
} );

myObject.a;// 2
delete myObject.a;
myObject.a;// 2

//configurable:false prevents the ability to use the delete operator to remove an existing property.
var myObject = {
	a: 2
};

myObject.a;				// 2
delete myObject.a;
myObject.a;				// undefined

Object.defineProperty( myObject, 'a', {
	value: 2,
	writable: true,
	configurable: false,
	enumerable: true
} );

myObject.a;// 2
delete myObject.a;
myObject.a;// 2

//immutability will be shallow effecting only the current object and not references to others...
myImmutableObject.foo; //[1,2,3]
myImmutableObject.foo.push(4);
myImmutableObject.foo; //[1,2,3,4]

//creating an object constant
var myObject = {};

Object.defineProperty( myObject, 'FAVORITE_NUMBER', {
	value: 42,
	writable: false,
	configurable: false
} );

//Preventing Extensions
var myObject = {
	a: 2
};

Object.preventExtensions(myObject);

myObject.b = 3;
myObject.b; //undefined OR TypeError in 'strict mode'

//[[GET]]
//the engine performs a [[GET]](); to lookup the property name and the assigned value....
var myObject = {
	a: 2
};

myObject.a;//2

//Returns undefined if if doesn't find anything
var myObject = {
	a: 2
};

myObject.b; // undefined instead of ReferenceError which is what would happen if failed a variable lookup...

//Getters and Setters
var myObject = {
	// define a getter for `a`
	get a() {
		return 2;
	}
};

Object.defineProperty(
	myObject,// target
	"b",// property name
	{		// descriptor
		  // define a getter for `b`
		get: function(){ return this.a * 2 },

		// make sure `b` shows up as an object property
		enumerable: true
	}
);

myObject.a; // 2

myObject.b; // 4

//Instead always define a Getter as well as a Setter
var myObject = {
	// define a getter for `a`
	get a() {
		return this._a_;
	},

	// define a setter for `a`
	set a(val) {
		this._a_ = val * 2;
	}
};

myObject.a = 2;

myObject.a; // 4

//Existence:  does an object have a certain property?
var myObject = {
	a: 2
};

('a' in myObject);// true
('b' in myObject);// false

myObject.hasOwnProperty( "a" );	// true
myObject.hasOwnProperty( "b" );	// false

//Enumeration
var myObject = { };

Object.defineProperty(
	myObject,
	'a',
	// make `a` enumerable, as normal
	{ enumerable: true, value: 2 }
);

Object.defineProperty(
	myObject,
	'b',
	// make `b` NON-enumerable
	{ enumerable: false, value: 3 }
);

myObject.b; // 3
('b' in myObject); // true
myObject.hasOwnProperty( "b" ); // true

// .......

for (var k in myObject) {
	console.log( k, myObject[k] );
}
// 'a' 2

//enumerable versus non-enumerable properties
var myObject = { };

Object.defineProperty(
	myObject,
	'a',
	// make `a` enumerable, as normal
	{ enumerable: true, value: 2 }
);

Object.defineProperty(
	myObject,
	'b',
	// make `b` non-enumerable
	{ enumerable: false, value: 3 }
);

myObject.propertyIsEnumerable( 'a' ); // true
myObject.propertyIsEnumerable( 'b' ); // false

Object.keys( myObject ); // ['a']
Object.getOwnPropertyNames( myObject ); // ['a', 'b']

//Iteration

//using a standard for loop to iterate over the numerically indexed array values(indices....
var myArray = [1, 2, 3];

for (var i = 0; i < myArray.length; i++) {
	console.log( myArray[i] );
}
// 1 2 3

//ES6 for..of loo allows you to iterate over the values rather than the indices...
var myArray = [ 1, 2, 3 ];

for (var v of myArray) {
	console.log( v );
}
// 1
// 2
// 3

//using the built in iterator that exists on all array objects...
var myArray = [ 1, 2, 3 ];
var it = myArray[Symbol.iterator]();

it.next(); // { value:1, done:false }
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { done:true }

var myObject = {
	a: 2,
	b: 3
};

//defining a default iterator for an object...
Object.defineProperty( myObject, Symbol.iterator, {
	enumerable: false,
	writable: false,
	configurable: true,
	value: function() {
		var o = this;
		var idx = 0;
		var ks = Object.keys(o);
		return {
			next: function() {
				return {
					value: o[ks[idx++]],
					done: (idx > ks.length)
				};
			}
		};
	}
} );

// iterate `myObject` manually
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }

// iterate `myObject` with `for..of`
for (var v of myObject) {
	console.log( v );
}
// 2
// 3

//be careful not to create infinite iterators 
var randoms = {
	[Symbol.iterator]: function() {
		return {
			next: function() {
				return { value: Math.random() };
			}
		};
	}
};

var randoms_pool = [];
for (var n of randoms) {
	randoms_pool.push( n );

	// don't proceed unbounded!
	if (randoms_pool.length === 100) break;
}

