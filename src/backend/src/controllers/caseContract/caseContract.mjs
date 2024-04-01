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
        const { cedula, detallesdelcaso, tipodecaso, fechadeinicio, fechafinalizada, estatus } = req.body?.data;

        // Buscar id de las personas
        const userid = await pool.query('select iduser from users where cedula = $1', [cedula])
        const genderid = await pool.query('select genderid from users where cedula = $1', [cedula])

        // insertar en cada campo
        const selectTipo = tipodecaso === 'demandado' ? 'demanda' : 'denunciado'
        const idcases = await pool.query('INSERT INTO cases(cedula ,detallesdelcaso, tipodecaso, user_iduser, user_gender_idgender ) VALUES($1,$2,$3,$4, $5) RETURNING idcases ',
            [cedula, detallesdelcaso, selectTipo, userid.rowCount, genderid.rowCount])

        const respon = await pool.query('INSERT INTO contract_has_cases(cases_idcases,estatus, fechadeinicio, fechafinalizada ) VALUES($1,$2,$3,$4)',
            [idcases.rowCount, estatus, fechadeinicio, fechafinalizada])

        return res.status(200).json({
            message: "caso agregado exitosamente",
        });
    } catch (error) {
        console.log(error)
    }


}
export const getCaseContract = async (req, res) => {
    try {
        pool.connect()
        const respon = await pool.query("select *from cases");
        return res.status(200).json({
            res: respon?.rows
        });
    } catch (error) {
        console.log(error)
    }

}
export const getConsul = async (req, res) => {
    try {
        pool.connect()
        const cedula = req.params.cedula;
        const respon = await pool.query("SELECT * FROM cases WHERE cedula = $1", [cedula]);
        res.json(respon.rows);

    } catch (error) {
        console.log(error);
    }
}
export const deleteCaseContract = async (req, res) => {
    try {
        pool.connect()
        const cedula = req.params.cedula;
        const respon = await pool.query("delete from cases where cedula= $1", [cedula]);
        console.log(respon)
        res.json(`cases ${cedula} eliminado exitosamente`);

    } catch (error) {
        console.log(error);
    }
};
export const UpdateCaseContract = async (req, res) => {
    try {
        pool.connect()
        const cedula = req.params.cedula;
        const { detallesdelcaso, selectTipo } = req.body;
        const respon = await pool.query(
            "UPDATE cases SET detallesdelcaso = $1, selectTipo = $2 WHERE cedula = $3",
            [detallesdelcaso, selectTipo, cedula]
        );
        console.log(respon);
        res.json("actualización de usuario");

    } catch (error) {
        console.log(error);
    }
};