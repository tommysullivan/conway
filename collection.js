//sweetie i noticed you do not pass in anything for SweetieException, and there should be no need for lowercase collection at all!!
module.exports = function(internalArray,Collection,SweetieException,collection){
    return {
        toArray:function(){
            var copyOfArray = internalArray.slice(0); //we could reduce these two lines to one, but since it adds *clarity* i think it is best as two. :) clarity in that slice(0) is not self explanatory!
            return copyOfArray;
        },
        add:function(itemToAdd){
            internalArray.push(itemToAdd);
        },
        clone:function(){
            var independentInternalArray = this.toArray();
            var newIndependentInstance = Collection(independentInternalArray); 
            return newIndependentInstance;
        }, 
        get:function(indx){
            if (indx < internalArray.length && indx >= 0 && indx === (indx|0)){
               return internalArray[indx]; //since this is a single statement we need not put it on its own line or in a block {}
            }
            //we need not have an else due to the fact the if condition positive case returns.
            else
            { 
                //this happens to work because my test is not good enough... it is testing for ANY exception to be thrown
                //but the exception here is that SweetieException is undefined, not a function, so the system throws its
                //own exception because your code which tries to create (and then throw) an exception causes an exception!
                //And the exception happens because you try to invoke SweetieException as a function, but it is not a function - it is undefined
                //(because as noted above, you do not pass anything in to the constructor at the top when you call it from the tests!)
                //also, please don't use keyword "new". We will explore the usage of that at a later time
                //but for now I prefer that you do not use it. Please see additional notes in the exception class!!! love my sweetie!! :)
                throw new SweetieException(indx);  
            }
        },
        hasIndex:function(indx){
           if (indx < internalArray.length && indx >= 0 && indx === (indx|0)){
               return true;
            }
            else
            { 
                return false;  
            }  
            
            //more concisely, we can simply say:
            //return index < internalArray.length && index >= 0 && index === (index|0);
        },
        //Sweetie, let's change the variable name from fnct :) In javascript style, except for counters in loops, we will not use
        //abbreviations or single letter identifiers for variables, functions, etc.
        //We will spell out words in camelCaseLikeThis. NotInProperCase and not_ruby_style.
        //we also will seek to give every identifer a name which a new reader would find self explanatory as to the purpose of the identifer
        //so I might suggest here instead of fnct, how about 'functionThatMapsEachCollectionElementToANewCollectionElement' 
        //perhaps even changing the whole signature of the method to 'mapToNewCollectionUsingMapFunction(mapFunction)'
        //or at least 'mapperFunction' since the word 'function' is reserved and thus cannot be used as an identifier name.
        map:function(fnct){
            var mappedArray = [];
            //may i suggest that we reuse the forEach logic?
            this.forEach(function(item, index, collection) {
                mappedArray[index]=fnct(item, index, collection); 
            });
            // for(var j=0; j<internalArray.length; j++) { 
            //     mappedArray[j]=fnct(internalArray[j], j, this); //<- i added two more parameters to be passed to the mapper - j and this. its normal to expect these for mapping.
            // }
            var newInstance = Collection(mappedArray); //<- i see you kept this on its own line :)
            return newInstance;    
        },
         //Sweetie, why is this parameter named copyCat?
        remove:function(copyCat){
            //Might I suggest a reuse of contains() and firstIndexOf() here? let's update the test to check that an exception is thrown if the object being removed does not exist!
            //if(!this.contains(copyCat)) throw 'Cannot remove element that does not exist: '+copyCat.toString();
            //internalArray.splice(this.firstIndexOf(copyCat));
            
            for(var j in internalArray) { 
                 if (internalArray[j]==copyCat){
                     internalArray.splice(j,1);
                 }
             }
        },
        //Sweetie, why is this parameter named copyCat?
        firstIndexOf:function(copyCat){
            //Sweetie, you need not declare j outside of the loop unless you need to refer to it afterward, which is a rare need
            //I have commented out your core and replaced it with my preference :)
            //but then i realized i would even more prefer the for.. in syntax so i commented out my own and replaced that!
            // var j = 0;
            // for(; j < internalArray.length; j++) {
            for(var j = 0; j < internalArray.length; j++) {
            //for(var j in internalArray) {
                 if (internalArray[j]==copyCat){return j};
                 //You may move the throw condition outside of the loop = if we reach the end of the loop, we throw! no need to check on each iteration right? :)
                 //Also, we need not use {} for an if block if the block is only a single statement.
                //  if (j==internalArray.length-1){throw "ERROR!"}; 
                //  if (j==internalArray.length-1) throw 'Error'; // <- this is fine without the {} because "throw 'Error'" is one statement.
            }
            throw 'Error!'; //<-let's throw here instead
        },
        addCollection: function(collection){
            internalArray=internalArray.concat(collection.toArray()); //<- very nice and concise! i like it!!
        },
        //i wrote this for my sweetie. i think it would've been very challenging and you could've done it. but
        //i want you to review it and ensure you would be capable to explain how it works with little trouble if I were to ask
        //instead of deriving it yourself. Notice the clever use of closures. But also pay attention to how it is used.
        forEach: function(callback, valueToReturnIfLoopingCompletesNormally) {
            var valueToReturnIfLoopingIsBroken;
            var breakWasForced = false;
            function forceBreak(requestedReturnValue) {
                breakWasForced = true;
                valueToReturnIfLoopingIsBroken = requestedReturnValue;
            }
            for(var i=0; i<internalArray.length && !breakWasForced; i++) {
                callback(internalArray[i], i, this, forceBreak);
            }
            return breakWasForced ? valueToReturnIfLoopingIsBroken : valueToReturnIfLoopingCompletesNormally;
        }
    }
}