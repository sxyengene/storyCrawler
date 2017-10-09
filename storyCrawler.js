const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');
const buffer = require('buffer');
const iconv = require('iconv-lite');

var host = 'http://www.biquger.com';
var path = '/biquge/20520/10423009';
// var crid = '3644001';

// var url = host+path+crid;
var url = host+path;
catchPage(url);

// var index = 1;


function catchPage(url){
    http.get(url, function(res) {
		var html;        
        res.on('data', function(data) {
        	var str = iconv.decode(data, 'GBK');
        	html+=str;
        });
        res.on('end', function() {
            var  $ = cheerio.load(html,{
                decodeEntities: false
            })
            handleHtml($);
        });
    });
}



function handleHtml($){
    var title = $('.bookname h1').text();
    var text = $('.content').text();
    console.log(title);

    var content = '';

    text = text.replace(/&nbsp;/g,'');
    text = text.replace(/<br>/g,'\n');

    
    content = title + '\n' + text + '\n';

    var ofs = {flag:'a'};
    fs.writeFile('风水大相师.txt',content,ofs,function(){});

    // if(crid == 3966326){
        // return;
    // }
    
    var html = $.html();
    path = $('.bottem a').eq(3).attr('href');
    if(typeof path == 'undefined'){
        return;
    }
    // path = html.match(/\<a href=\"(.*)\"\>下一章\<\/a\>/)[1];
    console.log(path);
    // url = host+path+crid;
    url = host+path;
    // console.log(url);
    catchPage(url);
}

