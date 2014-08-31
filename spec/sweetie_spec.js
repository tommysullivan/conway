describe('Sweetie', function() {
 var Sweetie, sweetie, Tommy, tommy, beach;
    
    beforeEach(function() {
        Tommy = require('../tommy.js');
        tommy = Tommy(console);
        spyOn(tommy, 'addArrayOfNumbers').andCallThrough();
        Sweetie = require('../sweetie.js'); //all constructor uppercase
        beach = jasmine.createSpyObj('beach', ['viewSunset']);
        sweetie = Sweetie(tommy, beach); // instance of the sweetie class
    });
    
    it('is a class which can be instantiated to create instances of Sweeties!', function() {
        expect(sweetie).not.toBeNull(); 
    });
    
    describe('instances', function() {
     describe('can be asked to sum the squares of an array of numbers', function() {
            it('squares each number, asking tommy to then add those squares', function() {
                 expect(sweetie.getSumOfSquares([3,4,5])).toBe(50); 
                 expect(tommy.addArrayOfNumbers).toHaveBeenCalledWith([9,16,25]);
             });
         });
    
        describe('can be asked to enjoy the sunset', function() {
            it('calls the viewSunset method of the beach, passing along the requested time, plus an extra minute to really soak in the moment', function() {
                sweetie.enjoySunset(20);
                expect(beach.viewSunset).toHaveBeenCalledWith(21); 
            });
        }); 
    });
});