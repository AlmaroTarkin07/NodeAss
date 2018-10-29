var extentnion = process.argv[2];
var str = process.argv[3];

var path = require('path'), fs = require('fs');

function FindWord(startPath,filter,result)
{
    result = result || []
    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){    
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory())
        {
            FindWord(filename,filter,result); 
        }
        else if (filename.indexOf(filter)>=0) 
        {
            var data = fs.readFileSync(filename,'utf8'); 
            if (data.search(str) >= 0) 
            {
                console.log(filename);
                result.push(filename);
            } 
        }
    }
    return result;
}

if (extentnion == null || str == null)
{     
    console.log('USAGE: node search [EXT] [TEXT]');
}
else
{
    var result = FindWord(__dirname,'.'+extentnion);
    if (result.length==0)
    {
        console.log("no file was found");
    }
}