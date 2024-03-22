import express from 'express'
import cors from 'cors';
import userRoute from './src/routes/user.route.mjs'
import casesRoute from './src/routes/cases.route.mjs'
import contractRoute from './src/routes/contract.route.mjs'
import genderRoute from './src/routes/gender.couter.mjs'
const app = express()

//midddlewares
try {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    //router
    app.use(genderRoute)
    app.use(userRoute)
    app.use(casesRoute)
    app.use(contractRoute)

    app.listen(3001, () => console.log('conectado al puerto 3001'))

} catch (error) {
    console.log(error)
}