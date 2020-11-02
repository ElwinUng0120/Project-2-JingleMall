const db = require( './connection.js' )

function getList( id){
    return db.query( 'SELECT * FROM shoppingList '+( id ? 'WHERE ? ' : '' ), id )
}

function addItem( name, link){
    return db.query('INSERT into shoppingList (`name`,link) values (?,?)', [name, link])
}
  
function updateItem( id, stage ){
    return db.query( 'UPDATE shoppingList SET stage=? WHERE id=?', [stage,id] )
}

function deleteItem( id ){
    return db.query( 'DELETE FROM shoppingList WHERE id=?', [ id ] )
}

function getAPIKEY(){
    return process.env.APIKEY;
}

module.exports = {
    getList, addItem, updateItem, deleteItem, getAPIKEY
}

