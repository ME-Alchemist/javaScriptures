// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SlashEffect({ trigger }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      setTimeout(() => setShow(false), 700); // göm efter animationen
    }
  }, [trigger]);

  return (
    show && (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 77 77"
        className="slash-svg"
      >
        <motion.path
          d="M6.6121 73.5019C12.6441 61.1258 22.8956 34.2101 42.1032 29.0877C57.0423 25.1277 66.2675 21.8105 70.4005 19.7206C72.5067 18.6313 75.9306 15.5969 75.9306 15.5969"
          stroke="red"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.svg>
    )
  );
}
