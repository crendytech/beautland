import Image from "next/image"
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, useTransition, animated } from "react-spring";
import partners from "../../data/partners.json"

export const Partners = () => {

    const [partnersTransitions, partnersTransitionsApi] = useTransition(PARTNERS_TRANSITION, () => ({
        from: { opacity: 0.3 },
        enter: { opacity: 1 },
        delay: 200,
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
            partnersTransitionsApi.start();
        }
    }, [inView]);

    return (
        <div ref={ref} className="container grid grid-cols-5 gap-x-28 items-center py-32">
            {partnersTransitions(({ opacity }, item) => (
              <animated.div style={{ opacity: opacity.to(item.op), transform: opacity.to(item.trans).to((x) => `translate3d(${x}px,0,0)`) }}>
                {item.component}
              </animated.div>
            ))}
        </div>
        )
}
const Partner = ({image, name}) => {
    return (
        <Image src={image || "/static/images/footer-1.png"} width={150} height={57} layout="intrinsic" alt={name || ""} className="w-full h-full object-scale-down object-center" />
    )
}

const buildPartnersTransitions = (partners = []) => {
  const pt = [];
  partners.forEach(({imageUrl, name}, i) => {
    pt.push({
      component: <Partner image={imageUrl} name={name} />,
      op: { output: [0.5, 1], range: [0.75, 1] },
      trans: { output: [80 + i * 80, 0], range: [0.75, 1] },
    });
  })
  return pt;
};


const PARTNERS_TRANSITION = buildPartnersTransitions(partners.slice(0, 5))