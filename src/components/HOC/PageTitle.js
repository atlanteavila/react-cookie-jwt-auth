import propTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

export default function PageTitle({ children, title }) {
    return (
        <Helmet>
            {children}
            <title>{title}</title>
        </Helmet>
    );
};

PageTitle.propTypes = {
    title: propTypes.string.isRequired,
};