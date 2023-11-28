import mongoose from "mongoose";
const { Schema, Types } = mongoose;
const subCategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32,
        unique: true
    },
    category: {
        type: Types.ObjectId,
        ref: "Category",
        required: true
    }
});
export default mongoose.model('Subcategory', subCategorySchema)