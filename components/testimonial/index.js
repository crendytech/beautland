import Image from "next/image"
import {ImQuotesLeft} from "react-icons/im"
import { useSpring, useTransition, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { useAnimateImageBorder, useAnimateImageWithBorder } from "../../hooks/animation";
import { useEffect } from "react";

export const Testimonial = () => {
    const [imageAnimation, imageAnimationApi] = useAnimateImageWithBorder();
    const [bgAnimation, bgAnimationApi] = useAnimateImageBorder();

    const [quoteAnimation, quoteAnimationApi] = useSpring(() => ({
        from: { opacity: 0, top: "100px" },
        to: { opacity: 1, top: "0" },
        delay: 1500,
        config: {
            tension: 280,
            friction: 50,
        },
    }));

    const { ref, inView } = useInView({
        threshold: 0.5,
    });
    
    useEffect(() => {
        if (inView) {
            quoteAnimationApi.start();
            bgAnimationApi.start({ transform: "translateY(-60%) scale(1)" });
            imageAnimationApi.start({ transform: "scale(1)" });
        }
    }, [bgAnimationApi, imageAnimationApi, inView, quoteAnimationApi])
    

    return (
        <div ref={ref} className="relative container w-full h-[500px]">
            <div className="bg-white py-20 opacity-100 w-10/12 px-20">
                <animated.div style={quoteAnimation} className="space-y-14">
                    <div className="space-y-10">
                        <span className="text-8xl text-primary"><ImQuotesLeft /></span>
                        <p className="text-3xl recoleta text-c-blue-100 w-2/3">The UK Jewelery awards is an event we always look forward to and we are so honoured to be recognised.</p>
                    </div>
                    <div>
                        <p className="text-d-blue text-2xl mb-2">Jane Cooper</p>
                        <p className="text-neutral-300">Nashville, USA</p>
                    </div>
                </animated.div>
                <div className="flex items-center justify-end mr-auto space-x-2 w-[72%]">
                    <div className="border border-primary w-4 h-4 cursor-pointer"></div>
                    <div className="border border-primary bg-primary w-4 h-4 cursor-pointer"></div>
                    <div className="border border-primary w-4 h-4 cursor-pointer"></div>
                </div>
            </div>
                <div className="rounded-full w-[350px] h-[350px]  absolute right-20 top-[65px]">
                    <animated.div style={bgAnimation} className="w-[350px] overflow-hidden h-[350px] bg-[#f6866a] border-[10px] border-[#f7f4ef] absolute right-0 rounded-full">
                        <animated.img style={imageAnimation} src={`/static/images/testimonial.png`} alt="" className="w-full h-full ml-5 rounded-t-full object-cover object-bottom" />
                    </animated.div>
                </div>
        </div>
    )
}