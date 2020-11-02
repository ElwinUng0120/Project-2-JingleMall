const db = require( './connection.js' )

function getList( id){
    return db.query( 'SELECT * FROM tasks '+( id ? 'WHERE ? ' : '' ), id )
}

function addItem( name, link){
    return db.query('INSERT into table (`name`,link) values (?,?)', [name, link])
}
  
function updateItem( id, stage ){
    return db.query( 'UPDATE tabelName SET stage=? WHERE id=?', [stage,id] )
}

function deleteItem( id ){
    return db.query( 'DELETE FROM tasks WHERE id=?', [ id ] )
}

module.exports = {
    getList, addItem, updateItem, deleteItem
}

