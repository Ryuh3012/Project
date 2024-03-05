
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Avatar } from "@nextui-org/react";
import { Expedientes } from "./page/Expedientes/Expedientes";
import { Hola } from "./page/Expedientes/Hola";
import { Demandas } from "./page/Demandas/Demandas";



export const Navigation = () => {
    return (
        <div className='bg-[#d9dbe0]'>
            <Navbar
                className="bg-[#1f2458] text-white"
            >
                <NavbarBrand>
                    <p className="font-bold text-inherit">juridico</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem isActive>
                        <Link href='/Expedientex/' aria-current="page">
                            Expedientes
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className='text-white' color="foreground" href=''>
                            Demandas
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Avatar isBordered color="default" src="src\deshboard\page\Demanda\Demandas.jsx" />
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            {/* <Hola></Hola> */}
            {/* <Expedientes></Expedientes> */}
            <Demandas></Demandas>
        </div>
    )
}


