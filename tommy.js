module.exports = function(console) {
    return {
        sayHello: function() {
            console.log('hello');   
        },
        sayGoodbye: function(nameOfPersonToSayGoodbyeTo) {
            console.log('goodbye, '+nameOfPersonToSayGoodbyeTo);
        },
        addArrayOfNumbers: function(arrayOfNumbersToAdd) {
            var sum = 0;
            arrayOfNumbersToAdd.forEach(function(currentNumber) {
                sum += currentNumber;
            });
            return sum;
        }
    }
}