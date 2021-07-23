const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Post = new Schema({
    title: { type: String, require: true, },
    content: { type: String},
    user_id: { type: String, require: true,},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
    slug: { type: String, slug: 'title', unique: true},
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