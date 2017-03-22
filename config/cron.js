
var moment = require('moment');
module.exports.cron = {


  ozetKontrolEt: {
    schedule: '*/5 * * * * *',
    onTick: function () {
      console.log('Özetler kontrol edildi.');
      var currentdate = new moment().format('DD/MM/YYYY HH:mm');

      Ozet.find({date:   { '<=': currentdate}}).exec(function(err, News){ //yayın tarihi gelmiş olanlar gösteriliyor
         console.log(News);
      });

    }
  }



};
