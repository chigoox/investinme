import { Spinner } from "@nextui-org/react";

export default function LoaddingMask({ lable = 'loading', color = 'success', forThis }) {
    return (
        <div className={`center bg-black     ${forThis == 'contain' ? 'absolute h-full w-full bg-opacity-50 border-green-600 border rounded-xl z-[99] right-0' : 'z-[99999] fixed h-screen w-screen bg-opacity-90 '} top-0 `}>
            <Spinner label={lable} color={color} labelColor={color} />
        </div>
    );
}
