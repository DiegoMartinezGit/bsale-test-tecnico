const mariadb = require('mariadb');
//db connection
const dbConfig=mariadb.createPool({
    host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com", 
    user:'bsale_test', 
    password: 'bsale_test',
    database:"bsale_test"
  });



module.exports = dbConfig;