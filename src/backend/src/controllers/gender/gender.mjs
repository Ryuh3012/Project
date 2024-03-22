import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "0000",
    database: "modulo",
    port: "5432",
});

export const getGender = async (req, res) => {
    try {
        pool.connect()

        const respon = await pool.query("SELECT * FROM gender");
        return res.status(200).json({
            res: respon?.rows
        });          
    } catch (error) {
        console.log(error)
    }
   
};