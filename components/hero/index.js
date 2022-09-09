/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { BsArrowRight } from "react-icons/bs"
import { MdPlayArrow } from "react-icons/md"
import { useInView } from "react-intersection-observer";
import { useTransition, animated, useSpring } from "react-spring";

export const Hero = () => {
    const [heroTransitions, heroTransitionsApi] = useTransition(HERO_TRANSITIONS, () => ({
        from: { opacity: 0 },
        enter: { opacity: 1 },
        delay: 2200,
        config: {
        tension: 280,
        friction: 80,
        },
    }));

    const imageAnimation = useSpring({
        from: { opacity: 0.7, top: "-700px" },
        to: { opacity: 1, top: "60px" },
        delay: 3200,
        config: {
        tension: 280,
        friction: 100,
        },
    });

    const { ref, inView } = useInView({
        threshold: 0.4,
    });

    useEffect(() => {
        if (inView) {
            heroTransitionsApi.start();
        }
    }, [inView]);
    
    return (
        <div ref={ref} className="container flex items-start justify-between relative">
            <div className="w-[51%] pt-28">
                {heroTransitions(({ opacity }, item) => (
                    <animated.div
                        style={{ opacity: opacity.to(item.op), transform: opacity.to(item.trans).to((y) => `translate3d(0,${y}px,0)`) }}>
                        {item.component}
                    </animated.div>
                ))}
            </div>
            <div className="hero-image top-0 w-[49%] h-full">
                <div className="relative w-full h-full">
                    <animated.div style={imageAnimation}>
                        <animated.img src="/static/images/hero.png" alt="" className="h-full w-full object-cover object-bottom" />
                    </animated.div>
                </div>
            </div>
        </div>
    )
}

const Title = () => {
    return (
        <div>
            <h1 className="recoleta text-[6rem] text-deep-blue leading-tight">Let your skin</h1>
            <div className="flex flex-wrap items-center space-x-4">
                <h1 className="recoleta text-[6rem] text-deep-blue leading-tight">Going</h1>
                <div className=" h-20 w-36 rounded-full relative bg-[#a294cd] flex items-center justify-center overflow-hidden">
                    <div className="absolute z-20 border-[2px] border-white rounded-[95px] w-[88%] h-[87.5%] mx-auto"></div>
                    <img className="absolute z-10 rounded-[95px] w-full h-full object-contain object-center scale-x-[-1.5] scale-y-[1.5]" src="/static/images/testimonial.png" alt="image" />
                </div>
                <h1 className="recoleta text-[6rem] text-deep-blue leading-tight">Out.</h1>
            </div>
        </div>
    )
}

const Subtitle = () => {
    return (
         <div className="w-[52%] mb-12 mt-3">
            <p className="text-lg text-neutral-300">We want to bring to the world through our products that very special feeling joy, healthy and positive energy.</p>
        </div>
    )
}

const Cta = () => {
    return (
        <div className="flex items-center justify-start space-x-4">
            <button className="py-4 px-6 flex items-center justify-between rounded-full bg-primary text-white space-x-1">
                <span className="text-lg">Shop Now</span>
                <BsArrowRight size={18} />
            </button>
            <button className="py-4 flex items-center justify-between text-black space-x-2">
                <MdPlayArrow size={22} />
                <span className="text-lg">How to use</span>
            </button>
        </div>
    )
}

const HERO_TRANSITIONS = [
  {
    component: <Title />,
    op: { output: [0.5, 1], range: [0.75, 1] },
    trans: { output: [100, 0], range: [0.75, 1] },
  },
  {
    component: <Subtitle />,
    op: { output: [0.5, 1], range: [0.75, 1] },
    trans: { output: [200, 0], range: [0.75, 1] },
  },
  {
    component: <Cta />,
    op: { output: [0.5, 1], range: [0.75, 1] },
    trans: { output: [300, 0], range: [0.75, 1] },
  },
];