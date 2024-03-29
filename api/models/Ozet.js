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
    },
    link: {
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
      who: inputs.who,
      link: inputs.link
    })
    .exec(cb);
  },

  edit: function(inputs, cb){
    Ozet.update({
      id: inputs.id
    },{
      title: inputs.title,
      news: inputs.news,
      imagePath: inputs.imagePath,
      date: inputs.date,
      state: inputs.state,
      who: inputs.who,
      link: inputs.link
    })
    .exec(cb);
  },

  getNews: function (inputs, cb) {
    Ozet.find().exec(cb);
  }

};
