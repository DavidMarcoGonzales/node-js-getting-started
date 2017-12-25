var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardModel = new Schema({
    currentURN: { type: String },
    title: { type: String },
    vid: {
        type: { type: String },
        src: { type: String },
        border: { type: String },
        width: { type: String },
        height: { type: String },
        frameborder: { type: String },
        allowfullscreen: { type: String }
    },
    topic1: { type: String },
    rdfts1: [ String  ],
    topic2: { type: String },
    rdfts2: [ String  ],
    topic3: { type: String },
    rdfts3: [ String  ],
    topic4: { type: String },
    rdfts4: [ String  ],
    topic5: { type: String },
    rdfts5: [ String  ],
    body: { type: String },
    conclusion: { type: String },
    prevURN: {type: String},
    nextURN: { type: String}
});

module.exports = mongoose.model('Card', cardModel);
