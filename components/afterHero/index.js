/* eslint-disable @next/next/no-img-element */
import { useInView } from "react-intersection-observer";
import { useSpring, useTransition, animated } from "react-spring";
import { MdPlayArrow } from "react-icons/md"
import { useEffect } from "react";

const AfterHero = () => {
    const videoAnimation = useSpring({
        from: { opacity: 0, top: "100px" },
        to: { opacity: 1, top: "0%" },
        delay: 2000,
        config: {
        tension: 280,
        friction: 80,
        },
    });
    const [transpaneAnimation, transpaneAnimationApi] = useSpring(() => ({
        transform: "scale(0.3)",
        config: {
        tension: 280,
        friction: 70,
        },
    }));
    const [bgAnimation, bgAnimationApi] = useSpring(() => ({
        transform: "translateY(-60%) scale(1.0)",
        top: "60%",
        config: {
        tension: 280,
        friction: 70,
        },
    }));
    const [imgAnimation, imgAnimationApi] = useSpring(() => ({
        transform: "scale(1.0)",
        config: {
        tension: 280,
        friction: 60,
        },
    }));

    const [aftheroTransitions, aftheroTransitionsApi] = useTransition(AFTER_HERO_TRANSITION, () => ({
        from: { opacity: 0.45 },
        enter: { opacity: 1 },
        delay: 100,
        config: {
        tension: 280,
        friction: 50,
        },
    }));

    const { ref, inView } = useInView({
        threshold: 0.4,
    });

    useEffect(() => {
    if (inView) {
      transpaneAnimationApi.start({ transform: "scale(1)" });
      imgAnimationApi.start({ transform: "scale(1.15)" });
      bgAnimationApi.start({ transform: "translateY(-60%) scale(1)" });
      aftheroTransitionsApi.start();
    }
  }, [bgAnimationApi, imgAnimationApi, transpaneAnimationApi, inView]);

    return (
        <div ref={ref} className="relative border-green-600">
            <img src={`/static/images/flower.svg`} alt="" className="w-[250px] h-auto absolute top-[-170px] left-[-20px] rotate-[110deg] z-50" />
            <div className="relative container top-[-70px]">
                <animated.div className="absolute right-[5rem] z-30" style={videoAnimation}>
                    <Video />
                </animated.div>
            </div>
            <div className="grid grid-cols-3 relative">
                <div className="col-span-1 relative">
                     <div className="absolute top-[10%] right-[-130px] z-30">
                        <animated.div style={transpaneAnimation}>
                            <div className="transpane w-[135px] h-[135px] rounded-full border flex items-center justify-center relative">
                                <img src={`/static/images/explore.svg`} alt="" className="w-full h-full" />
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA0MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjc1IDEuNUwyMC43NSA1MSIgc3Ryb2tlPSIjRjU2ODNDIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNMjEgNTFDMjEuOTUyNCA0NS42NjY3IDI3LjI4NTcgMzUgNDEgMzUiIHN0cm9rZT0iI0Y1NjgzQyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTIxIDUxQzIwLjA0NzYgNDUuNjY2NyAxNC43MTQzIDM1IDEgMzUiIHN0cm9rZT0iI0Y1NjgzQyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==" width={100} height={100} alt="explore product" className="w-[40%] h-[40%] absolute" />
                            </div>
                        </animated.div>
                    </div>
                    <animated.div style={bgAnimation} className="w-full overflow-hidden h-[85%] bg-[#b7abd9]/80 absolute right-[-150px] top-0 rounded-t-full">
                        <animated.img style={imgAnimation} src={`/static/images/curiology.jpeg`} alt="products" className="w-full h-full ml-5 rounded-t-full object-cover object-bottom" />
                    </animated.div>
                </div>
                <div className="col-span-2 pt-60 pb-48 pl-64 bg-c-purple-100">
                    <div className="w-[80%]">
                        {aftheroTransitions(({ opacity }, item) => (
                            <animated.div
                                style={{ opacity: opacity.to(item.op), transform: opacity.to(item.trans).to((y) => `translate3d(0,${y}px,0)`)}} >
                                {item.component}
                            </animated.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Video = () => {
    return (
        <div className="relative">
            <div className="absolute top-[-4rem] left-[-4rem]" style={{ zIndex: 40, transform: "scale(1)" }}>
                <div className="relative">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTY2IiBoZWlnaHQ9IjE2NiIgdmlld0JveD0iMCAwIDE2NiAxNjYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik05OS45ODUzIDQzLjg4NjJMMTM5LjcyNiAyNi4yNzQ1TDEyMi4xMTQgNjYuMDE0N0wxMjEuNjg4IDY2Ljk3NDhMMTIyLjY2OCA2Ny4zNTI4TDE2My4yMjIgODNMMTIyLjY2OCA5OC42NDcyTDEyMS42ODggOTkuMDI1MkwxMjIuMTE0IDk5Ljk4NTNMMTM5LjcyNiAxMzkuNzI2TDk5Ljk4NTMgMTIyLjExNEw5OS4wMjUyIDEyMS42ODhMOTguNjQ3MiAxMjIuNjY4TDgzIDE2My4yMjJMNjcuMzUyOCAxMjIuNjY4TDY2Ljk3NDggMTIxLjY4OEw2Ni4wMTQ3IDEyMi4xMTRMMjYuMjc0NSAxMzkuNzI2TDQzLjg4NjIgOTkuOTg1M0w0NC4zMTE3IDk5LjAyNTJMNDMuMzMyIDk4LjY0NzJMMi43Nzc5OSA4M0w0My4zMzIgNjcuMzUyOEw0NC4zMTE3IDY2Ljk3NDhMNDMuODg2MiA2Ni4wMTQ3TDI2LjI3NDUgMjYuMjc0NUw2Ni4wMTQ3IDQzLjg4NjJMNjYuOTc0OCA0NC4zMTE3TDY3LjM1MjggNDMuMzMyTDgzIDIuNzc3OTlMOTguNjQ3MiA0My4zMzJMOTkuMDI1MiA0NC4zMTE3TDk5Ljk4NTMgNDMuODg2MloiIGZpbGw9IiNGNTY4M0MiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K" alt="star" className="rotate-continuously w-36 h-36" />
                    <p className="text-white text-lg absolute top-[3.5rem] left-[3.5rem] -rotate-[30deg]">New</p>
                </div>
            </div>
            <div className="border-[4px] border-white w-80 h-[170px] bg-[#c0b3df] relative flex items-center justify-center" style={{ transform: "none" }}>
                <img src={`/static/images/video.jpeg`} alt="video" className="w-full h-full object-cover" />
                <div className="w-14 h-14 bg-white flex items-center justify-center rounded-full absolute center-flex text-4xl text-[#37316e]">
                    <MdPlayArrow />    
                </div>
            </div>
        </div>
    )
}

const Title = () => {
    return (
        <h3 className="recoleta text-[3rem] leading-tight text-c-blue-100 mb-14">The self care brand that&apos;s setting a new
            <span className="text-primary"> standard Clean</span> products.
        </h3>
    )
}

const Questions = () => {
    return (
        <div className="grid grid-cols-2 gap-x-5">
            <div className="w-[90%]">
                <h4 className="text-xl text-c-blue-100 font-medium w-52 leading-tight mb-5">Where are products made?</h4>
                <p className="text-neutral-300 font-medium text-base">Many brands especially in period care, carry products that take centuries.</p>
            </div>
            <div className="w-[90%]">
                <h4 className="text-xl text-c-blue-100 font-medium w-52 leading-tight mb-5">Where are products made?</h4>
                <p className="text-neutral-300 font-medium text-base">Many brands especially in period care, carry products that take centuries.</p>
            </div>
        </div>
    )
}

const AFTER_HERO_TRANSITION = [
  {
    component: <Title />,
    op: { output: [0.5, 1], range: [0.75, 1] },
    trans: { output: [270, 0], range: [0.75, 1] },
  },
  {
    component: <Questions />,
    op: { output: [0.5, 1], range: [0.75, 1] },
    trans: { output: [450, 0], range: [0.75, 1] },
  },
];

export default AfterHero;