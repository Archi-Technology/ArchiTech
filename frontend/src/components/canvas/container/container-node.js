import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from 'reactflow';
const ContainerNode = ({ data, title = "Azure", icon }) => {
    const width = data?.width ?? 100;
    const height = data?.height ?? 100;
    return (_jsxs("div", { style: {
            width: `${width}px`,
            height: `${height}px`,
            border: '3px solid #ccc',
            borderRadius: '24px',
            backgroundColor: 'transparent',
            position: 'relative',
            transition: 'width 0.5s ease, height 0.5s ease',
            boxSizing: 'border-box',
            overflow: 'visible',
        }, children: [_jsx(Handle, { type: "target", position: Position.Top, style: { left: '50%', transform: 'translateX(-50%)' } }), _jsx("div", { style: {
                    position: 'absolute',
                    top: -10,
                    left: 25,
                    width: 100,
                    height: 24,
                    backgroundColor: 'rgb(241,245,249)',
                    zIndex: 1,
                } }), _jsxs("div", { style: {
                    position: 'absolute',
                    top: -16,
                    left: 45,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    zIndex: 2,
                }, children: [_jsx("div", { style: {
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            backgroundColor: data.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: _jsx("img", { src: data.icon, alt: title, style: {
                                width: '16px',
                                height: '16px',
                                objectFit: 'contain',
                            } }) }), _jsx("span", { style: { fontWeight: 600, fontSize: 13, color: '#444' }, children: data.label })] }), _jsx("div", { style: {
                    textAlign: 'center',
                    paddingTop: 30,
                    fontWeight: 'bold',
                } })] }));
};
export default ContainerNode;
//# sourceMappingURL=container-node.js.map