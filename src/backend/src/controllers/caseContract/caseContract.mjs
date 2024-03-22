import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "0000",
    database: "modulo",
    port: "5432",
});

export const createCaseContract = async (req, res) => {

    try {
        const { estatus, fechadeinicio, fechafinalizada } = req.body?.data;
        const respon = await pool.query(
            "INSERT INTO contracts( estatus, fechadeinicio, fechafinalizada ) VALUES ($1, $2, $3)", [estatus, fechadeinicio, fechafinalizada]
        );

        console.log(respon);
        res.json({
            message: "Contract Add Succesfully",
        });
    } catch (error) {
        console.log(error)
    }

};

export const getCaseContract = async (req, res) => {
    try {
        const respon = await pool.query("select * from contract_has_cases");
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
        const respon = await pool.query("SELECT * FROM contract_has_cases WHERE id = $1", [id]);
        res.json(respon.rows);
    } catch (error) {
        console.log(error);
    }
};

export const deleteCaseContract = async (req, res) => {
    try {
        const id = req.params.id;
        const respon = await pool.query("delete from contract_has_cases where id= $1", [id]);
        res.json(`contracts ${id} deletd successfull`);
    } catch (error) {
        console.log(error);
    }
};

export const UpdateCaseContract = async (req, res) => {
    try {
        const id = req.params.id;
        const { tipoDeContrato, estatus, fechaIniciada } = req.body?.data;
        const respon = await pool.query("UPDATE contract_has_cases SET tipoDeContrato = $1, estatus = $2  fechaIniciada = $3 WHERE id= $4", [tipoDeContrato, estatus, fechaIniciada, id]);
        console.log(respon);
        res.json("Contract update");
    } catch (error) {
        console.log(error);
    }
};
