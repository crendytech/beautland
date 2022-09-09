/* eslint-disable @next/next/no-img-element */
import Quicklinks from "./quicklinks"
import { Subscribe } from "./subscribe"
import { About } from "./about"
import { Products } from "./products"

import widgets from "../../data/quicklinks.json"
import { useInView } from "react-intersection-observer"
import { useTransition, animated } from "react-spring"
import { useEffect } from "react"

export const Footer = () => {
    const [widgetTansitions, widgetTansitionsApi] = useTransition(WIDGET_TRANSITIONS, () => ({
        from: { opacity: 0.3 },
        enter: { opacity: 1 },
        delay: 100,
        config: {
            tension: 280,
            friction: 80,
        },
    })
    );

    const { ref, inView } = useInView({
        threshold: 0.5,
    });

    useEffect(() => {
        if (inView) {
            widgetTansitionsApi.start();
        }
    }, [inView]);

    return (
        <div ref={ref} className="pt-36 bg-deep-blue relative mt-[180px] text-white">
            <div className="absolute top-[-144px] w-full">
                <div className="container">
                    <Products inView={inView} />
                </div>
            </div>
            <div className="container">
                <div className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-8 lg:gap-x-10 mt-40">
                        {/* About Column */}
                        <div className="col-span-2">
                            <About />
                        </div>
                        {/* Widget */}
                        <div className="lg:col-span-6 grid lg:gap-x-8 grid-cols-1 lg:grid-cols-5 overflow-hidden">
                            {widgetTansitions(({ opacity }, item) => (
                                <animated.div style={{ opacity: opacity.to(item.op), transform: opacity.to(item.trans).to((y) => `translate3d(0,${y}px,0)`),}} className={item.className} >
                                    {item.component}
                                </animated.div>
                            ))}
                        </div>
                    </div>
                    <picture className="w-36 h-36 absolute bottom-[-150px] left-[-20px] rotate-[25deg] z-50 opacity-[0.05] overflow-hidden">
                        <source srcSet="/static/images/flower.svg" type="image/svg" />
                        <img src="/static/images/flower.svg" alt="" />
                    </picture>
                    <div>

                    </div>
                </div>
                <div className="flex justify-center relative mt-32">
                    <div className="border-t-2 py-10 px-10 border-white-pa-5 text-white-pa-2 border-light-grey">
                        <p>Copyright @ 2022 Musemind | All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const buildFooterWidgetTranstions = (widgets = []) => {
  const pt = [];
  widgets.forEach(({label, value}, i) => {
    pt.push({
      component: i == 3?(<Subscribe />):(<Quicklinks title={label} links={value} />),
      op: { output: [0.5, 1], range: [0.75, 1] },
      trans: { output: [70 + i * 60, 0], range: [0.75, 1] },
      className: i == 3?"lg:col-span-2":""
    });
  })
  return pt;
};

const WIDGET_TRANSITIONS = buildFooterWidgetTranstions(widgets);