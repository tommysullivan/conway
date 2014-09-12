module.exports = function LieAlgebra(vector3dSpace, scalarField, lieBracket, times, plus) {
    return {
        isBilinear: function() { 
            // [a x + b y, z] = a [x, z] + b [y, z]
            var equation1 = function(a, b, x, y, z, lieBracket) {
                return equals(
                    lieBracket(
                        plus(
                            times(a, x),
                            times(b, y)
                        ),
                        z
                    ),
                    plus(
                        times(
                            a, 
                            lieBracket(x, z)
                        ),
                        times(
                            b,
                            lieBracket(y, z)
                        )
                    )
                ); 
            }
            
            //[z, a x + b y] = a[z, x] + b [z, y]
            var equation2 = function(a, b, x, y, z, lieBracket) {
                return equals(
                    lieBracket(
                        z,
                        plus(
                            times(a, x),
                            times(b, y)
                        )
                    ),
                    plus(
                        times(
                            a,
                            lieBracket(z, x)
                        ),
                        times(
                            b,
                            lieBracket(z, y)
                        )
                    )
                );
            }
            
            return scalarField.forEach(function(a) {
                return scalarField.forEach(function(b) {
                    return vector3dSpace.allVectors().forEach(function(v) {
                        var args = [a,b,v.x(),v.y(),v.z()]
                        return equation1.apply(null, args) && equation2.apply(null, args);
                    });
                });
            });
        },
        isAlternating: function() {
            return vector3dSpace.allVectors().forEach(function(v) {
                // return 
                //OMG sweetie just try to construct this stuff from wikipedia and you will see what i am talking
                //about when it comes to the imprecision of mathematicians!
            });
        }
    }
}