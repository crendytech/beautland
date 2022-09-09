import Link from "next/link"
import { getRandomInt } from "../../../utils/stringUtil"

const Quicklinks = ({title, links}) => {
    return (
    <div className="space-y-6">
            {/* Title */}
        <h4 className="text-lg leading-none font-normal">{title || "Menu Title"}</h4>
        
         {/* Description */}
         {links && Array.isArray(links) && links.length > 0?(
            <ul className="space-y-4 list-none">
                {links.map((link, i) => {
                    return (
                        <LinkItem key={`ql-${i}-${getRandomInt(100)}`} href={link?.href} label={link?.label} />
                    )
                })}
         </ul>
         ):(
            <div>No Link Found. Please enter a link</div>
         )}
        
    </div>
    )
}

const LinkItem = ({label, href}) => {
    return (
        <li>
            <Link href={href || `#`}><a className="">{label || "Sample link"}</a></Link>
        </li>
    )
}

export default Quicklinks;