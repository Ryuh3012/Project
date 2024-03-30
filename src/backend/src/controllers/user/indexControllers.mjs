import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "0000",
    database: "modulo",
    port: "5432",
});

export const createUser = async (req, res) => {

    try {
        pool.connect()
        //geix2 esta pendiente de las webadas xd
        const {cedula, nombre, apellido, telefono, email, gender,tipodecontrato,  fechainiciada } = req.body?.data;
        const genderId = gender === 'masculino' ? 1 : 2
        
        const userId = await pool.query(
            "INSERT INTO users(cedula, nombre, apellido, telefono, email,  genderid ) VALUES ($1, $2, $3,$4,$5,$6) RETURNING iduser;", 
            [cedula, nombre, apellido, telefono, email, genderId],
            );
            // const iduser = userId.rows[0]
        const respon =  await pool.query( 
            "INSERT INTO contracts(tipodecontrato, fechainiciada, user_idusers, user_gender) VALUES ($1, $2,$3,$4);", 
            [tipodecontrato, fechainiciada, userId.rowCount, genderId]
        );

        console.log(respon);
        res.status(200).json({
            message: "usuario agregado exitosamente",
        });
    } catch (error) {
        console.log(error)
    }

};

export const getUser = async (req, res) => {
    try {
        pool.connect()

        const respon = await pool.query("SELECT * FROM users");
        return res.status(200).json({
            res: respon?.rows
        });          
    } catch (error) {
        console.log(error)
    }
   
};

export const getConsul = async (req, res) => {
    try {
        pool.connect()
        const cedula = req.params.cedula;
        const respon = await pool.query("SELECT * FROM users WHERE cedula = $1", [cedula]);
        res.json(respon.rows);
        
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        pool.connect()
        const cedula = req.params.cedula;
        const respon = await pool.query("delete from users where cedula= $1", [cedula]);
        console.log(respon)
        res.json(`Usuario ${cedula} eliminado exitosamente`);
        
    } catch (error) {
        console.log(error);
    }
};

export const UpdateUser = async (req, res) => {
    try {
        pool.connect()
        const cedula = req.params.cedula;
        const {
            nombre,
            email
        } = req.body;
        const respon = await pool.query(
            "UPDATE users SET nombre = $1, email = $2 WHERE cedula = $3",
            [nombre, email, cedula]
        );
        console.log(respon);
        res.json("actualización de usuario");
        
    } catch (error) {
        console.log(error);
    }
};
