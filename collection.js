module.exports = function Collection(internalArray) {
    return {
        toArray:function(){
            var copyOfArray = internalArray.slice(0);
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
            if (indx < internalArray.length && indx >= 0 && indx === (indx|0)) return internalArray[indx];
            throw "This subscript " + indx + " is out of range, sweetie!!";
        },
        hasIndex:function(indx){
            return indx < internalArray.length && indx >= 0 && indx === (indx|0);
        },
        map:function(mapperFunction){
            var mappedArray = [];
            function doThisForEachItemInCollection(currentItem, currentIndex, collection) {
                mappedArray[currentIndex]=mapperFunction(currentItem, currentIndex, collection);    
            }
            this.forEach(doThisForEachItemInCollection);
            return Collection(mappedArray);
        },
        remove:function(itemToRemove) {
            for(var j in internalArray) { 
                 if (internalArray[j]==itemToRemove) internalArray.splice(j,1);
            }
        },
        firstIndexOf:function(soughtItem){
            for(var j = 0; j < internalArray.length; j++) {
                 if (internalArray[j]==soughtItem) return j;
            }
            throw 'Error!';
        },
        addCollection: function(collection){
            internalArray=internalArray.concat(collection.toArray());
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
        },
        removeCollection: function(collection){
            //TODO: Let's rewrite this, reusing both forEach() as well as remove(). One at a time though!
            //it is probably easiest to reuse the remove() first, leaving the existing looping structure
            //then once that test passes, you can figure out how to change the looping structure to use forEach
            var arrayToBeRemoved=collection.toArray();  
            var k = 0;
            for(var j in internalArray) { 
                if (internalArray[j]==arrayToBeRemoved[k]){
                    internalArray.splice(j,1);
                    k++;
                }
            }
            //One more thing, this is a common problem in programming - when looping through
            //something, but also modifying the thing you are looping through while you are still looping
            //can you think of some potentially dangerous consequences of this approach? Can you expose
            //those dangers with some new tests in our collection_spec.js and then come back and fix them?
        },
        filter: function(predicateFunction) {
            //TODO: Rewrite this using forEach() - there is an example in the map() implementation above that you can use as guidance!
            var filteredArray = [];
            for(var j=0; j<internalArray.length;j++){
                var currentElement = internalArray[j];
                if (predicateFunction(currentElement)) {
                    filteredArray.push(currentElement);
                }
            }
            return Collection(filteredArray);
        },
        contains: function(soughtElement){
            //TODO: Bonus points - rewrite this using forEach()! it might be tough!
            for (var j=0;j<internalArray.length;j++){
                //sweetie! your code was creating a new Colleciton instnace, passing a shared copy of this instance's internalArray,
                //then caling toArray() on that new Collection instance, then checking the jth element of the resulting
                //array! That is a lot of hoops to go through, all you really need to do is check
                //this Collection instance's internalArray[j] directly to see if it equals soughtElement. No need to create
                //a new Colleciton instance let alone immediately turn that collection back into an array, just to check the jth element :)
                if(internalArray[j]===soughtElement) return true;
                // if (Collection(internalArray).toArray()[j]===soughtElement){return true};
            }
            //and don't forget to return false if the loop completes! (though the test passes because if you
            //dont return then the value will be undefined, which matches to expect().toBeFalsy() condition )
            return false;
        },
        length: function() {
            //sweetie, again, here all we need to do is return the length of this collection instance's 
            //internalArray!
            return internalArray.length;
            // return Collection(internalArray).toArray().length;
        }
    }
}