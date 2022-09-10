import { useEffect } from "react"
import { useSpring, animated, useTransition } from "react-spring"

export const Logo = () => {
    const shapes = [
        "M35.0144 1.56198L32.9846 1.49953C15.2078 0.952547 0.5 15.2147 0.5 33C0.5 50.7853 15.2078 65.0475 32.9846 64.5005L35.0144 64.438C52.0007 63.9154 65.5 49.9943 65.5 33C65.5 16.0057 52.0007 2.08464 35.0144 1.56198Z",
        "M67.5429 3.81033L23.4414 0.622273C11.3181 -0.254112 1 9.34505 1 21.5C1 33.6549 11.3181 43.2541 23.4414 42.3777L67.5429 39.1897C76.8178 38.5192 84 30.7991 84 21.5C84 12.2009 76.8178 4.4808 67.5429 3.81033Z",
        "M85.5009 1.79718L23.499 1.21225C11.1076 1.09535 1 11.1081 1 23.5C1 35.8919 11.1076 45.9046 23.499 45.7877L85.501 45.2028C97.4072 45.0905 107 35.4068 107 23.5C107 11.5932 97.4072 1.9095 85.5009 1.79718Z",
        "M23.5054 0.516976L22.9943 0.50549C10.6536 0.228172 0.5 10.1562 0.5 22.5C0.5 34.8438 10.6536 44.7718 22.9943 44.4945L23.5054 44.483C35.4539 44.2145 45 34.4515 45 22.5C45 10.5485 35.4539 0.78548 23.5054 0.516976Z",
        "M37.5089 1.67609L19.2436 1.33784C9.22305 1.15228 1 9.22446 1 19.2467V23.0918C1 34.0104 12.0855 41.4324 22.1807 37.2728C25.7285 35.8109 29.7436 35.7497 33.3467 37.0694C43.7711 40.8874 55 33.2382 55 22.1367V19.4941C55 9.78044 47.2209 1.85594 37.5089 1.67609Z",
    ];
    const [animatedLogo, animatedLogoApi] = useSpring(() => ({
        from: {
        path: shapes[0],
        transform: "translate(0px, 0px) rotate(0deg) scale(0)",
        opacity: 0,
        wholeScale: "scale(1.6)",
        top: "60%",
        left: "45%",
        },
        to: [
        { path: shapes[0], transform: "translate(0px, 0px) rotate(0deg) scale(0.5)", left: "45%" },
        { path: shapes[0], transform: "translate(0px, 0px) rotate(0deg) scale(1)" },
        { path: shapes[1], transform: "translate(0px, 0px) rotate(0deg) scale(1)" },
        { path: shapes[2], transform: "translate(149px, 0px) rotate(0deg) scale(1)", opacity: 1 },
        { path: shapes[3], transform: "translate(255px, 0px) rotate(0deg) scale(1)" },
        { transform: "translate(265px, 0px) rotate(-45deg) scale(0.5)" },
        {
            path: shapes[0],
            transform: "translate(95px, 47px) rotate(200deg) scale(0.27)",
            wholeScale: "scale(1)",
        },
        {
            path: shapes[0],
            transform: "translate(105px, 47px) rotate(200deg) scale(0.17)",
            top: "8%",
            left: "5rem",
            wholeScale: "scale(0.7)",
        },
        ],
        config: {
        precision: 0.15,
        tension: 120,
        friction: 22,
        clamp: true,
        },
    }))

    const [logoLettersTransition, logoLettersTransitionApi] = useTransition(LOGO_LETTERS_TRANSITIONS, () => ({
        from: { opacity: 0.3 },
        enter: { opacity: 1 },
        delay: 1000,
        config: {
        tension: 280,
        friction: 50,
        },
    }));

    useEffect(() => {
      logoLettersTransitionApi.start()
      animatedLogoApi.start()
    }, [animatedLogoApi])
    

    return (
        <animated.div className="absolute w-60 z-50" style={{ top: animatedLogo.top, left: animatedLogo.left }}>
            <animated.div className="relative recoleta flex items-center">
                <div className="recoleta flex text-[2.5rem] leading-none" style={{ opacity: animatedLogo.opacity, position: "absolute", scale: "scale(0.1)" }}>
                    
                    {logoLettersTransition(({ opacity }, item) => (
                        <animated.div style={{ opacity: opacity.to(item.op), transform: opacity.to(item.trans).to((x) => `translate3d(${x}px,0,0)`), }}>
                            {item.component}
                        </animated.div>
                    ))}
                    
                </div>
                {/* <div className="w-2.5 h-2.5 mt-[12px] ml-1 bg-primary rounded-full"></div> */}
                <animated.svg
                    width="133"
                    height="68"
                    viewBox="0 0 133 68"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        transform: animatedLogo.transform,
                        transformOrigin: "top left",
                        position: "absolute",
                    }}
                    >
                    <animated.path d={animatedLogo.path} fill="#F5683C" />
                </animated.svg>
            </animated.div>
        </animated.div>
    )
}

const LOGO_LETTERS_TRANSITIONS = [
  {
    component: <p>G</p>,
    op: { output: [0, 1], range: [0.75, 1] },
    trans: { output: [10, 0], range: [0.75, 1] },
  },
  {
    component: <p>l</p>,
    op: { output: [0, 1], range: [0.75, 1] },
    trans: { output: [40, 0], range: [0.75, 1] },
  },
  {
    component: <p>o</p>,
    op: { output: [0, 1], range: [0.75, 1] },
    trans: { output: [70, 0], range: [0.75, 1] },
  },
  {
    component: <p>w</p>,
    op: { output: [0, 1], range: [0.75, 1] },
    trans: { output: [100, 0], range: [0.75, 1] },
  },
];