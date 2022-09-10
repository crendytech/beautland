import { animated, useTransition } from "react-spring";
import { useInView } from "react-intersection-observer";
import { useAnimateImageBorder, useAnimateImageWithBorder } from "../../hooks/animation";
import { useEffect } from "react";
import faqs from "../../data/faqs.json"
import { Accordion } from "./accordion";

export const Faq = () => {
    const [imageAnimation, imageAnimationApi] = useAnimateImageWithBorder();
    const [bgAnimation, bgAnimationApi] = useAnimateImageBorder();

    const [tiTransitions, tiTransitionsApi] = useTransition(TITLE_TRANSITIONS, () => ({
        from: { opacity: 0.3 },
        enter: { opacity: 1 },
        config: {
            tension: 280,
            friction: 80,
        },
        })
    );
   

    const { ref, inView } = useInView({
        threshold: 0.3,
    });
    useEffect(() => {
        if (inView) {
            bgAnimationApi.start({ transform: "translateY(0%) scale(1)" });
            imageAnimationApi.start({ transform: "scale(1)" });
            tiTransitionsApi.start();
        }
    }, [bgAnimationApi, imageAnimationApi, inView]);

    return (
        <section ref={ref} className="relative pt-40 pb-36">
            <picture className="absolute top-[-70px] right-[-50px] rotate-[120deg] z-50 scale-[-1]">
                <source srcSet="/static/images/flower.svg" type="image/svg" />
                <img src="/static/images/flower.svg" className="w-[200px] h-auto" alt="" />
            </picture>
            <div className="container">
                <div className="flex items-center justify-between relative space-x-10">
                    <div className="relative w-[80%]">
                        <animated.div style={bgAnimation} className="w-[470px] h-[600px] bg-[#b7abd9] rounded-t-full">
                            <animated.img style={imageAnimation} width={470} height={600} src="/static/images/footer-1.png" alt="hand up" className="w-full h-full ml-5 rounded-t-full object-cover object-bottom" />
                        </animated.div>
                    </div>
                    <div className="">
                        <div className="w-[95%]">
                            {tiTransitions(({ opacity }, item) => (
                                <animated.div style={{ opacity: opacity.to(item.op), transform: opacity.to(item.trans).to((y) => `translate3d(0,${y}px,0)`) }}>
                                    {item.component}
                                </animated.div>
                            ))}
                            <Accordion data={faqs} inView={inView} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Title = () => {
    return (
        <h2 className="recoleta text-[4rem] leading-normal text-c-blue-100 mb-10 w-full">You have <span className="text-primary">questions,</span> we have answers.</h2>
    )
}

const TITLE_TRANSITIONS = [
  {
    component: <Title />,
    op: { output: [0.5, 1], range: [0.75, 1] },
    trans: { output: [100, 0], range: [0.75, 1] },
  },
];