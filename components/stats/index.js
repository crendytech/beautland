import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTransition, animated } from "react-spring";
import { useAnimateImageBorder, useAnimateImageWithBorder } from "../../hooks/animation";
export const Statistics = () => {
    const [imageAnimation, imageAnimationApi] = useAnimateImageWithBorder();
    const [bgAnimation, bgAnimationApi] = useAnimateImageBorder();
    const [statBlockTransitions, statBlockTransitionsApi] = useTransition(STATISTICS_BLOCK_TRANSITIONS, () => ({
        from: { opacity: 0.3 },
        enter: { opacity: 1 },
        delay: 100,
        config: {
            tension: 280,
            friction: 80,
        },
        })
    );

    const STATISTICS_TRANSITIONS = [
    {
        component: <Title />,
        op: { output: [0.5, 1], range: [0.75, 1] },
        trans: { output: [100, 0], range: [0.75, 1] },
    },
    {
        component: <Description />,
        op: { output: [0.5, 1], range: [0.75, 1] },
        trans: { output: [200, 0], range: [0.75, 1] },
    },
    {
        component: <StatisticBlock statBlockTransitions={statBlockTransitions} />,
        op: { output: [0.2, 1], range: [0.75, 1] },
        trans: { output: [300, 0], range: [0.75, 1] },
    },
];

    const [statisticsTransition, statisticsTransitionApi] = useTransition(STATISTICS_TRANSITIONS, () => ({
        from: { opacity: 0.3 },
        enter: { opacity: 1 },
        delay: 100,
        config: {
        tension: 280,
        friction: 80,
        },
    }));

    const { ref, inView } = useInView({
        threshold: 0.5,
    });
    useEffect(() => {
        if (inView) {
            imageAnimationApi.start({ transform: "scale(1)" });
            bgAnimationApi.start({ transform: "translateY(-60%) scale(1)" });
            statisticsTransitionApi.start();
            statBlockTransitionsApi.start();
        }
    }, [bgAnimationApi, imageAnimationApi, inView]);

    return (
        <div ref={ref} className="grid grid-cols-10">
            <div className="col-span-7 flex items-center bg-[#ffe5de] py-40">
                <div className="w-[70%] mx-auto">
                    {statisticsTransition(({ opacity }, item) => (
                        <animated.div style={{ opacity: opacity.to(item.op), transform: opacity.to(item.trans).to((y) => `translate3d(0,${y}px,0)`) }}>
                            {item.component}
                        </animated.div>
                    ))}
                </div>
            </div>
            <div className="col-span-3 relative h-full">
                <animated.div style={bgAnimation}  className="w-[420px] h-[90%] top-[5%] absolute overflow-hidden flex items-end bg-[#f6866a] left-[-150px] rounded-full">
                    <animated.img style={imageAnimation} src={`/static/images/woman.png`} alt="" className="rounded-t-full h-full object-cover object-bottom"  />
                </animated.div>
            </div>
        </div>
        
    )
}

const SingleStatBlock = ({label, value}) => {
    return (
        <div className="relative flex justify-center items-center">
            <div className="h-36 w-52 rounded-full -rotate-[60deg]" style={{ background: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 229, 222, 0) 70%)" }}></div>
            <div className="text-center absolute top-[10%] right-[50%] translate-x-[55%]">
                <p className="mb-3 w-20">{label}</p>
                <p className="text-primary text-4xl recoleta">{value}</p>
            </div>
        </div>
    )
}

const StatisticBlock = ({statBlockTransitions}) => {
    return  (
        <div className="w-full flex items-center justify-start -space-x-10 ">
            {statBlockTransitions(({ opacity }, item) => (
                <animated.div style={{ opacity: opacity.to(item.op), transform: opacity.to(item.trans).to((x) => `translate3d(${x}px,0,0)`), }}>
                    {item.component}
                </animated.div>
            ))}
        </div>
    )
}

const Title = () => {
    return (
        <h2 className="recoleta text-[4rem] leading-snug text-faint-blue mb-10 w-[80%]">We make going all natural <span className="text-primary">Beauty</span>.</h2>
    )
}

const Description = () => {
    return (
        <div className="w-[70%] mb-12 mt-3">
            <p className="text-lg text-neutral-300">Made with nature&apos;s best ingredients — our products&apos; transparent ingredient list allow you to know.</p>
        </div>
    )
}

const stats = [
    {label: "Product Users", value: "7M+"},
    {label: "Brand Product", value: "99+"},
    {label: "Product Reviews", value: "7M"}
]
const buildStatisticsTransitions = (stats = []) => {
  const pt = [];
  stats.forEach((product, i) => {
    pt.push({
      component: <SingleStatBlock label={product.label} value={product.value} />,
      op: { output: [0.5, 1], range: [0.75, 1] },
      trans: { output: [-100 * (i+1), 0], range: [0.75, 1] },
    });
  })
  return pt;
};

const STATISTICS_BLOCK_TRANSITIONS = buildStatisticsTransitions(stats);