import { HiOutlineShoppingBag } from "react-icons/hi"

export const Cart = () => {
    return (
        <button className="relative">
            <div className="outline-none bg-primary w-11 h-11 rounded-full">
                <div className="flex w-full h-full items-center justify-center text-white text-lg">
                    <HiOutlineShoppingBag />
                </div>
            </div>
            <div className="absolute top-[-4px] right-[-4px]">
                <div className="bg-deep-blue border-[1px] border-white rounded-full w-5 h-5 flex justify-center items-center">
                    <p className="text-white text-xs">1</p>
                </div>
            </div>
        </button>
    )
}