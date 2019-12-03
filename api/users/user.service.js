const pool = require("../../config/database");

module.exports = {
    createUser: (data, callBack)=>{
        pool.query(
            `INSERT INTO registration(firstName, lastName, gender, email, password,number)
            VALUES (?,?,?,?,?,?)`,
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number
        ],
        (error,results,fields)=>{
            if (error){
                return callBack(error);
            }
            return callBack(null, results);
        }
        );
    },
    getUsers: (callBack) =>{        
        pool.query(
             `select id,firstName,lastName,gender,number from registration`,
            [],
            (error,results,fields) =>{
                if (error){
                    callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getUserById: (id,callBack) =>{
        pool.query(`select id,firstName,lastName,gender,number from registration where id=?`,
        [id],
        (error,results,fields) =>{
            if (error){
                callBack(error);
            }
            return callBack(null,results[0]);
        });
    },
    updateUser: (data,callBack) =>{
        pool.query(`update registration set firstName=?,lastName=?,
        gender=?,password=?,number=?,email=? where id=?`,
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.password,
            data.number,
            data.email,
            data.id
        ],
        (error,results,fields) =>{
            if (error){
                callBack(error);
            }
            return callBack(null,results[0]);
        });
    },
    deleteUser: (data,callBack) =>{
        pool.query(
            `delete from registration where id = ?`,
            [data.id],
            (error,results,fields)=>{
                if (error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        )
    },
    getUserByEmail:(email,callBack) =>{
        pool.query(
            `select * from registration where email = ?`,
            [email],
            (error,results,fields)=>{
                if (error){
                    callBack(error);
                }
                return callBack(null,results[0]);
            }
        )
    }
};