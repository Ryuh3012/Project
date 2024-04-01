import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Pagination, Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";



const users = []

const initialValues = {
    id: '',
    startDate: '',
    dataEnd: '',
    caseType: '',
    lawyer: '',
    status: '',
    datail: '',
}
export const Hola = () => {

    const [date, setDate] = useState([]);

    const validate = (values) => {
        let errors = {}
        values.id.toString().replace(/[^0-9]*$/, '')
        if (!values.id) errors.id = 'La Cedula Muy Corta'
        if (!values.startDate) errors.startDate = 'debes poner un fecha inicial'
        if (!values.caseType) errors.caseType = 'Debes poner un caso'
        if (!values.lawyer) errors.lawyer = 'Debes Selecionar un abogado'
        if (!values.status) errors.status = 'Debes Selecionar el tipo de estatus'
        if (!values.detailsofthecase) errors.detailsofthecase = 'necesitas los detalles del caso'

        return errors
    }

    const formik = useFormik({
        initialValues,
        onSubmit: async (value, { resetForm }) => {
            setDate([...date, value])
            
            return resetForm()
        },
        validate,
    })



    const columns = [
        {
            key: "id",
            label: "Cedula",
        },

        {
            key: "lawyer",
            label: "abogado",
        },
        {
            key: "startDate",
            label: "fecha de inicio",
        },
        {
            key: "typeContract",
            label: "Tipo De contrato",
        },
        {
            key: "date",
            label: "Fecha",
        },
    ];
    const { isOpen, onOpen, onOpenChange } = useDisclosure(false);
    const [info, setInfo] = useState()
    return (
        < div className="p-10 flex flex-col gap-6" >
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
                                    {formik.touched.nombre && formik.errors.nombre ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.nombre}</p> : null}
                                    {formik.touched.apellido && formik.errors.apellido ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.apellido}</p> : null}
                                    {formik.touched.id && formik.errors.id ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.id}</p> : null}
                                    {formik.touched.email && formik.errors.email ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.email}</p> : null}
                                    {formik.touched.gender && formik.errors.gender ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.gender}</p> : null}
                                    {formik.touched.telefono && formik.errors.telefono ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.telefono}</p> : null}
                                    {formik.touched.date && formik.errors.date ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.date}</p> : null}
                                    <div className="flex flex-col w-full gap-2">
                                        <label htmlFor="status">Tipo De contrato</label>
                                        <select
                                            className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                            nombre="typeContract"
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
                                            nombre="gender"
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

        </div >

    )
}
