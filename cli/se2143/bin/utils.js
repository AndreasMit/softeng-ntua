module.exports = { parseSentence: parseSentence };

function parseSentence(words) {  
    var sentence = "";  
    for(var i = 0; i < words.length; i++) {  
        sentence = sentence + words[i] + " ";  
    }
    return sentence
}

module.exports = { showHelp: showHelp, parseSentence: parseSentence };
const usage = "\nUsage: tran <lang_name sentence to be translated";

function showHelp() {                                                            
    console.log(usage);  
    console.log('\nOptions:\r')  
    console.log('\t--version\t      ' + 'Show version number.' + '\t\t' + '[boolean]\r')  
    console.log('    -l, --longuages\t' + '      ' + 'List all languages.' + '\t\t' + '[boolean]\r')  
    console.log('\t--help\t\t      ' + 'Show help.' + '\t\t\t' + '[boolean]\n')  
}