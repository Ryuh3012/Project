import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Pagination, Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { ModalUsers } from "../../components/ModalUser";


const initialValues = {
    cedula: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: ' ',
    gender: '',
    cargo: '',
    tipodecontrato: '',
    speciality: '',
    fechainiciada: '',
}

const columns = [
    {
        key: "cedula",
        label: "Cedula",
    },

    {
        key: "nombre",
        label: "Nombre",
    },
    {
        key: "telefono",
        label: "telefono",
    },
    {
        key: "tipodecontrato",
        label: "Tipo De contrato",
    },
    {
        key: "fechainiciada",
        label: "Fecha",
    },
    {
        key: 'action',
        label: 'Acciones'
    }
];
export const Expedientes = () => {

    const [users, setUsers] = useState([])
    // const hoy = new Date();
    // const dia = hoy.getDate();
    // const mes = hoy.getMonth() + 1; // Añadimos 1 para normalizar el valor del mes
    // const año = hoy.getFullYear();

    const validate = (values) => {
        let errors = {}
        if (!values.cedula.toString().replace(/[^0-9]*$/, '')) errors.cedula = 'no se permite letras'
        if (!values.cedula) errors.cedula = 'La Cedula Muy Corta'
        if (!values.nombre) errors.nombre = 'Requiere Nombre'
        if (!values.email) errors.email = 'Requiere Correo'
        if (!values.apellido) errors.apellido = 'Requiere Apellido'
        if (!values.telefono) errors.telefono = 'Requiere Correo'
        if (!values.telefono.toString().replace(/[^0-9]*$/, '')) errors.telefono = 'no se permite letras'
        if (!values.gender) errors.gender = 'Debe Eligir Un sexo'
        if (!values.fechainiciada) errors.fechainiciada = 'Debes Poner Una Fecha'
        return errors
    }

    const formik = useFormik({
        initialValues,
        onSubmit: async (value, { resetForm }) => {

            const { cedula, nombre, apellido, telefono, email, gender, cargo, tipodecontrato, speciality, fechainiciada } = value

            //gei
            await axios.post('http://localhost:3001/users', {
                data: {
                    // Hazlo asi siempre :))
                    cedula,
                    nombre,
                    apellido,
                    telefono,
                    email,
                    gender,
                    tipodecontrato,
                    fechainiciada
                }
            }).then(resp => setUsers([...users, value]))
                .catch(err => console.log(err))
            return resetForm()

        },
        validate,
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure(false);
    const [info, setInfo] = useState()
    return (
        < div className="p-10 flex flex-col gap-6" c>
            <div className="bg-white rounded-[5px] shadow-md p-5 w-full border-[1px] border-[#C4CEDC]">
                <p className="text-[30px] font-semibold mb-5  font-mono">Listado De Expedientes</p>
                <div className="flex justify-end">

                    <Button onPress={onOpen} className="bg-[#1F2559] text-white rounded-[5px] px-4 py-2  font-semibold flex justify-center items-center">Crear</Button>
                </div>
                <Table
                    shadow="none"
                    aria-label="Example table with client side pagination"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"

                            />
                        </div>
                    }
                    classNames={{
                        wrapper: "min-h-[222px]",
                    }}
                >

                    <TableHeader columns={columns}>
                        {(column) => <TableColumn className="text-left bg-[#1F2559] text-white  px-3" key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={users}>
                        {users.map(user => (
                            <TableRow key={user.cedula}>
                                {(columnKey) => {
                                    if (columnKey === 'action') return <TableCell>< ModalUsers users={[...users]} close={info} isOpen={setInfo} /></TableCell>
                                    return <TableCell>{getKeyValue(user, columnKey)}</TableCell>
                                }}
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>

            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <div className="bg-[#d9dbe0]">
                            <ModalHeader className="flex justify-center gap-1">Registro De Expediente</ModalHeader>
                            <ModalBody>
                                <form onSubmit={formik.handleSubmit}>
                                    {formik.touched.nombre && formik.errors.nombre ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.nombre}</p> : null}
                                    {formik.touched.apellido && formik.errors.apellido ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.apellido}</p> : null}
                                    {formik.touched.cedula && formik.errors.cedula ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.cedula}</p> : null}
                                    {formik.touched.email && formik.errors.email ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.email}</p> : null}
                                    {formik.touched.gender && formik.errors.gender ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.gender}</p> : null}
                                    {formik.touched.telefono && formik.errors.telefono ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.telefono}</p> : null}
                                    {formik.touched.fechainiciada && formik.errors.fechainiciada ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.fechainiciada}</p> : null}
                                    <div className="flex flex-col w-full gap-2">
                                        <label htmlFor="status">Tipo De contrato</label>
                                        <select
                                            className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                            nombre="tipodecontrato"
                                            {...formik.getFieldProps('tipodecontrato')}
                                        >
                                            <option value=""></option>
                                            <option value="departementos">Departamento</option>
                                            <option value="personal">Personal</option>
                                            {/* {tipoContratos.map((e) => (
                                                // <option key={e}>{Object.keys(e)} </option>
                                                <option key={e[1]}> {Object.keys(e).flat()[0]}</option>
                                            ))} */}
                                        </select>
                                    </div>
                                    {formik.touched.tipodecontrato === 'departementos' ? <div className='flex gap-3 items-center'>
                                        <div className="flex flex-col w-full gap-2">
                                            <label htmlFor="status">Especialidad</label>
                                            <select
                                                className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                                nombre="speciality"
                                                id="speciality"
                                                defaultValue={''}
                                                {...formik.getFieldProps('speciality')}
                                            >

                                            </select>
                                        </div>
                                        <div className='flex flex-col w-full gap-2'>
                                            <label htmlFor="status">Cargo</label>
                                            <select
                                                className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                                nombre="cargo"
                                                id="cargo"
                                                defaultValue={''}
                                                {...formik.getFieldProps('cargo')}
                                            >


                                            </select>
                                        </div>
                                    </div> : null}

                                    <div className='flex gap-3 items-center'>
                                        <div className="flex flex-col w-full gap-2">
                                            <label htmlFor="nombre">Nombre</label>
                                            <input
                                                className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
                                                id="nombre"
                                                {...formik.getFieldProps('nombre')}
                                                placeholder="Introduce tu nombre"
                                            />
                                        </div>
                                        <div className='flex flex-col w-full gap-2'>
                                            <label htmlFor="apellido">Apellido</label>
                                            <input
                                                id="apellido"
                                                {...formik.getFieldProps('apellido')}
                                                placeholder="Introduce tu Apellido"
                                                className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full gap-3">
                                        <div className='flex flex-col w-full gap-2'>
                                            <label htmlFor="email">Correo</label>
                                            <input
                                                className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
                                                id="email"
                                                inputMode="email"
                                                {...formik.getFieldProps('email')}
                                                placeholder="Introduce tu Correo"
                                            />
                                        </div>

                                        <div className='flex flex-col w-full gap-2'>

                                            <label htmlFor="telefono">Telefono</label>
                                            <input
                                                className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
                                                id="telefono"
                                                inputMode="tel"
                                                {...formik.getFieldProps('telefono')}
                                                placeholder="Introduce tu telefono"
                                            />
                                        </div>

                                    </div>

                                    <div>
                                        <label htmlFor="id">Cédula</label>
                                        <input
                                            className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
                                            id="cedula"
                                            {...formik.getFieldProps('cedula')}
                                            inputMode="numeric"
                                            placeholder="Introduce tu cédula"
                                        // pattern={/[^0-9]*$/}
                                        />
                                    </div>

                                    <div className='flex flex-col w-full gap-2'>
                                        <label htmlFor="gender">Genero</label>
                                        <select
                                            className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                            nombre="gender"
                                            {...formik.getFieldProps('gender')}
                                        >

                                            <option value={''}></option>
                                            <option value={'masculino'}>Masculino</option>
                                            <option value={'femenino'}>Femenino</option>
                                        </select>
                                    </div>

                                    <div>

                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                        <div>
                                            <label htmlFor="id">Fecha</label>
                                            <input
                                                className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
                                                id="date"
                                                type="date"
                                                inputMode="text"
                                                placeholder="Introduce tu cedula"
                                                {...formik.getFieldProps('fechainiciada')}
                                            />
                                        </div>

                                    </div>

                                    <div className="flex gap-2 m-[10px] justify-end items-center" >
                                        <Button color="danger" variant="flat" onPress={onClose}>Close</Button>
                                        <Button type='submit' color="primary" onPress={onClose}>Sign in</Button>
                                    </div>
                                </form>
                            </ModalBody>
                        </div>
                    )}
                </ModalContent>
            </Modal>

        </div >

    )
}
