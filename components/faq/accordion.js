import { useEffect, useState } from "react"
import { HiMinus, HiPlus } from "react-icons/hi";
import { useTransition, animated } from "react-spring";

export const Accordion = ({data, inView}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const ACCORDION_TRANSTIONS = buildItemTransitions(data, activeIndex, setActiveIndex);
    
    const [accordionTransitions, accordionTransitionsApi] = useTransition(ACCORDION_TRANSTIONS, () => ({
        from: { opacity: 0.3 },
        enter: { opacity: 1 },
        delay: 200,
        config: {
        tension: 280,
        friction: 50,
        },
    }));

    useEffect(() => {
        if(inView)
        {
            accordionTransitionsApi.start();
        }
    }, [inView, activeIndex]);

    return (
        <div className="flex flex-col w-full border-t border-[#cab8b6]">
           {accordionTransitions(({ opacity }, item) => (
                <animated.div style={{ opacity: opacity.to(item.op), transform: opacity.to(item.trans).to((y) => `translate3d(0,${y}px,0)`)}}>
                    {item.component}
                </animated.div>
            ))}
        </div>
    )
}

const AccordionItem = ({question, answer, activeIndex, setActiveIndex, index}) => {
    return (
        <div className="border-b border-[#cab8b6]">
            <button className="flex items-center justify-between outline-none w-full text-2xl py-8 text-c-blue-100" onClick={() => {setActiveIndex(index)}}>
                <p className="font-medium">{question}</p>
                <span>{activeIndex == index?(<HiMinus />):(<HiPlus />)}</span>
            </button>
            <p className={`text-lg mb-9 text-neutral-300 ${activeIndex == index?"":"hidden"}`}>{answer}</p>
        </div>
    )
}

const buildItemTransitions = (items = [], activeIndex, setActiveIndex) => {
  const pt = [];
  items.forEach(({question, answer}, i) => {
    pt.push({
      component: <AccordionItem question={question} answer={answer} index={i} activeIndex={activeIndex} setActiveIndex={setActiveIndex} key={`accordion-${i}`} />,
      op: { output: [0.5, 1], range: [0.75, 1] },
      trans: { output: [70 + i * 30, 0], range: [0.75, 1] },
    });
  })
  return pt;
};
