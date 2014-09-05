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
               return internalArray[indx];
            }
            else
            { 
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
        },
        map:function(fnct){
            var mappedArray = [];
            for(var j in internalArray) { 
                mappedArray[j]=fnct(internalArray[j]);
            }
            var newInstance = Collection(mappedArray); 
            return newInstance;    
        },
        remove:function(copyCat){
            for(var j in internalArray) { 
                 if (internalArray[j]==copyCat){
                     internalArray.splice(j,1);
                 }
             }
        },
        firstIndexOf:function(copyCat){
            var j = 0;
            for(; j < internalArray.length; j++) { 
                 if (internalArray[j]==copyCat){return j};
                 if (j==internalArray.length-1){throw "ERROR!"};
            }
        },
        addCollection: function(collection){
            internalArray=internalArray.concat(collection.toArray());
        }
        
        //also, i just pushed the latest to github so we have a recent backup in version control
        //you can do this too by going to the terminal:
        //Window -> New Terminal -> git add -A (adds changes to working space) -> git commit -m "commit message here" -> 
        //git push origin master (push latest commits to remote repository on github.com)
    }
}