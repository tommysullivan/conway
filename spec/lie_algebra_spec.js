var LieAlgebra = require('../lie_algebra');
describe('LieAlgebra', function() {
    var lieAlgebra, vectorSpace, field, lieBracket; 
    
    beforeEach(function() {
        lieAlgebra = LieAlgebra(vectorSpace, field, lieBracket); 
    });

    it('is instantiable', function() {
        expect(lieAlgebra).not.toBeUndefined(); 
    });
    
    it('is always bilinear', function() {
        //expect(lieAlgebra.isBilinear()).toBeTruthy(); 
    });
});