//Appendix C: Lexical-this

//Arrow functions

var foo = a => {
  console.log(a);
};

foo(2); //2

//What does the arrow do besides avoiding having to type "function"?

var obj = {
  id: 'awesome',
  cool: function coolFn() {
    console.log(this.id);
  }
};

var id = 'not awesome';

obj.cool(); //awesome

setTimeout(obj.cool, 100); //not awesome //you lost the 'this' binding on cool()

//You can solve it like this....but it's crazy!

var obj = {
  count: 0,
  cool: function coolFn() {
    var self = this;

    if (self.count < 1) {
      setTimeout(function timer() {
        self.count++;
        console.log('awesome?');
      }, 100);
    }
  }
};

obj.cool();  //awesome?

//ES6 solution using lexical 'this'
var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout( () => { //aarow function!
        this.count++;
        console.log('awesome?');
    }, 100 );
  }
}
};

obj.cool(); //awesome?

//Arrow functions take on the this value of their immediate lexical enclosing scope.

//Arrow functions are anonymous which is not good for code readability...

//instead embrace this and use it properly

var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout( function timer() {
        this.count++; //'this' is safe because of 'bind(..)'
        console.log('more awesome');
      }.bind(this), 100);  //look 'bind()'!
    }
  }
};

obj.cool(); //more awesome 
