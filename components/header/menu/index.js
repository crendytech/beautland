import { useSpring, animated } from "react-spring";
import { Cart } from "../cart"

export const Menu = () => {
    const menuAnimation = useSpring({
        from: { opacity: 0.25, y: -70 },
        to: { opacity: 1, y: 0 },
        delay: 2200,
        config: {
        tension: 280,
        friction: 80,
        },
    });

    return (
        <animated.ul style={menuAnimation} className="flex items-center justify-end space-x-14 text-neutral-300 font-medium text-lg cursor-pointer">
                <li>Product</li>
                <li>About</li>
                <li>Blog</li>
                <li>Reviews</li>
                <li><Cart /></li>
        </animated.ul>
    )
}