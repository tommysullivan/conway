/*
In Node.js, the "require" function takes one parameter, the path to a javascript file. It returns
whatever the value of module.exports is *in that file*
*/

var Collection = require('../collection'); 

describe('Collection', function() {
    var collection, internalArray;
    
    beforeEach(function() {
        internalArray = [1,2,3];
        collection = Collection(internalArray); 
    });
    
    it('should be instantiable', function() {
        expect(collection).not.toBeUndefined(); 
    });
    
    describe('toArray()', function() {
        var arrayRepresentationOfCollection;
        
        beforeEach(function() {
            arrayRepresentationOfCollection = collection.toArray();  
        });
        
        it('should return a native javascript array representation of the collection', function() {
            expect(arrayRepresentationOfCollection).toEqual([1,2,3]); 
        });
        
        describe('when the returned array is changed', function() {
            it('does not affect the collection', function() {
                arrayRepresentationOfCollection.push(4);
                var secondArrayRepresentationOfCollection = collection.toArray();  
                expect(secondArrayRepresentationOfCollection).toEqual([1,2,3]);
            });
        });
        describe('when the collection is changed', function() {
            it('does not affect the previously returned array representation of the collection', function() {
                collection.add(4);
                expect(arrayRepresentationOfCollection).toEqual([1,2,3]); 
            });
        })
    }); 
    
    describe('clone()', function() {
        it('should return a new instance of Collection which is an independent clone of the original collection', function() {
            var clone = collection.clone();
            collection.add(8);
            clone.add(9);
            expect(collection.toArray()).toEqual([1,2,3,8]);
            expect(clone.toArray()).toEqual([1,2,3,9]);
        }); 
    });
    
    describe('add(e)', function() {
        var result;
        beforeEach(function() {
            result = collection.add(4);
        });
        it('should add the passed element to the end of the collection', function() {
            expect(collection.toArray()).toEqual([1,2,3,4]);
        }); 
        it('should not return anything', function() {
            expect(result).toBeUndefined(); 
        });
    });
    
    describe('get(i)', function() {
        describe('when the collection contains an element at the requested index i', function() {
            it('should return the element at index i', function() {
                expect(collection.get(1)).toBe(2);  
            });
        });
        describe('when the collection does not contain an element at the requested index i', function() {
            it('should throw an exception whose message contains the index i', function() {
                function attemptToGetIndexThatIsOutOfRange() {
                    collection.get(7);    
                }
                expect(attemptToGetIndexThatIsOutOfRange).toThrow(); //I don't see how to test for the exception message, just that an exception is thrown
            }); 
        });
    });
    
    describe('hasIndex(i)', function() {
        describe('when the collection has an element at the passed index i', function() {
            it('should return true', function() {
                expect(collection.hasIndex(2)).toBeTruthy(); 
            }); 
        });
        describe('when the collection does not have an element at the passed index i', function() {
            it('should return false', function() {
                expect(collection.hasIndex(9)).toBeFalsy(); 
            }); 
        }); 
    });
    
    describe('map(f)', function() {
        it('should return a new Collection instance containing elements equal to f(e, i, c) for each element e at index i in c, where c is this Collection instance', function() {
            function double(numberToDouble) { return numberToDouble * 2 }
            var mockMap = jasmine.createSpy('mockMap');
            mockMap.andCallFake(double);
            var newCollection = collection.map(mockMap); 
            expect(newCollection.toArray()).toEqual([2,4,6]);
            expect(mockMap.calls[0].args).toEqual([1,0,collection]);
            expect(mockMap.calls[1].args).toEqual([2,1,collection]);
            expect(mockMap.calls[2].args).toEqual([3,2,collection]);
            expect(mockMap.calls.length).toEqual(3);
        });
    });
    
    describe('remove(e)', function() {
        describe("when one or more of the collection's elements are equal to e according the == operator", function() {
            it('should remove those equivalent elements, shifting elements down to unused indices', function() {
                collection.add(2);
                collection.add(5);
                collection.remove(2);
                expect(collection.toArray()).toEqual([1,3,5]);
            }); 
        }); 
    });
    
    describe('firstIndexOf(e)', function() {
        describe("when one or more of the collection's elements are equal to e according to the == operator", function() {
            it('should return the index of the first equivalent element', function() {  
                collection.add(3);
                var firstIndexOfElement = collection.firstIndexOf(3);
                expect(firstIndexOfElement).toBe(2);
            }) 
        }); 
        describe("when none of the collection's elements are equal to e according to the == operator", function() {
            it('should throw an error', function() {
                function attemptToGetFirstIndexOfItemThatIsNotInCollection() {
                    collection.firstIndexOf(8);
                }
                expect(attemptToGetFirstIndexOfItemThatIsNotInCollection).toThrow();
            });  
        });
    });
    
    describe('addCollection(collectionOfItemsToAdd)', function() {
        it('should add all of the items in the passed collectionOfItemsToAdd to the current collection', function() {
            var collectionOfItemsToAdd = Collection([7,8,9]);
            collection.addCollection(collectionOfItemsToAdd);
            expect(collection.toArray()).toEqual([1,2,3,7,8,9]);
        }); 
    });
    
    describe('removeCollection(collectionOfItemsToRemove)', function() {
        it('should remove all of the items in the passed collectionOfItemsToRemove from the current collection', function() {
            var collectionOfItemsToRemove = Collection([1,3]);
            collection.removeCollection(collectionOfItemsToRemove);
            expect(collection.toArray()).toEqual([2]);
        }); 
    });
    
    describe('filter(f)', function() {
        it('should return a new Collection instance containing only those elements e from the original collection for which f(e) is true', function() {
            function isEven(potentiallyEvenNumber) {
                return potentiallyEvenNumber % 2 == 0;     
            }
            var onlyEvenNumbersCollection = collection.filter(isEven);
            var arrayRepresentationOfCollectionContainingOnlyEvenNumbers = onlyEvenNumbersCollection.toArray();
            expect(arrayRepresentationOfCollectionContainingOnlyEvenNumbers).toEqual([2]);
            
            function isOdd(potentiallyOddNumber) {
                return potentiallyOddNumber % 2 == 1;     
            }
            
            var onlyOddNumbersCollection = onlyEvenNumbersCollection.filter(isOdd);
            var arrayRepresentationOfCollectionContainingOnlyOddNumbers = onlyOddNumbersCollection.toArray();
            expect(arrayRepresentationOfCollectionContainingOnlyOddNumbers).toEqual([]);
        }); 
    });
    
    describe('contains(e)', function() {
        describe('when the collection contains the sought element e', function() {
            it('should return true', function() {
                expect(collection.contains(3)).toBeTruthy(); 
            }); 
        });
        describe('when the collection does not contain the sought element e', function() {
            it('should return false', function() {
                expect(collection.contains(8)).toBeFalsy(); 
            }); 
        }); 
    });
    
    describe('length()', function() {
        it('returns the number of elements in the collection', function() {
            expect(collection.length()).toBe(3);
            collection.add(7);
            expect(collection.length()).toBe(4);
        });
    });
    
    describe('regular for syntax example', function() {
        var items = [1,5,8,2,4];
        var sum = 0;
        for(var index=0; index<items.length; index++) {
            var element = items[index];
            if(element==2) break;
            if(element==5) continue;
            sum = sum + element;
        }
        expect(sum).toBe(9);
        //1. used the index of the current position in the loop
        //2. used the 'collection' (in this case, an array) inside the loop
        //3. used the current element
        //4. used a mechanism to conditionally "break" out of the loop
        //5. used a mechanism to conditionally jump to the next iteration of the loop
        //6. did something to affect a variable that was defined outside the loop
        
        //forEach method is a functional way of expressing and solving the same problems as traditional for each (1=6)
        var messages = ['fsdfsfd','sdfsdfs','sdfsdfsdfs','sdfsdfsdf']
        
        //either we loop traiditionally
        // for(var c=0; c<messages;length; c++) {
        //     console.log(message[c]);
        // }
        
        // //loop using forEach (functional style - closer to lambda calculus)
        // messages.forEach(console.log);
        
        // function writeArrayIndexAndValueToConsoleButBreakAndWriteTDubsKittyKittyIfValueIsTDubs(value, currentIndex) {
        //     if(value=='tdubs') {
        //         console.log('tdubs kitty kitty!');
        //         return true;
        //     }
        //     console.log('current index = '+currentIndex+' and value = '+value);
        //     return false;
        // }
        
        // function otherFunc(value, currentIndex) {}
        
        // function forEach(arrayOfItemsToLoopOver, functionToCallForEachItem) {
        //     //we have to invoke functionToCallForEachItem the number of times there are elements in the array, each time passing in the array and the index we are at
        //     for (var sss=0;sss<arrayOfItemsToLoopOver.length;sss++){
        //         var value = arrayOfItemsToLoopOver[sss];
        //         var shouldBreak = functionToCallForEachItem(value,sss);
        //         if (shouldBreak) break;
        //     }
            
        // }
        
        // var itemsToWriteToConsoleInFancyWay = ['tommy','sweetie','sex','tdubs','taxes'];
        // forEach(itemsToWriteToConsoleInFancyWay, writeArrayIndexAndValueToConsoleButBreakIfValueIsTDubs);
    });
    
    describe('forEach(f, rN?)', function() {
        describe('where f is a function f(e, index, collection, forceBreak), such that f is invoked for each element e in the collection, index is the 0-based index of the current element e, collection is a reference to the original collection, and forceBreak(rF) is a function which can optionally be called from within f in order to force termination of looping. forEach(f, rN) shall return rN if looping completes normally, and rF if forceBreak is called.', function() {
            var testArray, indexOnWhichToCallCauseBreak;
            
            beforeEach(function() {
                testArray = []; 
            });   
            
            function callThisForEachElementInCollection(currentElement, currentIndex, collectionBeingIteratedOver, forceBreak) {
                testArray[currentIndex]=currentElement;
                expect(collectionBeingIteratedOver).toBe(collection);
                if(indexOnWhichToCallCauseBreak==currentIndex) forceBreak(22);
            }
            
            describe('when an f is passed which does not invoke the forceBreak function', function() {
                it('should call f for each element in collection and return the second argument', function() {
                    indexOnWhichToCallCauseBreak = 5;
                    var retVal = collection.forEach(callThisForEachElementInCollection, 77);
                    expect(testArray[0]).toBe(1);
                    expect(testArray[1]).toBe(2);
                    expect(testArray[2]).toBe(3);    
                    expect(testArray.length).toBe(3);
                    expect(retVal).toBe(77);
                });    
            }); 
            describe('when an f is passed which does invoke forceBreak() before the iteration is complete', function() {
                it('should call f for only those elements up to and including the element in which forceBreak was invoked, but not beyond, returning the argument passed to forceBreak()', function() {
                    indexOnWhichToCallCauseBreak = 1;
                    var retVal = collection.forEach(callThisForEachElementInCollection, 77);
                    expect(testArray[0]).toBe(1);
                    expect(testArray[1]).toBe(2);   
                    expect(testArray[2]).toBeUndefined();
                    expect(testArray.length).toBe(2); 
                    expect(retVal).toBe(22);
                });
            });
        });
    });
});