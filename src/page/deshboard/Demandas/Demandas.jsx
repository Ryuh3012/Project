import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Pagination, Textarea, Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { Axios } from "axios";
import { useFormik } from "formik";

const DateDocuments = [];

export const Demandas = () => {
    const validate = (values) => {
        let errors = {}
        values.id.toString().replace(/[^0-9]*$/, '')
        if (!values.id) errors.id = 'La Cedula Muy Corta'
        if (!values.startDate) errors.startDate = 'Debe Tener Una Fecha Inicial'
        if (!values.typeCase) errors.typeCase = 'Debe Seleccionar El Tipo De Caso'
        if (!values.lawyer) errors.lawyer = 'Debe Seleccionar Un abogado'
        if (!values.detail) errors.detail = 'Debe Poner El Detalle Del caso'
        if (!values.status) errors.status = 'Debe Selecionar Un Estatus'

        return errors
    }
    const formik = useFormik({
        initialValues: {
            id: '',
            startDate: '',
            endDatete: '',
            typeCase: '',
            lawyer: '',
            detail: '',
            status: '',
        },
        onSubmit: async (value, { resetForm }) => {
            DateDocuments.push(value)
            await Axios.post('http://localhost:3000/contract', value)
            return resetForm()
        },
        validate,
    })

    const columns = [
        {
            key: "id",
            label: "Clientes",
        },
        {
            key: "lawyer",
            label: "Abogado",
        },
        {
            key: "startDate",
            label: "Fecha Inicial",
        },
        {
            key: "typeCase",
            label: "tipo De Caso",
        },
        {
            key: "status",
            label: "Estatus",
        },

        {
            key: "edit",
            label: "editar",
        }
    ];
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className="p-10 flex flex-col gap-6">
            <div className="bg-white rounded-[5px] shadow-md p-5 w-full border-[1px] border-[#C4CEDC]">
                <p className="text-[30px] font-semibold mb-5">Listado De Casos</p>
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
                    <TableBody items={DateDocuments}>
                        {DateDocuments.map(item => (
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
                            <ModalHeader className="flex justify-center gap-1">Registro De Caso</ModalHeader>
                            <ModalBody>
                                <form onSubmit={formik.handleSubmit}>
                                    {formik.touched.id && formik.errors.id ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.id}</p> : null}
                                    {formik.touched.startDate && formik.errors.startDate ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.startDate}</p> : null}
                                    {formik.touched.typeCase && formik.errors.typeCase ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.typeCase}</p> : null}
                                    {formik.touched.lawyer && formik.errors.lawyer ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.lawyer}</p> : null}
                                    {formik.touched.detail && formik.errors.detail ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.detail}</p> : null}
                                    {formik.touched.state && formik.errors.state ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.state}</p> : null}

                                    <div className='flex gap-3 items-center'>
                                        <div className="flex flex-col w-full gap-2">
                                            <label htmlFor="nombre">Cedula</label>
                                            <input
                                                className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
                                                id="id"
                                                {...formik.getFieldProps('id')}
                                                inputMode="numeric"
                                                placeholder="Introduce tu cédula"
                                            />
                                        </div>

                                    </div>
                                    <div className="flex w-full gap-3">
                                        <div className='flex flex-col w-full gap-2'>
                                            <label htmlFor="lastName">Fecha Inicial</label>
                                            <input
                                                className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
                                                id="startDate"
                                                type="date"
                                                inputMode="text"
                                                placeholder="Introduce tu cedula"
                                                {...formik.getFieldProps('startDate')}
                                            />
                                        </div>
                                        <div className='flex flex-col w-full gap-2'>
                                            <label htmlFor="endDatete">Fecha Final</label>
                                            <input
                                                className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
                                                id="endDatete"
                                                type="date"
                                                placeholder="Introduce tu cedula"
                                                {...formik.getFieldProps('endDatete')}
                                            />
                                        </div>

                                    </div>


                                    <div className='flex flex-col w-full gap-2'>
                                        <label htmlFor="typeCase">Tipo De Caso</label>
                                        <select
                                            className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                            {...formik.getFieldProps('typeCase')}
                                        >
                                            <option value={''}></option>
                                            <option value={'demandado'}>Demandado</option>
                                            <option value={'denunciante'}>Denunciante</option>
                                        </select>
                                    </div>

                                    <div>

                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                        <div>
                                            <label htmlFor="abogado">Abogado</label>
                                            <select
                                                className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                                id="lawyer"
                                                {...formik.getFieldProps('lawyer')}
                                            >
                                                <option value={''}></option>
                                                <option value={'Juan'}>Juan</option>
                                                <option value={'pedro'}>pedro</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="status">Estatus</label>
                                            <select
                                                className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                                id="status"
                                                {...formik.getFieldProps('status')}
                                            >
                                                <option value={''}></option>
                                                <option value={'activo'}>Activo</option>
                                                <option value={'finalizado'}>Finalizado</option>
                                            </select>
                                        </div>
                                    </div>
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
    );
}
