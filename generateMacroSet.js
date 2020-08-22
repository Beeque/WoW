// usage:
// node .\generateMacroSet.js className

const axios = require('axios')
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
		arr.sort();
		console.log ( arr );
	}

	}).catch(function (error) {
	    console.log( "Well, something's broken" );
	});
}
