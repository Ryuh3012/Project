import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import ico from "./../../assets/Img/eye_2533656.png";


export const ModalUsers = ({ users, info, setInfo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('md')

  const { cedula, nombre, apellido, telefono, email, gender, cargo, tipodecontrato, speciality, fechainiciada } = users[0]

  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Button className='bg-white' key={size} onPress={() => handleOpen(size)}> <img src={ico} className='h-10' /> </Button>
      </div>
      <Modal

        size={size}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent className=' box-border overflow-y-auto h-[80vh] max-w-[130vh]'  >
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1 items-center text-3xl font-mono">Este contrato se celebra entre:</ModalHeader>
              <ModalBody >

                <p>
                  <span className='flex flex-col gap-1 items-center p-2 text-xl font-mono' > EMPRESA CONTRATANTE</span>
                  Nombre de la Empresa: Route <br />
                  Domicilio: Calle Los Naranjos, Nº 123
                  Apartamento 4B
                  Caracas, Distrito Capital
                  Venezuela<br />
                  Representante Legal: Juan<br />
                </p>
                <p>
                  <span className='flex flex-col gap-1 items-center p-2 text-xl font-mono'> EMPLEADO CONTRATADO</span>
                  Cédula: {cedula}  <br />
                  Nombre: {nombre}<br />
                  Apellido: {apellido} <br />
                  Correo Electrónico: {email} <br />
                  Teléfono: {telefono} <br />
                  Género:  {gender} <br />
                  Tipo de Contrato: {tipodecontrato} <br />
                  {/* { === "departementos" ? <div>
                    <p>Cargo:  </p><br />
                    <p>Especialista:  </p>
                  </div> : null} */}
                </p>
                <p>
                  <span className='flex flex-col gap-1 items-center p-2 text-xl font-mono'>OBJETO DEL CONTRATO</span>

                  El objeto de este contrato es la prestación de servicios o trabajo por parte del empleado contratado, bajo las condiciones y términos establecidos en este contrato.<br />

                  <span className='flex flex-col gap-1 items-center p-2 text-xl font-mono'>OBLIGACIONES DEL EMPLEADO</span>

                  El empleado se compromete a:
                  <ul className='p-3'>
                    <li>- Realizar las tareas y actividades asignadas en el marco de su empleo.</li>

                    <li>
                      - Cumplir con las políticas y procedimientos internos de la empresa.
                    </li>
                    <li>
                      - Mantener la confidencialidad sobre la información de la empresa.
                    </li>
                  </ul>


                  <span className='flex flex-col gap-1 items-center p-2 text-xl font-mono'>OBLIGACIONES DE LA EMPRESA</span>
                  La empresa se compromete a:
                  <ul className='p-3'>
                    <li>
                      - Proporcionar un ambiente de trabajo seguro y saludable.<br />

                    </li>
                    <li>

                      - Pagar a tiempo los salarios y beneficios correspondientes.<br />
                    </li>
                    <li>
                      - Proporcionar formación y desarrollo profesional al empleado.<br />

                    </li>
                  </ul>


                  <span className='flex flex-col gap-1 items-center p-2 text-xl font-mono'>TERMINACIÓN DEL CONTRATO </span>

                  Este contrato puede ser terminado por cualquiera de las partes con {fechainiciada} días de anticipación por escrito.<br />

                </p>
                <span className='flex flex-col gap-1 items-center p-10 text-xl font-mono'>FIRMAS</span>
                <div className='flex gap-3 items-center '>
                  <div className="flex flex-col w-full gap-3">
                    <p>
                      __________________________<br />
                      <span className='flex flex-col'>  Juan </span>
                      Representante Legal de la Empresa Contratante
                    </p>
                  </div>
                  <div className='flex flex-col w-full gap-3'>
                    <p>
                      __________________________<br />
                      <span className='flex flex-col font-mono'>  {nombre} {apellido} </span>
                      Empleado Contratado
                    </p>

                  </div>
                </div>

                <div className='flex flex-col gap-1 items-end p-2 text-sm '>
                  Fecha:{fechainiciada}
                </div>

              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}


