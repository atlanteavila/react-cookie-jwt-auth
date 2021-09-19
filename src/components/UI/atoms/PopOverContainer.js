import { Popover } from '@headlessui/react'
export default function PopOverContainer({ children }) {
    return (
        <Popover className="relative bg-white">
            {children}
        </Popover>
    );
};