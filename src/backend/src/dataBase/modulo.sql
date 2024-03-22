CREATE DATABASE modulo;  
    
    
 CREATE TABLE users(
        idUser serial PRIMARY KEY not null,
        cedula VARCHAR(45) UNIQUE NOT NULL,
        nombre VARCHAR(500) NOT NULL,
        apellido VARCHAR(500) NOT NULL,
        telefono VARCHAR(11) NOT NULL,
        email VARCHAR(700) NOT NULL,
        genderiD INT NOT NULL,
        departmentId INT
    );

    CREATE TABLE gender(
        idgender SERIAL PRIMARY KEY NOT NULL,
        gender VARCHAR(10) NOT NULL
    );

    CREATE TABLE RequisitosDeCargo (
        idRequisitoDeCargo INT NOT NULL,
        tipoDerequisito VARCHAR(300) NOT NULL,
        contract_idcontract INT NOT NULL,
        department_iddepartment INT NOT NULL,
        contract_idcontract1 INT NOT NULL,
        contract_client_idclient INT NOT NULL,
        contract_client_user_idUser INT NOT NULL
    );


    CREATE TABLE cargo (
        idCargo INT NOT NULL,
        TipoDecargo VARCHAR(45) NOT NULL,
        contract_idcontract INT NOT NULL,
        RequisitosDeCargo_contract_idcontract INT NOT NULL,
        RequisitosDeCargo_department_iddepartment INT NOT NULL
        
    );


    CREATE TABLE cases (
        idcases SERIAL PRIMARY KEY not null,
        detallesDelCaso VARCHAR(500) NOT NULL,
        tipoDeCaso VARCHAR(45) NOT NULL,
        user_iduser INT NOT NULL,
        user_gender_idgender INT NOT NULL,
        user_department_iddepartment INT NOT NULL
    );


    CREATE TABLE contracts (
        idcontract SERIAL PRIMARY KEY not null,
        tipoDeContrato VARCHAR(45) NOT NULL,
        estatus VARCHAR(45) NOT NULL,
        fechaIniciada DATE NOT NULL,
        user_idusers INT NOT NULL,
        user_gender INT NOT NULL,
        user_departamentsid INT NOT NULL
    );

    CREATE TABLE contract_has_cases (
        idcontract_has_cases INT NOT NULL,
        contract_idcontract INT NOT NULL,
        cases_idcases INT NOT NULL,
        estatus VARCHAR(45) NOT NULL,
        fechaDeInicio VARCHAR(45) NOT NULL,
        fechaFinalizada DATE NOT NULL
    );

    CREATE TABLE departments (
        iddepartment SERIAL PRIMARY KEY not null,
        departamento VARCHAR(100) NOT NULL
    )

    INSERT INTO public.gender( gender)
        VALUES ( 'Masculino'),( 'Femenino');

    INSERT INTO public.departments(departamento)
        VALUES ( 'Planificacion'), ( 'Juridico'), ( 'Control Pt'), ( 'Encuestas'), ( 'Estadistica');


