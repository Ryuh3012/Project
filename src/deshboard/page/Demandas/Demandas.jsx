import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Pagination, Textarea, Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { UserFormulario } from "../security/userFormulario";
import { Input } from "../components/Input";
import { useState } from "react";
import { Nav } from "../../Nav";

const DateDocuments = [];

export const Demandas = () => {
    const [date, setDate] = useState(DateDocuments)
    const [fomurlario, handleChange, reset] = UserFormulario({
        DateDocuments:{

            id: '',
            name: '',
            date: '',
            typeContract: '',
            status: '',
            detalles: ''
        }
    })

    const submit = (e) => {
        e.preventDefault()
        setDate([
            ...date,
            fomurlario
        ])
        reset(e)
    }
    const columns = [
        {
            key: "id",
            label: "Clientes",
        },
        {
            key: "name",
            label: "Abogado",
        },
        {
            key: "date",
            label: "Fecha",
        },
        {
            key: "typeContract",
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
        <Nav>
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
                        <TableBody items={date}>
                            {date.map(item => (
                                <TableRow key={item.key}>
                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                </TableRow>
                            ))
                        /* {(} */}
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
                            <>
                                <ModalHeader className="flex justify-center gap-1">Registro De Caso</ModalHeader>
                                <ModalBody>
                                    <form onSubmit={submit}>
                                        <div className="flex flex-col">
                                            <Input
                                                label='Cedula'
                                                type="text"
                                                name="id"
                                                inputMode="text"
                                                placeholder="Introduce tu cedula"
                                                onChange={handleChange}
                                            />
                                            <Input
                                                label='Fecha de Inicio'
                                                id="date"
                                                type="date"
                                                name="date"
                                                inputMode="text"
                                                placeholder="Introduce tu cedula"
                                                onChange={handleChange}
                                            />
                                            <div>
                                                <label htmlFor="phone">Estatus</label>
                                                <select
                                                    className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                                    name="status"
                                                    id="status"
                                                    defaultValue={'activo'}
                                                    onChange={handleChange}>
                                                    <option value={'activo'}>Activo</option>
                                                    <option value={'finalizado'}>Finalizado</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="gender">Tipo De Caso</label>
                                                <select
                                                    className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                                    name="typeContract"
                                                    id="typeContract"
                                                    defaultValue={'demandado'}
                                                    onChange={handleChange}>
                                                    <option value={'demandado'}>Demandado</option>
                                                    <option value={'denunciante'}>Denunciante</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="gender">Abogado</label>
                                                <select
                                                    className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                                                    name="name"
                                                    id="name"
                                                    defaultValue={''}
                                                    onChange={handleChange}>
                                                    <option value={'Juan'}>Juan</option>
                                                    <option value={'pedro'}>pedro</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <Textarea
                                                isRequired
                                                label="Detalles Del Caso"
                                                labelPlacement="outside"
                                                placeholder="Enter your description"
                                                className=""
                                                name='detalles'
                                                id='detalles'
                                                onChange={handleChange} />
                                        </div>
                                        <Button color="danger" variant="flat" onPress={onClose}>Close</Button>
                                        <Button type='submit' color="primary" onPress={onClose}>Sign in</Button>
                                    </form>
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div >
        </Nav>
    );
}
