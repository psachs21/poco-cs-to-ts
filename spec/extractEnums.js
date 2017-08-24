/// <reference path="../typings/tsd.d.ts" />
// Disabled multiline warning, we're fine with ES5
// jshint -W043

var sampleFile = "\
using System;\n\
\n\
namespace Varicent.Domain.Customize\n\
{\n\
	[Serializable]\n\
	public class ColumnAction\n\
	{\n\
		public enum Operation : int\n\
		{\n\
			Add = 0,\n\
			Remove,\n\
			Edit\n\
        }\n\
        public enum Operation2\n\
        {\n\
			Add = 0,\n\
			Remove,\n\
			Edit\n\
        }\n\
		\n\
		public Operation Action;\n\
		\n\
		public CustomColumn Column;\n\
		\n\
		public ColumnAction()\n\
		{\n\
		}\n\
		\n\
		public ColumnAction(Operation action, CustomColumn column)\n\
		{\n\
			Action = action;\n\
			Column = column;\n\
		}\n\
	}\n\
}\n\
\n\
}\n";

var expectedOutput = "declare module module {\n\
    export namespace ColumnAction {\n\
    export type Operation =\n\
        'Add' |\n\
        'Remove' |\n\
        'Edit'\n\
    \n\
    export type Operation2 =\n\
        'Add' |\n\
        'Remove' |\n\
        'Edit'\n\
    \n\
    }\n\
}";

var pocoGen = require('../src/index.js');

describe('typescript-cs-poco', function() {
	it('should transform a POCO correctly', function() {
		var result = pocoGen(sampleFile, { extractEnums: true, baseNamespace: 'module', useStringUnionTypes: true });
        
        expect(result.replace(/\s+/gm, ' ')).toEqual(expectedOutput.replace(/\s+/gm, ' '));
	});
});
