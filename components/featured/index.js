/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs"
import { HiOutlineHeart, HiShoppingBag } from "react-icons/hi";
import { useInView } from "react-intersection-observer";
import { useTransition, animated } from "react-spring";
import products from "../../data/products.json";

export const Featured = () => {
    const [productsTransitions, productsTransitionsApi] = useTransition(PRODUCTS_TRANSITIONS, () => ({
        from: { opacity: 0.3 },
        enter: { opacity: 1 },
        delay: 200,
        config: {
        tension: 280,
        friction: 50,
        },
    }));
    const [ibTransitions, ibTransitionsApi] = useTransition(TITLE_TRANSITIONS, () => ({
        from: { opacity: 0.3 },
        enter: { opacity: 1 },
        config: {
            tension: 280,
            friction: 80,
        },
        })
    );

    const { ref, inView } = useInView({
        threshold: 0.4,
    });
    useEffect(() => {
        if (inView) {
            ibTransitionsApi.start();
            productsTransitionsApi.start();
        }
    }, [inView]);

    return (
        <div ref={ref} className="container py-40 relative">
            <div className="w-full grid grid-cols-3 gap-x-5 gap-y-7 items-start">
                <div className="space-y-6 pt-6">
                    {ibTransitions(({ opacity }, item) => (
                        <animated.div style={{ opacity: opacity.to(item.op), transform: opacity.to(item.trans).to((y) => `translate3d(0,${y}px,0)`) }}>
                            {item.component}
                        </animated.div>
                    ))}
                </div>
                {productsTransitions(({ opacity }, item) => (
                    <animated.div style={{ zIndex: 40, opacity: opacity.to(item.op), transform: opacity.to(item.trans).to((x) => `translate3d(${x}px,0,0)`) }}>
                        {item.component}
                    </animated.div>
                ))}
            </div>
        </div>
    )
}

const Title = () => {
    return (
        <h2 className="recoleta text-[4rem] leading-tight">Trending On <span className="text-primary">Essentials</span></h2>
    )
}

const Subtitle = () => {
    return (
        <p className="text-neutral-300 text-lg w-[90%]">Made with nature&apos;s best ingredients ??? our products&apos; transparent ingredient. Fear of God Essentials.</p>
    )
}

const Cta = () => {
    return (
        <button className="mt-8 py-4 px-7 flex items-center justify-between rounded-full bg-transparent border border-primary text-primary space-x-1">
            <span className="text-lg">Browse All Products</span>
            <BsArrowRight />
        </button>
    )
}

const ProductCard = ({title, image, price}) => {
    const [active, setActive] = useState(false)
    return (
        <div className="flex flex-col space-y-4" onMouseEnter={() => {setActive(true)}} onMouseLeave={() => {setActive(false)}}>
        <div className="bg-white w-full rph flex justify-center item-center">
            <img src={`/static/images/${image}`} alt="product" className=" mx-auto object-scale-down scale-[0.7]" />
            {active && <CardButtons />}
        </div>
            <Link href={`#`}>
                <a className="text-center space-y-2 mt-3">
                    <p className="recoleta text-xl">{title}</p>
                    <p className="text-neutral-300 text-base">${price}</p>
                </a>
            </Link>
        </div>
    )
}

const CardButtons = () => (
  <div className="flex flex-col items-center justify-center space-y-3 absolute right-[25px] bottom-[105px]">
    <div className="outline-none bg-primary text-white w-11 h-11 rounded-full">
      <div className="flex w-full h-full items-center justify-center">
        <HiShoppingBag size={24} />
      </div>
    </div>
    <div className="outline-none bg-white border border-primary text-primary w-11 h-11 rounded-full">
      <div className="flex w-full h-full items-center justify-center">
        <HiOutlineHeart size={24} />
      </div>
    </div>
  </div>
);

const TITLE_TRANSITIONS = [
  {
    component: <Title />,
    op: { output: [0.5, 1], range: [0.75, 1] },
    trans: { output: [100, 0], range: [0.75, 1] },
  },
  {
    component: <Subtitle />,
    op: { output: [0.5, 1], range: [0.75, 1] },
    trans: { output: [250, 0], range: [0.75, 1] },
  },
  {
    component: <Cta />,
    op: { output: [0.5, 1], range: [0.75, 1] },
    trans: { output: [400, 0], range: [0.75, 1] },
  },
];

const buildProductTranstions = (products = []) => {
  let gap = 150; const pt = [];
  products.forEach((product, i) => {
    pt.push({
      component: <ProductCard title={product.title} image={product.imageUrl} price={product.price} />,
      op: { output: [0.5, 1], range: [0.75, 1] },
      trans: { output: [70 + i * gap, 0], range: [0.75, 1] },
    });
  })
  return pt;
};

const PRODUCTS_TRANSITIONS = buildProductTranstions(products);
