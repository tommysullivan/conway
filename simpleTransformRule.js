module.exports = function(suffix, newSuffix) {
    function suffixLocation(stem) {
        return stem.indexOf(suffix, stem.length - suffix.length) 
    }
    return {
        applies: function(stem) {
            return suffixLocation(stem) !== -1;
        },
        apply: function(stem) {
            return stem.substring(0, suffixLocation(stem))+newSuffix;
        },
        toString: function() {
            return "SimpleTransformRule "+suffix+" => "+newSuffix;
        },
        complexity: function() {
            return suffix.length + newSuffix.length;
        }
    }
}