const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getPosts(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id_post,title_post,text_post,tag_post,owner_post
        FROM posts LIMIT ${offset}, ${config.listPerPage}
        `
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data, 
        meta
    }

}

module.exports = {
    getPosts
}
