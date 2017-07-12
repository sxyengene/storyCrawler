const fs = require('fs');


fs.readFile('九鼎记.txt',(err,data)=>{
	if(err){
		console.log(err);
		return;
	}

	var text = data;
	console.log(data);
	// console.log(typeof text);
	// var content = text.replace(/第.{1,3}章/g,'\n$&')
	// fs.writeFile('九鼎记1.txt',content,(err)=>{

	// })
});