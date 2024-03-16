import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Pagination, Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import ModalInfor from "../../components/ModalInfor";
import { useState } from "react";



const users = []

const initialValues = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    cargo: '',
    typeContract: '',
    speciality: '',
    date: '',
}
export const Expedientes = () => {
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1; // Añadimos 1 para normalizar el valor del mes
    const año = hoy.getFullYear();
    const validate = (values) => {
        let errors = {}
        if (!values.id.toString().replace(/[^0-9]*$/, '')) errors.id = 'no se permite letras'
        if (!values.name) errors.name = 'Requiere Nombre'
        if (!values.id) errors.id = 'La Cedula Muy Corta'
        if (!values.email) errors.email = 'Requiere Correo'
        if (!values.lastName) errors.lastName = 'Requiere Apellido'
        if (!values.phone) errors.phone = 'Requiere Correo'
        if (!values.phone.toString().replace(/[^0-9]*$/, '')) errors.phone = 'no se permite letras'
        if (!values.gender) errors.gender = 'Debe Eligir Un sexo'
        if (!values.date) errors.date = 'Debes Poner Una Fecha'
        if (values?.date === dia && mes && año) errors.date = 'Fecha Incorrecta'
        return errors
    }

    const formik = useFormik({
        initialValues,
        onSubmit: async (values, { resetForm }) => {
            if(values){
                users.push(values)
                await axios.post('localhost:4000/users', values)
                return resetForm()
            }
        },
        validate,
    })



    const columns = [
        {
            key: "id",
            label: "Cedula",
        },

        {
            key: "name",
            label: "Nombre",
        },
        {
            key: "phone",
            label: "telefono",
        },
        {
            key: "typeContract",
            label: "Tipo De contrato",
        },
        {
            key: "cargo",
            label: "Cargo",
        },
        {
            key: "speciality",
            label: "Especialidad",
        },
        {
            key: "date",
            label: "Fecha",
        },
    ];
    const { isOpen, onOpen, onOpenChange } = useDisclosure(false);
    const [info, setInfo] = useState()
    const [userData, setUserData]= useState({})
    return (
        <div className="p-10 flex flex-col gap-6">
            <div className="bg-white rounded-[5px] shadow-md p-5 w-full border-[1px] border-[#C4CEDC]">
                <p className="text-[30px] font-semibold mb-5">Listado De Expedientes</p>
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
                        {users.map(item => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
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
                                    {formik.touched.name && formik.errors.name ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.name}</p> : null}
                                    {formik.touched.lastName && formik.errors.lastName ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.lastName}</p> : null}
                                    {formik.touched.id && formik.errors.id ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.id}</p> : null}
                                    {formik.touched.email && formik.errors.email ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.email}</p> : null}
                                    {formik.touched.gender && formik.errors.gender ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.gender}</p> : null}
                                    {formik.touched.phone && formik.errors.phone ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.phone}</p> : null}
                                    {formik.touched.date && formik.errors.date ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.date}</p> : null}
                                    <div className="flex flex-col w-full gap-2">
                                        <label htmlFor="status">Tipo De contrato</label>
                                        <select
                                            className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                            name="typeContract"
                                            {...formik.getFieldProps('typeContract')}
                                        >
                                            <option value=""></option>
                                            <option value="personal">Personal</option>
                                            <option value="departementos">Departamento</option>
                                            {/* {tipoContratos.map((e) => (
                                                // <option key={e}>{Object.keys(e)} </option>
                                                <option key={e[1]}> {Object.keys(e).flat()[0]}</option>
                                            ))} */}
                                        </select>
                                    </div>
                                    {formik.touched.typeContract === 'departementos' ? <div className='flex gap-3 items-center'>
                                        <div className="flex flex-col w-full gap-2">
                                            <label htmlFor="status">Especialidad</label>
                                            <select
                                                className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                                name="speciality"
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
                                                name="cargo"
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
                                                id="name"
                                                {...formik.getFieldProps('name')}
                                                placeholder="Introduce tu nombre"
                                            />
                                        </div>
                                        <div className='flex flex-col w-full gap-2'>
                                            <label htmlFor="lastName">Apellido</label>
                                            <input
                                                id="lastName"
                                                {...formik.getFieldProps('lastName')}
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

                                            <label htmlFor="phone">Telefono</label>
                                            <input
                                                className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
                                                id="phone"
                                                inputMode="tel"
                                                {...formik.getFieldProps('phone')}
                                                placeholder="Introduce tu telefono"
                                            />
                                        </div>

                                    </div>

                                    <div>
                                        <label htmlFor="id">Cédula</label>
                                        <input
                                            className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
                                            id="id"
                                            {...formik.getFieldProps('id')}
                                            inputMode="numeric"
                                            placeholder="Introduce tu cédula"
                                        // pattern={/[^0-9]*$/}
                                        />
                                    </div>

                                    <div className='flex flex-col w-full gap-2'>
                                        <label htmlFor="gender">Genero</label>
                                        <select
                                            className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                            name="gender"
                                            {...formik.getFieldProps('gender')}
                                        >
                                            <option value={''}></option>
                                            <option value={'hombre'}>Hombre</option>
                                            <option value={'mujer'}>Mujer</option>
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
                                                {...formik.getFieldProps('date')}
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
            <ModalInfor users={users}  close={info} isOpen={setInfo} />
            {/* userData ={userData} setUserData={setUserData} */}
        </div >

    )
}
