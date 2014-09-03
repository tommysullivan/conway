module.exports = function(internalArray,Collection){
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
        }
      
    }
}