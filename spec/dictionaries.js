/// <reference path="../typings/tsd.d.ts" />
// Disabled multiline warning, we're fine with ES5
// jshint -W043

var sampleFile = "\
using System;\n\
\n\
namespace MyNamespace.Domain\n\
{\n\
    public class MyPoco\n\
    {\n\
        public IDictionary<int, double> Stuff {get;set;}\n\
        public IDictionary<int, Set<int>> Stuff2 {get;set;}\n\
        public IDictionary<int, IDictionary<int, double>> Stuff3 {get;set;}\n\
        public IDictionary<int, Someother.Type> Stuff4 {get;set;}\n\
    }\n\
}\n";

var expectedOutput = "interface MyPoco {\n\
    Stuff: { [index: number]: number };\n\
    Stuff2: { [index: number]: Set<number> };\n\
    Stuff3: { [index: number]: { [index: number]: number } };\n\
    Stuff4: { [index: number]: Someother.Type };\n\
}\n";

var pocoGen = require('../src/index.js');

describe('typescript-cs-poco', function() {
	it('should transform a POCO with a dictionary property correctly', function() {

		var result = pocoGen(sampleFile);
        
        expect(result).toEqual(expectedOutput);
	});
});
