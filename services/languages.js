const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page,config.listPerPage);
    const rows = await db.query(
        `SELECT id, name, description, year
        FROM languages LIMIT ${offset},${config.listPerPage}
        `
    );
    const data = helper.emptyOrRows(rows)
    const meta = {page};
    
    return {
        data,
        meta
    }
}
async function update(id,language){
    const result = await db.query(
    `UPDATE languages
    SET 
    name = '${language.name}',
    description = '${language.description}',
    year = ${language.year}
    WHERE id = ${id}
    `
);
    let message = "Erro in updating language";
    if (result.affectedRows){
        message = "A language has been updated!";
    }

    return { message }
};

async function create(language){
    console.log(`INSERT INTO languages
    (name,description,year)
    VALUES
    ('${language.name}','${language.description}',${language.year})
    `);

    const result = await db.query(
        `INSERT INTO languages (name,description,year) VALUES
        ('${language.name}','${language.description}',${language.year})
        `
    );

    let message = "Erro in creating programming language";
    if (result.affectedRows){
        message = "A new language has been added!";

    }

    return { message }
}
async function remove(id){
    const result = await db.query(
        `DELETE FROM languages WHERE id = ${id}
        `
    );

    let message = "Erro in deleting programming language";
    if (result.affectedRows){
        message = "A new language has been deleted!";

    }

    return { message }
}


module.exports = {
    getMultiple,
    create,
    update,
    remove
};
