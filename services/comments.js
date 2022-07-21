const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getComments(id){
    const rows = await db.query(
        `SELECT id_comment,id_post,name_comment,comment_comment,day_comment,month_comment        
        FROM comment WHERE id_post = ${id}
        `
    );
    const data = helper.emptyOrRows(rows);


    return {
        data
    }

}

module.exports = {
    getComments
}
