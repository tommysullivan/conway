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
            return Collection(independentInternalArray); 
        }, 
        get:function(index){
            if (index < internalArray.length && index >= 0 && index === (index|0)) return internalArray[index];
            throw "This subscript " + index + " is out of range, sweetie!!";
        },
        hasIndex:function(index){
            return index < internalArray.length && index >= 0 && index === (index|0);
        },
        map:function(mapperFunction){
            var mappedArray = [];
            this.forEach(function(item, index, collection) {
                mappedArray[index]=mapperFunction(item, index, collection); 
            });
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
            //TODO: Let's rewrite this, reusing both forEach() as well as remove()
            var arrayToBeRemoved=collection.toArray();  
            var k = 0;
             for(var j in internalArray) { 
                 if (internalArray[j]==arrayToBeRemoved[k]){
                     internalArray.splice(j,1);
                     k++;
                 }
             }
        },
        filter: function(predicateFunction) {
            //TODO: Rewrite this using forEach() - there is an example of using forEach in map() above which I added for you :)
            var filteredArray = [];
            for(var j=0; j<internalArray.length;j++){
                var currentElement = internalArray[j];
                if (predicateFunction(currentElement)) {
                    filteredArray.push(currentElement);
                }
            }
            return Collection(filteredArray);
        },
        length: function() {
            return internalArray.length;
        },
        contains: function(soughtItem) {
            //TODO: Implement this method sweetie! :)
        }
    }
}