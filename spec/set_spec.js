// describe('Set', function() {
//     var Set, set;
    
//     beforeEach(function() {
//         Set = require('../set');
//         set = Set([1,2,3]);
//     });
    
//     it('should be instantiable', function() {
//         expect(set).not.toBeUndefined(); 
//     });
    
//     describe('toArray()', function() {
//         it('returns the contents of the set as an array', function() {
//             expect(set.toArray()).toEqual([1,2,3]);
//         }); 
//     });
    
//     describe('add(i)', function() {
//         describe('when the item is not already in the set', function() {
//             it('adds the item to the set', function() {
//                 set.add(4);
//                 expect(set.toArray()).toEqual([1,2,3,4]);
//             });   
//         });
        
//         describe('when the item is already in the set', function() {
//             it('throws an exception', function() {
//                 function attemptToAddExistingValueToSet() {
//                     set.add(3);
//                 }
//                 expect(attemptToAddExistingValueToSet).toThrow(); 
//             });
//         });
//     });
    
//     describe('union(s)', function() {
//         it('should return a new set which is the union of the current set and the set s', function() {
//             var setToUnion = Set([1,2,3,4,5]);
//             var unionedSet = set.union(setToUnion);
//             expect(unionedSet.toArray()).toEqual([1,2,3,4,5]);
//         }); 
//     });
    
//     describe('intersect(s)', function() {
//         it('should return a new set which is the intersection of the current set and the set s', function() {
//             var setToIntersect = Set([1,4,3]);
//             var intersectionSet = set.intersect(setToIntersect);
//             expect(intersectionSetunionedSet.toArray()).toEqual([1,3]);
//         }); 
//     });
// });