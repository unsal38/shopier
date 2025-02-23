const mongoose = require("mongoose");

let userSchema = require("../db/models/Users");
let blogSchema = require("../db/models/Blog");
let kategoriSchema = require("../db/models/Categories");
let productSchema = require("../db/models/Product");
let odemeSchema = require("../db/models/Odeme")
async function product_click_upp(db_data) {
    const db_data_on_click = db_data.on_click;
    const new_db_data_on_click = Number(db_data_on_click) + 1;
    const id = db_data.id;
    const update_data = { on_click: new_db_data_on_click };
    return await productSchema.findByIdAndUpdate(id, update_data);
} // KAÇ KERE TIKLANDIĞI
function find_by_id(id, schema) {
    try {
        if (schema === "Users") {
            let db_data = userSchema.findById(id);
            return db_data;
        }
        if (schema === "Categories") {
            let db_data = kategoriSchema.findById(id);
            return db_data;
        }
        if (schema === "Blog") {
            let db_data = blogSchema.findById(id);
            return db_data;
        }
        if (schema === "Product") {
            let db_data = productSchema.findById(id);
            return product_click_upp(db_data);
        }
        if (schema === "ProductSepet") {
            let db_data = productSchema.findById(id);
            return db_data;
        }
    } catch (error) {
        if (error) { return error }
    }
}
function findByIdAndUpdate(id, update_data, schema) {
    try {
        if (schema === "Blog") {
            let db_data = blogSchema.findById(id);
            if (db_data) {
                if (schema === "Blog") blogSchema.findByIdAndUpdate(id, update_data);
                return true;
            }
            if (!db_data) return false;
        }
        if (schema === "Users") {
            let db_data = userSchema.findById(id);
            if (db_data) {
                if (schema === "Users") userSchema.findByIdAndUpdate(id, update_data);
                return true;
            }
            if (!db_data) return false;
        }
        if (schema === "Product") {
            let db_data = productSchema.findById(id);
            if (db_data) {
                if (schema === "Product") productSchema.findByIdAndUpdate(id, update_data);
                return true;
            }
            if (!db_data) return false;
        }

    } catch (error) {
        if (error) { return error }
    }
}
function create_db(data, schema) {
    try {
        if (schema === "Blog") {
            blogSchema.create(data);
            return true;
        }
        if (schema === "Users") {
            userSchema.create(data);
            return true;
        }
        if (schema === "Categories") {
            kategoriSchema.create(data);
            return true;
        }
        if (schema === "Product") {
            productSchema.create(data);
            return true;
        }
        if (schema === "Odeme") {
            odemeSchema.create(data);
            return true;
        }

    } catch (err) {
        if (err) { return err }
    }
}
async function find_db(schema) {
    try {
        if (schema === "Blog") {
            let db_data = await blogSchema.find();
            return db_data;
        }
        if (schema === "Users") {
            let db_data = await userSchema.find();
            return db_data;
        }
        if (schema === "Categories") {
            let db_data = await kategoriSchema.find();
            return db_data;
        }
        if (schema === "Product") {
            let db_data = await productSchema.find();
            return db_data;
        }
    } catch (error) {
        if (error) { return error }
    }
}
function find_one(find, schema) {
    try {
        if (schema === "Blog") {
            const db_data = blogSchema.findOne(find);
            return db_data;
        }
        if (schema === "Users") {
            const db_data = userSchema.findOne(find);
            return db_data;
        }
        if (schema === "Categories") {
            const db_data = kategoriSchema.findOne(find);
            return db_data;
        }
        if (schema === "Product") {
            const db_data = productSchema.findOne(find);
            return db_data;
        }

    } catch (error) {
        if (error) { return error }
    }
}
function find_by_id_end_delete(id, schema) {
    try {
        if (schema === "Users") {
            userSchema.findByIdAndDelete(id);
            return true;
        }
        if (schema === "Categories") {
            kategoriSchema.findByIdAndDelete(id);
            return true;
        }
        if (schema === "Blog") {
            blogSchema.findByIdAndDelete(id);
            return true;
        }

    } catch (error) {
        console.log(error)
        return error
    }
}
async function find_filter(schema, sort, lt, skip, limit, categori_id) {
    try {
        // if (schema === "Blog") {  blogSchema.find(); }
        // if (schema === "Users") {  userSchema.find(); }
        // if (schema === "Categories") { kategoriSchema.find(); }

        const new_product_data_array = new Array();
        if (schema === "Product") {
            let db_data = await productSchema
                .find({ "price_data.price": { $lt: lt } })
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .gt("categories.id", categori_id)
            new_product_data_array.push([db_data])
            let db_data_count = await productSchema
                .find({ "price_data.price": { $lt: lt } })
                .sort(sort)
                //.skip(skip)
                //.limit(limit)
                .gt("categories.id", categori_id)
                .countDocuments()
            new_product_data_array.push([db_data_count])
        }

        return new_product_data_array;
    } catch (error) {
        if (error) { return error }
    }
}
module.exports = {
    find_filter,
    find_by_id,
    findByIdAndUpdate,
    create_db,
    find_db,
    find_one,
    find_by_id_end_delete
}