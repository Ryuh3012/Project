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
        const { cedula, nombre, apellido, telefono, email, direccion, genderid, departmentid } = req.body;


        const respon = await pool.query(
            "INSERT INTO users( cedula, nombre, apellido, telefono, email, direccion, genderid, departmentid ) VALUES ($1, $2, $3,$4,$5,$6,$7, $8)", [cedula, nombre, apellido, telefono, email, direccion,genderid, departmentid]
        );

        console.log(respon);
        res.json({
            message: "usuario agregado exitosamente",
            body: {
                user: {
                    cedula, nombre, apellido,  telefono, email, direccion
                }
            },
        });
    } catch (error) {
        console.log(error)
    }

};

export const getUser = async (req, res) => {
    try {
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
        const cedula = req.params.cedula;
        const respon = await pool.query("SELECT * FROM users WHERE cedula = $1", [cedula]);
        res.json(respon.rows);
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const cedula = req.params.cedula;
        const respon = await pool.query("delete from users where cedula= $1", [cedula]);
        res.json(`Usuario ${cedula} eliminado exitosamente`);
    } catch (error) {
        console.log(error);
    }
};

export const UpdateUser = async (req, res) => {
    try {
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
