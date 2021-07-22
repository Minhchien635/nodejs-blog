const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Post = new Schema({
    name: { type: String, require: true, },
    description: { type: String},
    image: { type: String},
    videoId: { type: String, require: true, },
    level: { type: String},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
    slug: { type: String, slug: 'name', unique: true},
},{
    timestamps: true
});

//Add plugins
mongoose.plugin(slug);
Post.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Post', Post);