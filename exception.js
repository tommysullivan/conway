//lets name this file sweetie_exception for consistency
module.exports = function(index){
    return {
        //here you are writing a class SweetieException that has a constructor function which takes index and returns a new
        //instance of the SweetieException class - an instance which itself has a method, sweetieException, which does not return
        //anything, but rather sets properties on the instance.
        sweetieException:function(index) {
            this.index = index;
            this.message1 = "This subscript";
            this.message2 = "is out of range, sweetie!!";
            this.toString = function() {
                return this.message1 + this.index + this.message2;
            }
        }
        //so, to be clear, when one instances this class, SweetieException, they get a new object
        //which has a method sweetieException, that when you call it, adds new properties to itself, including
        //a new method, toString, which did not exist until after you called sweetieException. So, one could do this:
        //
        /*
        var e = SweetieException(3);
        console.log(e.index); //->undefined
        console.log(e.message1); //->undefined
        console.log(e.toString()); //->Object [object]
        e.sweetieException(4);
        console.log(e.index); //->4;
        console.log(e.message1); //->"This subscript"
        console.log(e.toString()); //->"This subscript4is out of range, sweetie!!"
        
        here is what you want in the body of the constructor (top level function of this class):
        
        return {
            toString: function() {
                return "This subscript, " + index + ", is out of range, sweet sweet sweetie!!";
            }
        }
        */
        
    }
}