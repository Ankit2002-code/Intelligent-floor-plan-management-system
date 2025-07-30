import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <>
      {/* Animated gradient background */}
      <motion.div
        className="fixed inset-0 -z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, #a259ff 0%, #3f2b96 100%)",
          filter: "blur(80px)",
          opacity: 0.7,
        }}
      />
      {/* Subtle animated particles */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/30 blur-2xl"
            style={{
              width: `${24 + Math.random() * 32}px`,
              height: `${24 + Math.random() * 32}px`,
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
            }}
            animate={{
              y: [0, Math.random() * 40 - 20, 0],
              x: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>
    </>
  );
}