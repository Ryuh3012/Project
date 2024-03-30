import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "0000",
    database: "modulo",
    port: "5432",
});

export const createContract = async (req, res) => {

    try {
        const { tipodecontrato,  fechainiciada } = req.body;
        const respon = await pool.query( 
            "INSERT INTO contracts(tipodecontrato, fechainiciada) VALUES ($1, $2)", [tipodecontrato, fechainiciada]
        );

        console.log(respon);
        res.json({
            message: "Contract Add Succesfully",
            body: {
                Contract: {
                    tipodecontrato, fechainiciada
                },
            },
        });
    } catch (error) {
        console.log(error)
    }

};

export const getContract = async (req, res) => {
    try {
        const respon = await pool.query("SELECT * FROM contracts");
        return res.status(200).json({
            res: respon?.rows
        });
    } catch (error) {
        console.log(error)
    }

};

export const getConsul = async (req, res) => {
    try {
        const id = req.params.id;
        const respon = await pool.query("SELECT * FROM contracts WHERE id = $1", [id]);
        res.json(respon.rows);
    } catch (error) {
        console.log(error);
    }
};

export const deleteContract = async (req, res) => {
    try {
        const id = req.params.id;
        const respon = await pool.query("delete from contracts where id= $1", [id]);
        res.json(`contracts ${id} deletd successfull`);
    } catch (error) {
        console.log(error);
    }
};

export const UpdateContract = async (req, res) => {
    try {
        const id = req.params.id;
        const { tipoDeContrato,fechaIniciada } = req.body?.data;
        const respon = await pool.query("UPDATE contracts SET tipoDeContrato = $1,  fechaIniciada = $3 WHERE id= $4", [tipoDeContrato, fechaIniciada, id]);
        console.log(respon);
        res.json("Contract update");
    } catch (error) {
        console.log(error);
    }
};
