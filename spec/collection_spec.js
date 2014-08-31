describe('Collection', function() {
    var Collection, collection, internalArray;
    
    beforeEach(function() {
        internalArray = [1,2,3];
        Collection = require('../collection');
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
            expect(secondArrayRepresentationOfCollection).toEqual([1,2,3]); 
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
    
    describe('add(e)', function() {
        it('should add the passed element to the end of the collection', function() {
            collection.add(4);
            expect(collection.toArray()).toEqual([1,2,3,4]);
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
        it('should return a new Collection instance containing f(e) for each element e in the original collection, in the original order', function() {
            function double(numberToDouble) { return numberToDouble * 2 }
            var newCollection = collection.map(double); 
            expect(newCollection.toArray()).toEqual([2,4,6]);
        });
    });
    
    describe('filter(f)', function() {
        it('should return a new Collection instance containing only those elements e from the original collection for which f(e) is true', function() {
            function isEven(potentiallyEvenNumber) {
                return potentiallyEvenNumber % 2 == 0;     
            }
            var onlyEvenNumbers = collection.filter(isEven);
            var arrayRepresentationOfCollectionContainingOnlyEvenNumbers = onlyEvenNumbers.toArray();
            expect(arrayRepresentationOfCollectionContainingOnlyEvenNumbers).toEqual([2]);
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
    
    describe('forEach(f)', function() {
        describe('where f is a function f(e, index, collection, causeBreak), such that f is invoked for each element e in the collection, index is the 0-based index of the current element e, collection is a reference to the original collection, and causeBreak is a function which can optionally be called to terminate looping early', function() {
            var testArray, indexOnWhichToCallCauseBreak;
            
            beforeEach(function() {
                testArray = []; 
            });   
            
            function callThisForEachElementInCollection(currentElement, currentIndex, collectionBeingIteratedOver, causeBreak) {
                testArray[currentIndex]=currentElement;
                expect(collectionBeingIteratedOver).toBe(collection);
                if(indexOnWhichToCallCauseBreak==currentIndex) causeBreak();
            }
            
            describe('when an f is passed which does not invoke the causeBreak function', function() {
                it('should call f for each element in collection', function() {
                    indexOnWhichToCallCauseBreak = 5;
                    collection.forEach(callThisForEachElementInCollection);
                    expect(testArray[0]).toEqual(1);
                    expect(testArray[1]).toEqual(2);
                    expect(testArray[2]).toEqual(3);    
                    expect(testArray.length).toBe(3);
                });    
            }); 
            describe('when an f is passed which does invoke causeBreak() before the iteration is complete', function() {
                it('should call f for only those elements up to and including the element in which causeBreak was invoked, but not beyond', function() {
                    indexOnWhichToCallCauseBreak = 1;
                    collection.forEach(callThisForEachElementInCollection);
                    expect(testArray[0]).toEqual(1);
                    expect(testArray[1]).toEqual(2);   
                    expect(testArray[2]).toBeUndefined();
                    expect(testArray.length).toBe(2);    
                });
            });
        });
    });
});