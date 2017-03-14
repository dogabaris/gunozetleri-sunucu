module.exports = {

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
    }
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
    Ozet.find({
      title: inputs.title,
      news: inputs.news,
      imagePath: inputs.imagePath,
      date: inputs.date,
      state: inputs.state,
      who: inputs.who
    })
    .exec(cb);
  }

};
