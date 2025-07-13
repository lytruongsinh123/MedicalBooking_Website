import React, { useEffect, useRef } from "react";

const EachDoctor = ({ children, index }) => {
    const ref = useRef();

    useEffect(() => {
        const node = ref.current;
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.classList.add("show");
                    observer.unobserve(node);
                }
            },
            { threshold: 0.15 }
        );
        if (node) observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // Thêm class "even" hoặc "odd" để giữ hiệu ứng đan xen
    const evenOdd = index % 2 === 0 ? "even" : "odd";

    return (
        <div ref={ref} className={`each-doctor ${evenOdd}`}>
            {children}
        </div>
    );
};

export default EachDoctor;
