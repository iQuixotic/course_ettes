class QueryMaker {

    /* - - - - - - - - Internal Query Helpers - - - - - - - - -*/

    // use num+1 to account for $1 at the id value
    private static printSets(num, keys) {
      let i = num+1, arr = [];
      while(i > 1) {
        arr.push(` ${keys[i-2]} = $${i}`)
        i--;
      }
      return arr;
    }

    // returns an array like: [ $3, $2, $1 ] 
    private static printDollars(num) {
      let i = num+1, arr = [];
      while (i>0) {
        arr.push(`$${i}`)
        i--;
      }
      return arr;
    }

    /*- - - - - - - - - Query String Methods - - - - - - - - -*/

     // - - - - - CREATE - - - - - - 

    // insert a single db object
    static insertOne(tableName, colNames) {
      const queryString = (
        `INSERT INTO ${tableName} (${colNames.join(', ')}) 
         VALUES (${this.printDollars(colNames.length-1).reverse().join(', ')});`
      );
      return queryString;
    }
    
    // - - - - - READ - - - - - - 
    
    // for login
    static login(cols) {
      return `select ${cols} from users where (email, password) = ($1, $2);`;
    }

    // get all 
    static getAll(tableName) {
      return `SELECT * FROM ${tableName}`;
    }

    static getHashedPass() {
      return `select password from users where email = $1;`;
    }

    // get by some queryKey
    static getOne(tableName, queryKey) {
      return `SELECT * FROM ${tableName} WHERE ${queryKey} = $1;`;
    }

    // join 2 tables on a certain result set
    static getJoinedTbl(tableName, fields, secondTable, tblKey1, tblKey2) {
      return (
        `SELECT ${fields.join(', ')} 
          FROM ${tableName} 
          LEFT JOIN ${secondTable}
          ON ${tblKey1} = ${tblKey2} 
          WHERE ${tblKey2} = $1;`
        );
    }
    
    // - - - - - UPDATE - - - - - - 
   
    /* - - - - - - - - - - - - - ABOUT SET ONE  - - - - - - - - - - - - - 
    - takes in 4 fields 
    - sets tableName and where field from within
    - calls printSets and passes the number of Fields and KeyNames
    - printSets returns an array like so: ['SomeKeyName = $2', 'SomeKeyName = $3]
    - setOne will then return entire string to caller
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    // edit a single row
    static setOne(tableName, whereField, numOfFields, keys) {
      const queryString = (
        `UPDATE ${tableName} 
         SET ${this.printSets(numOfFields, keys).join(', ')} 
         WHERE ${whereField} = $1`
      );
      console.log('this si the sfjkda;l', queryString)
          return queryString;
    }    

    // delete by some queryKey
    static deleteOne(tableName, queryKey) {
      return `DELETE FROM ${tableName} WHERE ${queryKey} = $1;`;
    }

}

export default QueryMaker;