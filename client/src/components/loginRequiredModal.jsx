import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaSignInAlt, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LoginRequiredModal({ isOpen, onClose, feature }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl"
                >
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                    >
                        <FaTimes />
                    </button>

                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                            <FaLock className="text-2xl text-blue-600" />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Login Required
                        </h2>

                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            Please login to access{" "}
                            <span className="font-semibold">
                                {feature}
                            </span>.
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
                        >
                            <FaSignInAlt />
                            Login
                        </button>

                        <button
                            onClick={onClose}
                            className="mt-3 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            Continue Browsing
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default LoginRequiredModal;