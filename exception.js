module.exports = function(index){
    return {
    sweetieException:function(index) {
            this.index = index;
            this.message1 = "This subscript";
            this.message2 = "is out of range, sweetie!!";
            this.toString = function() {
            return this.message1 + this.index + this.message2;
            }
        },
    }
}