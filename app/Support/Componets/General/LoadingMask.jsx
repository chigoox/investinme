import { Spinner } from "@nextui-org/react";

export default function LoaddingMask({ lable = 'loading', color = 'success' }) {
    return (
        <div className="center bg-black z-[99999]  bg-opacity-90 h-screen w-screen fixed top-0">
            <Spinner label={lable} color={color} labelColor={color} />
        </div>
    );
}
