module.exports = {
  /*autoCreatedAt: false,//kendi tarih formatımıza uygun yapmak için otomatik oluşturulan tarihler devre dışı bırakılıyor.
  autoUpdatedAt: false,
  createdAt: {
    type: 'datetime',
    required: true,
    defaultsTo: function() {return new Date();}
  },
  updatedAt: {
    type: 'datetime',
    required: true,
    defaultsTo: function() {return new Date();}
  }*/
  attributes:{
    title: {
      type: 'string',
      required: true
    },
    news: {
      type: 'string',
      required: true
    },
    imagePath: {
      type: 'string',
      required: true
    },
    date: {
      type: 'string',
      required: true
    },
    state: {
      type: 'string',
      required: true
    },
    who: {
      type: 'string',
      required: true
    },

  },

  new: function(inputs, cb){
    Ozet.create({
      title: inputs.title,
      news: inputs.news,
      imagePath: inputs.imagePath,
      date: inputs.date,
      state: inputs.state,
      who: inputs.who
    })
    .exec(cb);
  },

  edit: function(){

  },

  getNews: function (inputs, cb) {
    Ozet.find().exec(cb);
  }

};
