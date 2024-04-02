import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Pagination, Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { ModalUsers } from "../../components/ModalUser";
import { ModalCases } from "../../components/ModalCases";


const initialValues = {
    id: '',
    startDate: '',
    typeCase: '',
    lawyer: '',
    detail: '',
    status: '',
}

const columns = [
    {
        key: "id",
        label: "Clientes",
    },
    {
        key: "startDate",
        label: "fecha inicial",
    },
    {
        key: "typeCase",
        label: "tipo De Caso",
    },
    {
        key: "lawyer",
        label: "Abogado",
    },
    {
        key: "status",
        label: "Estatus",
    },
    {
        key: "detail",
        label: "Detalles",
    },

    {
        key: "edit",
        label: "editar",
    }
];
export const Demandas = () => {

    const [data, setData] = useState([])
    // const hoy = new Date();
    // const dia = hoy.getDate();
    // const mes = hoy.getMonth() + 1; // Añadimos 1 para normalizar el valor del mes
    // const año = hoy.getFullYear();

    const validate = (values) => {
        let errors = {}
        if (!values.id.toString().replace(/[^0-9]*$/, '')) errors.id = 'no se permite letras'
        if (!values.id) errors.id = 'La Cedula Muy Corta'
        if (!values.startDate) errors.startDate = 'Requiere Nombre'
        if (!values.typeCase) errors.typeCase = 'Requiere Apellido'
        if (!values.lawyer) errors.lawyer = 'Requiere Correo'
        if (!values.detail) errors.detail = 'Debe Eligir Un sexo'
        if (!values.status) errors.status = 'Debes Poner Una Fecha'
        return errors
    }

    const formik = useFormik({
        initialValues,
        onSubmit: async (value, { resetForm }) => {

            const { id, startDate, typeCase, detail, status } = value

            //gei
            await axios.post('http://localhost:3001/cases', {
                data: {
                    // Hazlo asi siempre :))
                    cedula: id,
                    detallesdelcaso: detail,
                    tipodecaso: typeCase,
                    fechadeinicio: startDate,
                    estatus: status,
                }
            }).then(resp => setData([...data, value]))
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
                    <TableBody items={data}>
                        {data.map(user => (
                            <TableRow key={user.id}>
                                {(columnKey) => {
                                    if (columnKey === 'edit') return <TableCell><ModalCases data={data} close={info} isOpen={setInfo} /></TableCell>
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
                                    {formik.touched.id && formik.errors.id ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.id}</p> : null}
                                    {formik.touched.startDate && formik.errors.startDate ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.startDate}</p> : null}
                                    {formik.touched.typeCase && formik.errors.typeCase ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.typeCase}</p> : null}
                                    {formik.touched.lawyer && formik.errors.lawyer ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.lawyer}</p> : null}
                                    {formik.touched.detail && formik.errors.detail ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.detail}</p> : null}
                                    {formik.touched.status && formik.errors.status ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.status}</p> : null}
                                    <div className="flex flex-col w-full gap-2">
                                        <label htmlFor="id">Cedula</label>
                                        <input
                                            className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
                                            id="id"
                                            {...formik.getFieldProps('id')}
                                            placeholder="Introduce tu id"
                                        />
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

                                    <div className="flex flex-col w-full gap-2">
                                        <label htmlFor="apellido">Fecha inicial</label>
                                        <input
                                            id="startDate"
                                            type="date"
                                            {...formik.getFieldProps('startDate')}
                                            placeholder="Introduce tu fecha inicial"
                                            className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
                                        />
                                    </div>


                                    <div className='flex gap-2 items-center'>
                                        <div className="flex flex-col w-full gap-2">
                                            <label htmlFor="typeCase">Tipo de Caso</label>
                                            <select
                                                className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                                name="typeCase"
                                                id="typeCase"
                                                defaultValue={''}
                                                {...formik.getFieldProps('typeCase')}
                                            >
                                                <option value={''}></option>
                                                <option value={'demandado'}>Demandado</option>
                                                <option value={'denunciante'}>Denunciante</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col w-full gap-2'>
                                            <label htmlFor="lawyer">Abogado</label>
                                            <select
                                                className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                                name="lawyer"
                                                id="lawyer"
                                                defaultValue={''}
                                                {...formik.getFieldProps('lawyer')}
                                            >
                                                <option value={''}></option>
                                                <option value={'Juan'}>Juan</option>
                                                <option value={'pedro'}>pedro</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="status">Estatus</label>
                                        <select
                                            className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                            name="status"
                                            id="status"
                                            defaultValue={''}
                                            {...formik.getFieldProps('status')}
                                        >
                                            <option value={''}></option>
                                            <option value={'activo'}>Activo</option>
                                            <option value={'finalizado'}>Finalizado</option>
                                        </select>
                                    </div>

                                    <div className='flex flex-col w-full gap-2'>
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                        <div>
                                            <label htmlFor="detail">Detalles Del Caso</label>
                                            <Textarea
                                                isRequired
                                                id='detail'
                                                labelPlacement="outside"
                                                placeholder="Ingresa tu descripción"
                                                {...formik.getFieldProps('detail')}
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
