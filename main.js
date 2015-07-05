/**
 * Created by vdeturckheim on 5/07/15.
 */

/**
 * Proper (according to me) "contains" method for arrays in javascript. This allows the use of callback on testing.
 * An empty callback is like using '==' as test.
 * @param item item to find
 * @param cpf -optional- test callback function: function(a,b) where a is the element to find and b the element tested
 * from the array.
 * @returns {boolean} true if at least one element is present in the array equals to the one to find according to the
 * compare function.
 * @author vdeturckheim
 */
Array.prototype.contains = function ( item , cpf ) {
  if ( ! cpf ) {
    cpf = function ( a , b ) {
      return a == b;
    }
  }
  return ! this.every ( function ( elt ) {
    return ! cpf ( item , elt );
  } );
};

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');

var outputFile = 'dirStruct.md';


function printHelp(){
  console.log('Usage:\tdirStructToMd [options] <root>');
  console.log('Options:');
  console.log('  -c,\t--config \t<file>\t Configuration JSON file.');
  console.log('  -o,\t--output \t<file>\t Output file, default value is \'dirStruct.md\'.');

  process.exit();
}

var root0;

if (!argv._[0]) { //todo use optimist to properly parse input arguments
  printHelp();
  process.exit();
}else if(argv._[0].slice(-1)=='/'){
  root0 = argv._[0].slice(0,-1);
}else{
  root0 = argv._[0];
}

if(argv.c || argv.config){
  var confFile = argv.c || argv.config;
  //TODO
}

if(argv.o || argv.output){
  var outputFile = argv.o || argv.output;
}




var excludeList = ['.git', 'node_modules', '.idea'];

var parse = function(root, prefix){
  var md;
  if(!prefix){
    md =".\n";
    prefix = "";
  }else{
    md = "";
  }

  var rootContent = fs.readdirSync(root);
  rootContent.forEach(function(file){
    var path = root+'/'+file;
    if(!excludeList.contains(file)) {
      md += prefix + "+-- _" + file + "\n";

      if ( fs.lstatSync ( path ).isDirectory ()) {

        md += parse ( path , prefix + "|\t" );
      }
    }
  });

  return md;
};

var mdIze = function(str){
  var splitted = str.split('\n');
  var result = "";
  splitted.forEach(function(line){
    result+= "    "+line+'\n';
  });
  return result;
};

fs.writeFileSync(outputFile, mdIze(parse(root0)));


