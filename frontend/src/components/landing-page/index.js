'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './index.scss';
import logoIcon from '../../assets/logo.png';
import layersIcon from '../../assets/layersIcon.png';
import cloudIcon from '../../assets/cloudIcon.png';
import cursorIcon from '../../assets/cursorIcon.png';
import networkIcon from '../../assets/networkIcon.png';
import terraformIcon from '../../assets/terraformIcon.png';
export default function LandingPage() {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const handleLoginClick = () => {
        navigate('/login');
    };
    // Add parallax effect based on mouse movement
    useEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        const handleMouseMove = (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            const elements = container.querySelectorAll('.bg-element');
            elements.forEach((el) => {
                const element = el;
                const speed = Number.parseFloat(element.getAttribute('data-speed') || '0.05');
                const xOffset = (x - 0.5) * speed * 100;
                const yOffset = (y - 0.5) * speed * 100;
                element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    return (_jsxs("div", { className: "landing-container", ref: containerRef, children: [_jsx("header", { className: "landing-header", children: _jsx("div", { className: "logo-container", children: _jsx("img", { src: logoIcon, alt: "ArchiTech Logo", className: "logo-image" }) }) }), _jsxs("main", { className: "landing-main", children: [_jsx("div", { className: "bg-element layers-icon floating", "data-speed": "0.05", children: _jsx("img", { src: layersIcon, alt: "Layers", className: "icon-image" }) }), _jsx("div", { className: "bg-element cloud-icon floating-reverse", "data-speed": "0.03", children: _jsx("img", { src: cloudIcon, alt: "Cloud", className: "icon-image" }) }), _jsx("div", { className: "bg-element cursor-icon floating-slow", "data-speed": "0.08", children: _jsx("img", { src: cursorIcon, alt: "Cursor", className: "icon-image" }) }), _jsx("div", { className: "bg-element network-icon floating-diagonal", "data-speed": "0.04", children: _jsx("img", { src: networkIcon, alt: "Network", className: "icon-image" }) }), _jsx("div", { className: "bg-element terraform-icon floating-rotate", "data-speed": "0.06", children: _jsx("img", { src: terraformIcon, alt: "Terraform", className: "icon-image" }) }), _jsx("div", { className: "particles", children: [...Array(15)].map((_, i) => (_jsx("div", { className: `particle particle-${i % 5}` }, i))) }), _jsxs("div", { className: "content", children: [_jsx("h1", { className: "title", children: "ArchiTech" }), _jsx("p", { className: "subtitle", children: "One Click Architecture" }), _jsxs("button", { className: "login-button pulse", onClick: handleLoginClick, children: ["Login ", _jsx("span", { className: "arrow", children: "\u2192" })] })] })] })] }));
}
//# sourceMappingURL=index.js.map