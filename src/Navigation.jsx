
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Avatar } from "@nextui-org/react";
import { Demandas } from "./page/deshboard/Demandas/Demandas";
import { Expedientes } from "./page/deshboard/Expedientes/Expedientes";
import { BrowserRouter, Routes, Route, Navigate, NavLink } from "react-router-dom";




const Navigation = () => {
    return (
        <BrowserRouter>
            <div className='bg-[#d9dbe0]'>
                <Navbar
                    className="bg-[#1f2458] text-white"
                >
                    <NavbarBrand>
                        <p className="font-bold text-inherit">juridico</p>
                    </NavbarBrand>
                    <NavbarContent className="hidden sm:flex gap-4" justify="center">
                        <NavbarItem isActive>
                            <NavLink className={({ isActive }) => isActive ? 'font-bold' : 'text-white font-light'} to='/'>
                                Expedientes
                            </NavLink>
                        </NavbarItem>
                        <NavbarItem>
                            <NavLink className={({ isActive }) => isActive ? 'font-bold' : 'text-white font-light'} to='/demandas'>
                                Demandas
                            </NavLink>
                        </NavbarItem>
                    </NavbarContent>
                    <NavbarContent justify="end">
                        <NavbarItem className="hidden lg:flex">
                            <Avatar isBordered color="default" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
            </div>
            <Routes>
                <Route path="/" element={<Expedientes />} />
                <Route path="/demandas" element={<Demandas />} />
                <Route path="*" element={<Navigate to={'/'} replace={true} />} />
            </Routes>
        </BrowserRouter>

    )
}
export default Navigation


