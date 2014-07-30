'use strict';
var md5pf = require('md5-part-file');
var request = require('request');

//var language = 'PL';
var np = function(file, cb) {
  md5pf(file, 0, 10485760, function(err, hash){
    var url = 'http://napiprojekt.pl/api/api-napiprojekt3.php';
            // 'mode=1&' +
            // 'client=NapiProjektPython&' +
            // 'client_ver=0.1&' +
            // 'downloaded_subtitles_id=' + hash + '&' +
            // 'downloaded_subtitles_txt=1&' +
            // 'downloaded_subtitles_lang=PL';

    request({
      url: url,
      method: 'POST',
      form: {
        'mode': '32770',
        'client':'pynapi',
        //'client':'NapiTux',
        //'client': 'NapiProjektPython',
        'client_ver':'0.1',
        'downloaded_subtitles_id': hash,
        'downloaded_subtitles_txt':'1',
        'downloaded_subtitles_lang':'PL'
      }
    }, function(err, resp, body){
      cb(body);
    });
  });
};

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
