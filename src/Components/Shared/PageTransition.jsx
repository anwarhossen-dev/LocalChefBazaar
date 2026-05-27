import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
    const MotionDiv = motion.div;
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            {children}
        </MotionDiv>
    );
};

export default PageTransition;