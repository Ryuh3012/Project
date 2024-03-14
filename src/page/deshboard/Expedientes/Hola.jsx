import { useFormik } from "formik";
import { Button } from "@nextui-org/react";

const users = []
export const Hola = () => {
  const hoy = new Date();
  const dia = hoy.getDate();
  const mes = hoy.getMonth() + 1; // Añadimos 1 para normalizar el valor del mes
  const año = hoy.getFullYear();
  const validate = (values) => {
    let errors = {}
    values.id.toString().replace(/[^0-9]*$/, '')
    if (!values.name) errors.name = 'Requiere Nombre'
    if (!values.id) errors.id = 'La Cedula Muy Corta'
    if (!values.email) errors.email = 'Requiere Correo'
    if (!values.lastName) errors.lastName = 'Requiere Apellido'
    if (!values.phone) errors.phone = 'Requiere Correo'
    if (!values.gender) errors.gender = 'Debe Eligir Un sexo'
    if (!values.date) errors.date = 'Debes Poner Una Fecha'
    // if (!values.date < dia && mes && año) errors.date = 'Fecha Incorrecta'
    return errors
  }
  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      lastName: '',
      email: '',
      phone: '',
      employment: '',
      gender: '',
      date: '',
      typeContract: '',
    },
    onSubmit: (values,{resetForm}) => {users.push(values)
    return resetForm()},
    validate,
  })
  console.log(users)
  return (

    <form onSubmit={formik.handleSubmit}>
      {formik.touched.name && formik.errors.name ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.name}</p> : null}
      {formik.touched.lastName && formik.errors.lastName ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.lastName}</p> : null}
      {formik.touched.id && formik.errors.id ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.id}</p> : null}
      {formik.touched.email && formik.errors.email ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.email}</p> : null}
      {formik.touched.gender && formik.errors.gender ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.gender}</p> : null}
      {formik.touched.phone && formik.errors.phone ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.phone}</p> : null}
      {formik.touched.date && formik.errors.date ? <p className="bg-red-100 border border-red-400 text-red-700 px-1 rounded relative py-1"  >{formik.errors.date}</p> : null}
      <div className='flex gap-3 items-center'>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="nombre">Nombre</label>
          <input
            className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
            id="name"
            name="name"
            inputMode="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Introduce tu nombre"
          />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <label htmlFor="lastName">Apellido</label>
          <input
            id="lastName"
            name="lastName"
            inputMode="text"
            placeholder="Introduce tu apellido"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
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
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Introduce tu correo"
          />
        </div>

        <div className='flex flex-col w-full gap-2'>

          <label htmlFor="phone">Telefono</label>
          <input
            className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
            id="phone"
            name="phone"
            inputMode="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            placeholder="Introduce tu telefono"
          />
        </div>

      </div>

      <div>
        <label htmlFor="id">Cédula</label>
        <input
          className="w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]"
          id="id"
          name="id"
          value={formik.values.id}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          inputMode="numeric"
          placeholder="Introduce tu cédula"
        />
      </div>

      <div className='flex flex-col w-full gap-2'>
        <label htmlFor="gender">Genero</label>
        <select
          className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
          name="gender"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gender}
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
            name="date"
            inputMode="text"
            placeholder="Introduce tu cedula"
            value={formik.values.date}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div>
        <label htmlFor="status">Tipo De contrato</label>
        <select
          className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
          name="typeContract"
          id="typeContract"
          defaultValue={''}
          value={formik.values.typeContract}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        >
          <option value={''}></option>
          <option value={'departamento'}>Departamento</option>
          <option value={'personal'}>Personal</option>
        </select>
      </div>
      <div className="flex gap-2 m-[10px] justify-end items-center" >
        <Button color="danger" variant="flat" >Close</Button>
        <Button type='submit' color="primary">Sign in</Button>
      </div>
    </form>

  )
}