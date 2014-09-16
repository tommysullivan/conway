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
        forEach: function(functionToCallForEachItem) {
            var arrayOfItemsToLoopOver = this.toArray();
            for (var currentIndex=0; currentIndex<arrayOfItemsToLoopOver.length; currentIndex++){
                var value = arrayOfItemsToLoopOver[currentIndex];
                var shouldBreak = functionToCallForEachItem(value,currentIndex,this);
                if (shouldBreak===false) return false;
            }
            return true;
        },
        removeCollection: function(collectionOfItemsToRemove){
            var thisCollection = this; //needed because "this" within the function below will be different!
            collectionOfItemsToRemove.forEach(function(itemToRemove) {
                thisCollection.remove(itemToRemove);
            });
        },
        filter: function(predicateFunction) {
            var filteredArray = [];
            function doThisForEachItem(currentItem){
                 if (predicateFunction(currentItem)) {filteredArray.push(currentItem)};
            }
            this.forEach(doThisForEachItem);
            return Collection(filteredArray);
        },
        contains: function(soughtElement){
            function doThisForEachItem(currentItem,index,collection){
               if(currentItem === soughtElement) return false;
            }
            return !this.forEach(doThisForEachItem);
        },
        length: function() {
            return internalArray.length;
        }
    }
}