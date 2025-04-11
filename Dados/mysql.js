import mysql from "mysql2/promise"

async function bancoDados(){
    return await mysql.createConnection({
        "password":"",
        "host":"localhost",
        "user":"root",
        "port": 3306,
        "database":"banco_anime"
        })
}
export default {bancoDados}
