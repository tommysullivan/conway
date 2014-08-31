module.exports = function(tommy,beach){
    return {
        getSumOfSquares:function(arrayOfNumbersToSquare) {
            function getSquare(i) { return i * i; }
            var squares = arrayOfNumbersToSquare.map(getSquare);
            return tommy.addArrayOfNumbers(squares);
            // var j = 0;
            // var square = [];
            // var sum = 0;
            //     for (; j < arrayOfNumbersToSquare.length; j++){
            //     square.push(arrayOfNumbersToSquare[j]*arrayOfNumbersToSquare[j]);
            //     }
            //     sum = tommy.addArrayOfNumbers(square);
            // return sum;
        },
        
        enjoySunset:function(reqTime){
            var sunsetTime = beach.viewSunset(reqTime+1);
            return sunsetTime;
        },
        viewSunset:function(sTime){
            var moreTimeWithSweetie = sTime;
            return moreTimeWithSweetie;
        }
    }
    
}