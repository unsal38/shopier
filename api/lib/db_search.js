const mongoose = require("mongoose");

let userSchema = require("../db/models/Users");
let blogSchema = require("../db/models/Blog");
let kategoriSchema = require("../db/models/Categories");

async function find_by_id(id, schema) {
    try {
        if (schema === "Users") { var db_data = await userSchema.findById(id) }
        if (schema === "Categories") { var db_data = await kategoriSchema.findById(id) }
        if (schema === "Blog") { var db_data = await blogSchema.findById(id) }
        return db_data
    } catch (error) {
        if (error) { return error }
    }
}
async function findByIdAndUpdate(id, update_data, schema) {
    try {
        if (schema === "Blog") { var db_data = await blogSchema.findById(id) }
        if (schema === "Users") { var db_data = await userSchema.findById(id) }
        if (db_data) {
            if (schema === "Blog") await blogSchema.findByIdAndUpdate(id, update_data)
            if (schema === "Users") await userSchema.findByIdAndUpdate(id, update_data)
            return true
        }
        if (!blog_data) return false
    } catch (error) {
        if (error) { return error }
    }
}
async function create(data, schema) {
    try {
        if (schema === "Blog") { await blogSchema.create(data) }
        if (schema === "Users") {await userSchema.create(data) }
        if (schema === "Categories") {await kategoriSchema.create(data) }
        return true
    } catch (error) {
        if (error) { return error }
    }
}
async function find(schema) {
    try {
        if (schema === "Blog") {var db_data =  await blogSchema.find() }
        if (schema === "Users") {var db_data = await userSchema.find() }
        if (schema === "Categories") { var db_data = await kategoriSchema.find() }
        return db_data
    } catch (error) {
        if (error) { return error }
    }
}
async function find_one(find,schema) {
    try {
        if (schema === "Blog") {var db_data =  await blogSchema.findOne(find) }
        if (schema === "Users") {var db_data = await userSchema.findOne(find) }
        if (schema === "Categories") { var db_data = await kategoriSchema.findOne(find) }
        return db_data
    } catch (error) {
        if (error) { return error }
    }
}

module.exports = {
    find_by_id,
    findByIdAndUpdate,
    create,
    find,
    find_one
}