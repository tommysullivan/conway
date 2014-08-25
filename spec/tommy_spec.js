describe('Tommy', function() {
    var Tommy, tommy, console;
    
    beforeEach(function() {
        Tommy = require('../tommy.js');
        console = jasmine.createSpyObj('console', ['log']);
        tommy = Tommy(console); 
    });
    
    describe('is a class that', function() {
        it('can be instantiated with a console', function() {
             expect(tommy).not.toBeNull();
        }); 
    });
    
    describe('which has a sayHello method', function() {
        it('that writes a message containing the text hello to the console log with which it was instantiated', function() {
            tommy.sayHello();
            expect(console.log).toHaveBeenCalledWith('hello');
        }); 
    });
    
    describe('and which also has a sayGoodbye method', function() {
        it('that writes a message containing the text goodbye, and the passed name, to the console log with which it was instantiated', function() {
            var nameOfPersonToSayGoodbyeTo = 'sweetie';
            tommy.sayGoodbye(nameOfPersonToSayGoodbyeTo);
            expect(console.log.mostRecentCall.args[0]).toContain('goodbye');
            expect(console.log.mostRecentCall.args[0]).toContain(nameOfPersonToSayGoodbyeTo);
        }); 
    });
    
    describe('and which finally has a addArrayOfNumbers method', function() {
        it('that returns the sum of all the numbers passed to it in an array', function() {
            expect(tommy.addArrayOfNumbers([1,2,3,4])).toBe(10); 
        }); 
        
        it('and if you pass empty array, it returns 0', function() {
            expect(tommy.addArrayOfNumbers([])).toBe(0); 
        })
    });
});