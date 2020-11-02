const mysql = require('mysql');
var db;

// use this wrapper to create promise around mysql
class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args=[] ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

// checking if there is a .env setup already
if(process.env.JAWSDB_URL){
    db = new Database(process.env.JAWSDB_URL)
// if there isn't a .env file, use local database
} else {
    db = new Database({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '90939065Elwin',
        database: 'shoppingList_db'
    }); 
}

module.exports = db;