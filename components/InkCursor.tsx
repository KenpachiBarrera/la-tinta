import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const InkCursor: React.FC = () => {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Create a trail of "drops" with different spring physics
    // The head is tight and responsive, the tail is loose and laggy
    const springConfigHead = { damping: 25, stiffness: 400, mass: 0.5 };
    const springConfigMid = { damping: 20, stiffness: 200, mass: 0.8 };
    const springConfigTail = { damping: 15, stiffness: 100, mass: 1 };

    const headX = useSpring(mouseX, springConfigHead);
    const headY = useSpring(mouseY, springConfigHead);

    const midX = useSpring(mouseX, springConfigMid);
    const midY = useSpring(mouseY, springConfigMid);

    const tailX = useSpring(mouseX, springConfigTail);
    const tailY = useSpring(mouseY, springConfigTail);
    
    const tail2X = useSpring(mouseX, { damping: 12, stiffness: 80, mass: 1.2 });
    const tail2Y = useSpring(mouseY, { damping: 12, stiffness: 80, mass: 1.2 });

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", mouseMove);
        return () => window.removeEventListener("mousemove", mouseMove);
    }, [mouseX, mouseY]);

    return (
        <div 
            className="fixed inset-0 pointer-events-none z-[100] mix-blend-difference"
            style={{ filter: "url(#goo-cursor)" }}
        >
            {/* Main cursor body (The "Ink Pot") */}
            <motion.div
                className="absolute bg-white rounded-full w-6 h-6 -ml-3 -mt-3"
                style={{ x: headX, y: headY }}
            />
            
            {/* Trailing drops creating the "running" liquid effect */}
            <motion.div
                className="absolute bg-white rounded-full w-5 h-5 -ml-2.5 -mt-2.5"
                style={{ x: midX, y: midY }}
            />
             <motion.div
                className="absolute bg-white rounded-full w-4 h-4 -ml-2 -mt-2"
                style={{ x: tailX, y: tailY }}
            />
            <motion.div
                className="absolute bg-white rounded-full w-3 h-3 -ml-1.5 -mt-1.5"
                style={{ x: tail2X, y: tail2Y }}
            />
        </div>
    );
};