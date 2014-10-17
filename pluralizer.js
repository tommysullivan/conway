module.exports = function(pluralRules) {
    return {
        pluralize: function(stem) {
            var applicableRules = pluralRules.filter(function(rule) {
                return rule.applies(stem);
            });
            if(applicableRules.isEmpty()) throw new Error("Could not find rule for pluralizing stem "+stem);
            var plurals = applicableRules.map(function(rule) {
                return rule.apply(stem)+'t';
            });
            if(plurals.unique().length() != 1) {
                throw new Error(
                    "Multiple rules applied and gave different results for stem "+stem+"\n"+
                    applicableRules.map(function(rule, i) { return rule.toString() + " gave result: "+plurals.get(i) }).join("\n")
                );
            }
            return plurals.first();
        }
    }
}