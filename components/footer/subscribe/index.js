import { FiSend } from "react-icons/fi"
export const Subscribe = ({title, description}) => {
    return (
        <div className="space-y-6 pl-6">
            {/* Title */}
            <h4 className="text-lg leading-none">{title || "Subscribe"}</h4>
            <div className="space-y-5">
            {/* Description */}
            <p className="text-base font-normal">{description || "Get 10% off your first order"}</p>
            {/* Form */}
            <div className="h-16 flex items-center justify-between rounded-full bg-light-blue">
                <input className="rounded-l-full w-full bg-transparent outline-none h-full px-4" placeholder="Enter your email" />
                <button className="w-16 shrink-0 h-16 flex items-center justify-center rounded-full bg-primary border border-white text-xl"><FiSend /></button>
            </div>
            </div>
        </div>
    )
}