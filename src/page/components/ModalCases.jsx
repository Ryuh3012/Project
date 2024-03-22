import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import ico from "../../assets/Img/editar.png";


export const ModalCases = ({ DateDocuments, date, setDate }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('md')
  const { id, startDate, typeCase, lawyer, detail } = DateDocuments


  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }

  return (
    <>
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
              <ModalHeader className="flex flex-col gap-1 items-center text-3xl">Formato de Caso Legal:</ModalHeader>
              <ModalBody >

                <p>
                  <span className='flex flex-col gap-1 items-center p-2 text-xl'> Información del Caso</span>
                  <ul>
                    <li>
                      Cédula del Cliente: {id}
                    </li>
                    <li>
                      Fecha Inicial del Caso: {startDate}

                    </li>
                    <li>
                      Tipo de Caso: {typeCase}

                    </li>
                    <li>
                      Abogado Responsable: {lawyer}

                    </li>
                  </ul>
                </p>
                <p>

                </p>
                <span className='flex flex-col gap-1 items-center p-10 text-xl'>Detalles del Caso</span>
                <p>
                  {detail}
                </p>


              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal >
    </>
  );
}
