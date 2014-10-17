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
        ['tehdas', 'tehtaat'],
        ['kangas', 'kankaat'],
        ['täysi', 'täydet'],
        ['airut', 'airuet'],
        ['jälki', 'jäljet'],
        ['lataus', 'lataukset'],
        ['vene', 'veneet'],
        ['häntä', 'hännät'],
        ['melominen', 'melomiset'],
        ['kaarre', 'kaarteet'],
        ['pahoinvointi', 'pahoinvoinnit'],
        ['verstas', 'verstaat'],
        ['aie', 'aikeet'],
        ['vuode', 'vuoteet'],
        ['susi', 'sudet'],
        ['kulta', 'kullat'],
        ['Tommi', 'Tommit'],
        ['tietokone', 'tietokoneet'],
        ['auer', 'autereet'],
    ]
    var rulesCollection = Collection([
       SimpleTransformRule('kki', 'ki'),
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
       SimpleTransformRule('gas', 'kaa'),
       SimpleTransformRule('si', 'de'),
       SimpleTransformRule('t', 'e'),
       SimpleTransformRule('lki', 'lje'),
       SimpleTransformRule('us', 'ukse'),
       SimpleTransformRule('ne', 'nee'),
       SimpleTransformRule('ntä', 'nnä'),
       SimpleTransformRule('nen', 'se'),
       SimpleTransformRule('re', 'tee'),
       SimpleTransformRule('nti', 'nni'),
       SimpleTransformRule('tas', 'taa'),
       SimpleTransformRule('ie', 'ikee'),
       SimpleTransformRule('de', 'tee'),
       SimpleTransformRule('si', 'de'),
       SimpleTransformRule('ta', 'la'),
       SimpleTransformRule('er', 'teree'),
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
    describe('number of rules', function() {
        it('should be less than 10', function() {
            expect(rulesCollection.length()).toBeLessThan(10);
        }) 
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
