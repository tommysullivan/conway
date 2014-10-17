var Collection = require('../collection');
var SimpleTransformRule = require('../simpleTransformRule');
var Pluralizer = require('../pluralizer');

describe('Pluralizer', function() {
    var stemPluralPairs = [
        ['pyykki', 'pyykit'],
        ['tuttu', 'tutut'],
        ['kuivausrumpu', 'kuivausrummut'],
        ['vaate', 'vaatteet'],
        ['koti', 'kodit'],
        ['kahvinkeitin', 'kahvinkeittimet'],
        ['pyykkitupa', 'pyykkituvat'],
        ['asiakas', 'asiakkaat'],
        ['kodinkoneliike', 'kodinkoneliikkeet'],
        ['konepelti', 'konepellit'],
        ['koko', 'koot'],
        ['hintalappu', 'hintalaput'],
        ['kenkä', 'kengät'],
        ['saapas', 'saappaat'],
        ['tehdas', 'tehtaat']
    ]
    var rulesCollection = Collection([
       SimpleTransformRule('ki', 'i'),
       SimpleTransformRule('ttu', 'tu'),
       SimpleTransformRule('mpu', 'mmu'),
       SimpleTransformRule('te', 'ttee'),
       SimpleTransformRule('oti', 'odi'),
       SimpleTransformRule('tin', 'ttime'),
       SimpleTransformRule('pa', 'va'),
       SimpleTransformRule('kas', 'kkaa'),
       SimpleTransformRule('ke', 'kkee'),
       SimpleTransformRule('lti', 'lli'),
       SimpleTransformRule('ko', 'o'),
       SimpleTransformRule('ppu', 'pu'),
       SimpleTransformRule('kä', 'gä'),
       SimpleTransformRule('pas', 'ppaa'),
       SimpleTransformRule('das', 'taa'),
    ]);
    var pluralizer;
    beforeEach(function() {
        pluralizer = Pluralizer(rulesCollection);
    });
    describe('pluralize', function() {
        describe('for stem', function() {
            stemPluralPairs.forEach(function(stemPluralPair) {
                var stem = stemPluralPair[0];
                var expectedPlural = stemPluralPair[1];
                describe(stem, function() {
                    it('gives '+expectedPlural, function() {
                        expect(pluralizer.pluralize(stem)).toEqual(expectedPlural);
                    }); 
                });   
            });
        }); 
    });
    describe('complexity', function() {
        it('should be less than 25', function() {
            expect(pluralizer.complexity()).toBeLessThan(25); 
        }); 
    });
});

// Double consonant + vowel => drop consonant + vowel
// mp + vowel => mm + vowel
// [vowel(s)] + [p|t|k]+ vowel [optional s]=> [vowel(s)] + double consonant + double vowel [no s]
// vowel + t + vowel => vowel + d + vowel
// t + vowel + n => tt + vowel + me
// d + vowel + n => t + vowel + me
// vowel + p + vowel => vowel + v + vowel
// kas => kkaa
// lt+vowel => ll + vowel
// vowel + k + vowel => vowel + vowel
// nk + vowel => ng + vowel
// [d|g|m|k] + vowel + s => [t|k|p|kk] + double vowel
