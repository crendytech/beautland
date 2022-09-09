import Image from "next/image"
import { useEffect } from "react";
import { FaInstagram } from "react-icons/fa"
import { MdOutlineArrowRightAlt } from "react-icons/md"
import { useTransition, animated } from "react-spring";
import images from "../../../data/images.json"

export const Products = ({ inView}) => {
    const [imageTransitions, imageTransitionsApi] = useTransition(IMAGES_TRANSITIONS, () => ({
        from: { opacity: 0.3 },
        enter: { opacity: 1 },
        delay: 100,
        config: {
            tension: 280,
            friction: 80,
        },
    })
    );

    useEffect(() => {
        if (inView) {
            imageTransitionsApi.start();
        }
    }, [inView]);
    return (
        <div className="grid grid-cols-4 gap-x-8">
            {imageTransitions(({ opacity }, item) => (
            <animated.div style={{ opacity: opacity.to(item.op), transform: opacity.to(item.trans).to((x) => `translate3d(${x}px,0,0)`)}}>
                {item.component}
            </animated.div>
            ))}
        </div>
    )
}
 
const ImageCard = ({imageUrl}) => {
    return (
        <div className="w-full flex items-end bg-[#bcc5e6]">
            <Image src={imageUrl || "/static/images/footer-1.png"} alt="" width={500} height={500} />
        </div>
    )
}

const FollowCard = () => {
    return (
        <div className="w-full flex items-center bg-[#fe8159] text-white center-flex h-full">
            <div className="flex flex-col space-y-6 items-center justify-center">
                <FaInstagram size={32} />
                <p className="w-[60%] mb-10 text-center">Join us and get all the services we provide</p>
                <div className="w-10 h-10 mx-auto flex justify-center items-center rounded-full bg-[#f4764f]">
                    <MdOutlineArrowRightAlt size={20} />
                </div>
            </div>
        </div>
    )
}

const buildImageTranstions = (images = []) => {
  const pt = [];
  images.forEach(({url}, i) => {
    pt.push({
      component: i == 3?(<FollowCard />):(<ImageCard imageUrl={url} />),
      op: { output: [0.5, 1], range: [0.75, 1] },
      trans: { output: [80 + i * 80, 0], range: [0.75, 1] },
    });
  })
  return pt;
};

const IMAGES_TRANSITIONS = buildImageTranstions(images);