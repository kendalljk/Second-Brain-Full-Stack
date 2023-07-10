import { useEffect } from "react";

const useResetStateOnActive = (selector, resetStateFunc) => {
    useEffect(() => {
        const element = document.querySelector(selector);

        if (element && element.classList.contains("active")) {
            resetStateFunc();
        }
    }, []);
};

export default useResetStateOnActive;
