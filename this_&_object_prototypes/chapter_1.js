//Chapter 1: this or That?

//displaying the utility of contextual 'this'...
function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = `Hello, I'm ` + identify.call(this);
  console.log(greeting);
}

var me = {
  name: 'Kyle'
};

var you = {
  name: 'Bear Dog'
};

identify.call(me); //Kyle
identify.call(you); //Bear Dog

speak.call(me); //Hello, I'm KYLE
speak.call(you); //Hello, I'm BEAR DOG

//Passing a context object instead of using 'this'...
function identify(context) {
  return context.name.toUpperCase();
}
function speak(context) {
  var greeting = `Hello, I'm ` + identify(context);
  console.log(greeting); 
}

var me = {
  name: 'Kyle'
};

var you = {
  name: 'Bear Dog'
};

identify(you); //BEAR DOG
speak(me); //KYLE

//
function foo(num) {
  console.log(`foo: ` + num );

  //keep track of how many times foo is called...
  this.count++//not the 'this' you were looking for, instead count is a global variable.
}

foo.count = 0; //adding a property "count" to the function object.

var i;

for ( i = 0; i < 10; i++) {
  if ( i > 5) {
    foo(i);
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
console.log(foo.count); //0 --WHY???

//hacking around the problem using lexical scope...
function foo(num) {
  console.log(`foo: ` + num );
  //keep track of how many times foo is called...
  data.count++
}

var data = {
  count: 0
};

var i;

for ( i = 0; i < 10; i++) {
  if ( i > 5) {
    foo(i);
  }
}
console.log(data.count); //4

//how to reference a function from inside itself...
//works
function foo() {
  foo.count = 4; //'foo' refers to itself.
}
//doesn't work
setTimeout(function() {
  //anonymous function (no name), cannot refer to itself
}, 10);

//not using 'this' and referring to the function by name works just fine in this case...
function foo(num) {
  console.log('foo:' + num);
}

foo.count = 0;//tracking how many times foo is called...

var i;

for ( i = 0; i < 10; i++) {
  if ( i > 5) {
    foo(i);
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
console.log(foo.count); //0 --WHY??? //the example doesn't work???

//forcing 'this' to point at foo...
function foo(num) {
  console.log('foo:' + num);
  //tracking how many times foo is called
  //'this' is actually 'foo' now!
  this.count++;
}

foo.count = 0;

var i;

for ( i = 0; i < 10; i++) {
  if ( i > 5) {
    foo.call(foo, i);
  }
}
console.log(foo.count);  //4

//'this' does not access a functions "lexical scope"
function foo() {
  var a = 2;
  this.bar();//works but not correct usage...
}

function bar() {
  console.log(this.a);//does not work
}
foo(); //undefined

//this is not an author time binding but instead a run time binding....
//it has nothing to do with where the function is declared and everything to do with where it's called...
//execution context:  created when a function invoked...
 