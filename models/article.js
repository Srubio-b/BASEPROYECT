const mongoose = require("mongoose");
const{ marked } = require("marked");
const slugify = require("slugify");
const { JSDOM } = require("jsdom");
const createDOMPurify = require("dompurify");
const dompurify = createDOMPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    markdown:{ 
    type: String,
    require: true,
    },
    image: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    slug: {
        type: String,
        require: true,
        unique: true,
    },
    sanitizedHtml: {
        type: String,
        require: true,
    },
});

articleSchema.pre("validate", function (next) {
    if(this.name){
        this.slug = slugify(this.name, { lower: true, strict: true });
    }

    if(this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }

    next();
});


module.exports = mongoose.model("Article", articleSchema);


