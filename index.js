'use strict';
var md5pf = require('md5-part-file');
//var request = require('request');
var http = require('http');
var fs = require('fs');

var language = 'PL';
var np = function(file, cb) {
  md5pf(file, 0, 10485760, function(err, hash){
    var file = fs.createWriteStream('_TEMP');
    var url = 'http://napiprojekt.pl/unit_napisy/dl.php?l=' +
              language.toUpperCase() +
              '&f='+hash +
              '&t='+magic(hash)+
              '&v=other&kolejka=false&nick=&pass=&napios=Linux';
    http.get(url, function(resp){
      resp.pipe(file);
      file.on('finish', function(){
        file.close(function(){
          cb(null, 'file saved');
        });
      });
    });
  });
};

// This is magic
//     \.
//      \'.      ;.
//       \ '. ,--''-.~-~-'-,
//        \,-' ,-.   '.~-~-~~,
//      ,-'   (###)    \-~'~=-.
//  _,-'       '-'      \=~-'~~',
// /o                    \~-''~=-,
// \__                    \=-,~'-~,
//    '''===-----.         \~=-'~-.
//                \         \*=~-'
//                 \         '=====----
//                  \
// Thanks to Wojciech Ziniewicz (https://github.com/wzin) for helping me in
// understanding original python code in this part
var magic = function(hash){
  var idx = [ 0xe, 0x3, 0x6, 0x8, 0x2 ];
  var mul = [ 2, 2, 5, 4, 3 ];
  var add = [ 0, 0xd, 0x10, 0xb, 0x5 ];

  var b = [];

  for (var ind = 0; ind < 5; ind++) {
    var a = add[ind];
    var m = mul[ind];
    var i = idx[ind];

    var t = a + parseInt(hash[i], 16);
    var v = parseInt(hash.slice(t, t+2), 16);
    b.push((v*m).toString(16).slice(-1));
  }
  return b.join('');
};

//somethingStrange('2c3f4866a6ff8a45c8e0a53f2cd12d28');
np(
  'bardzo-legalny-film-za-ktory-nie-mozna-isc-siedziec.mkv',
  function(err, hash){
    if (err){
      console.log(err);
      return;
    }
    console.log(hash);
  }
);
