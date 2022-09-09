import { HiOutlineShoppingBag } from "react-icons/hi"
import { Logo } from "./logo"
import { Menu } from "./menu"
export const Header = () => {
    return (
        <nav className="py-10 container">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <Logo />
                </div>
                <Menu />
            </div>
        </nav>
    )
}