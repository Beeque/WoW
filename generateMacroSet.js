// usage example:
// node .\generateMacroSet.js Demon Hunter > blablahh.txt

const version = '1.00';
const axios = require('axios');
var tasks = 0;
var arr = [];
var args = process.argv.slice( 2 );
var cls = args[0].toLowerCase();
if ( args[1] ) { cls += '-' + args[1].toLowerCase(); }

new Magic ( 'talents' );
new Magic ( 'pvp-talents' );
new Magic ( 'specialization-abilities' );

function Magic( type )
{
	++tasks;
	axios.get('https://www.wowhead.com/' + cls + '-' + type + '?filter=50;2;0#0+1+20' ).then( function ( response ) {

	let res = response.data;
	res = res.split('var listviewspells =')[1];
	res = res.split('new Listview')[0];
	res = res.trim().slice(0,-1);
	res = res.replace(/popularity/g,'"popularity"');
	res = res.replace(/frommerge/g,'"frommerge"');

	JSON.parse ( res ).forEach ( function ( r )
	{
		if ( ! arr.filter ( x => x === r.name ).length )
		{
			arr.push ( r.name );
		}
	});

	--tasks;
	if ( tasks == 0 )
	{
		const C = new Carousel();

		arr.sort();
		let output = '<?xml version="1.0" encoding="utf-8"?><Box xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><ObjectType>ISBoxer_Toolkit.Configs.WoWMacroSet</ObjectType><SerializedObject>&lt;?xml version="1.0" encoding="utf-8"?&gt;&lt;WoWMacroSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"&gt;&lt;Name&gt;' + cls + '&lt;/Name&gt;&lt;Description&gt;generated with Beeq\'s Ultimate Macro Set Generator v' + version + '&lt;/Description&gt;&lt;WoWMacros&gt;';
		arr.forEach ( function ( ability )
		{
			output += '&lt;WoWMacro&gt;&lt;MacroCommands&gt;/cast [nochanneling] ' + ability + '&lt;/MacroCommands&gt;&lt;ColloquialName&gt;' + ability + '&lt;/ColloquialName&gt;&lt;Combo&gt;&lt;Combo&gt;BLABLABLA&lt;/Combo&gt;';
			output += '&lt;Modifiers&gt;' + C.modifiers() + '&lt;/Modifiers&gt;';
			output += '&lt;Key&gt;&lt;Key&gt;BLABLABLA&lt;/Key&gt;&lt;Code&gt;' + C.keyCode() + '&lt;/Code&gt;&lt;/Key&gt;&lt;/Combo&gt;&lt;AllowCustomModifiers /&gt;&lt;/WoWMacro&gt;';
			C.nextKey();
		});
		output += '&lt;/WoWMacros&gt;&lt;/WoWMacroSet&gt;</SerializedObject></Box>';
		console.log ( output );
	}

	}).catch(function (error) {
	    console.log( "Well, something's broken" );
	});
}

function Carousel()
{
	var self = this;

	this.keys = [];
	this.keyIndex = 0;
	this.modIndex = 0;

	new Key ( 82 );  // num pad 0
	new Key ( 79 );  // num pad 1
	new Key ( 80 );  // num pad 2
	new Key ( 81 );  // num pad 3
	new Key ( 75 );  // num pad 4
	new Key ( 76 );  // num pad 5
	new Key ( 77 );  // num pad 6
	new Key ( 71 );  // num pad 7
	new Key ( 72 );  // num pad 8
	new Key ( 73 );  // num pad 9
	new Key ( 55 );  // num pad *
	new Key ( 74 );  // num pad -
	new Key ( 78 );  // num pad +
	new Key ( 83 );  // num pad ,
	new Key ( 309 ); // num pad /


	function Key( code )
	{
		this.code = code;

		self.keys.push ( this );
	}

	this.nextKey = function()
	{
		++self.keyIndex;
		self.keyIndex = self.keyIndex % self.keys.length;
		if ( self.keyIndex == 0 ) { self.nextMod(); }
	}

	this.nextMod = function()
	{
		++self.modIndex;
	}

	this.keyCode = function()
	{
		return self.keys[ self.keyIndex ].code;
	}

	this.modifiers = function()
	{
		switch ( self.modIndex )
		{
			case 0: return 'Ctrl';
			case 1: return 'Ctrl Shift';
			case 2: return 'Ctrl Alt';
			case 3: return 'Shift Alt';
			case 4: return 'Alt';
			case 5: return 'Shift';
		}
	}
}
