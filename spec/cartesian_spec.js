 describe('CartesianSpace', function() {
     var CartesianSpace, cartesianSpace, point, pointA, pointB;
     beforeEach(function() {
         CartesianSpace = require('../cartesian_space.js');
         cartesianSpace = CartesianSpace();
     }); 
    
     it('can be instantiated', function() {
         expect(cartesianSpace).not.toBeUndefined(); 
     });
    
     describe('createPoint', function() {
         it('creates a point in the space', function() {
             var point = cartesianSpace.createPoint(1,2,3);
             expect(point.xCoord).toBe(1);
             expect(point.yCoord).toBe(2);
             expect(point.zCoord).toBe(3);
         }); 
     });
     
     describe('calculateDistanceBetweenTwoPoints',function(){
          it('calculates the distance between two points in the space', function(){
             pointA = cartesianSpace.createPoint(1,2,3);
             pointB = cartesianSpace.createPoint(4,8,9);
               expect(cartesianSpace.calculateDistanceBetweenTwoPoints(pointA,pointB)).toBe(9);
          });    
      });
 });