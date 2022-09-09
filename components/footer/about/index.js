import Link from "next/link"
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"

export const About = () => {
    return (
        <div className="flex flex-col space-y-7">
            <div className="flex items-start space-x-1">
                <p className="text-4xl leading-none recoleta">Glow</p>
                <div className="w-[10px] h-[10px] mt-[10px] bg-primary rounded-full" />
            </div>
            <p className="capitalize font-normal">Keep Up With Our New Releases Beauty Tips And What emma&apos;s been up to.</p>
            <ul className="flex list-none space-x-4 items-center">
                <li><Link href={`#`}><a className="text-xl leading-none"><FaFacebookF /></a></Link></li>
                <li><Link href={`#`}><a className="text-xl leading-none"><FaInstagram /></a></Link></li>
                <li><Link href={`#`}><a className="text-xl leading-none"><FaTwitter /></a></Link></li>
                <li><Link href={`#`}><a className="text-xl leading-none"><FaLinkedin /></a></Link></li>
            </ul>
        </div>
    )
}