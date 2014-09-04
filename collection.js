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
        }, //<------yay I did it!!
        get:function(indx){
            if (indx < internalArray.length){
               return internalArray[indx];
            }
            else
            { 
                throw new sweetieException(indx);  
            }
        },
        sweetieException:function(indx) {
            this.indx = indx;
            this.message1 = "This subscript";
            this.message2 = "is out of range, sweetie!!";
            this.toString = function() {
            return this.message1 + this.indx + this.message2;
            }
        },
        hasIndex:function(indx){
           if (indx < internalArray.length){
               return true;
            }
            else
            { 
                return false;  
            }  
        },
        map:function(fnct){
            var mappedArray = [];
            var j = 0;
            for (; j < internalArray.length; j++){
               mappedArray[j]=fnct(internalArray[j]);
               }
            var newInstance = Collection(mappedArray); 
            return newInstance;    
        }
        
        //also, i just pushed the latest to github so we have a recent backup in version control
        //you can do this too by going to the terminal:
        //Window -> New Terminal -> git add -A (adds changes to working space) -> git commit -m "commit message here" -> 
        //git push origin master (push latest commits to remote repository on github.com)
    }
}