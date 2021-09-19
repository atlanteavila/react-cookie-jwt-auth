import { MenuIcon } from '@heroicons/react/outline';
import { Popover } from '@headlessui/react';
import propTypes from 'prop-types';

export default function HamburgerMenuIconButton({ className, screenReaderText }) {
    return (
        <Popover.Button className={className}>
            <span className="sr-only">{screenReaderText}</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </Popover.Button>
    );
};

HamburgerMenuIconButton.propTypes = {
    className: propTypes.string.isRequired,
    screenReaderText: propTypes.string.isRequired,
};