import PropTypes from 'prop-types';

export default function Button({onClick, title}) {
    return (
        <>
            <button className="w-full bg-black text-white rounded-md p-2 my-2" type="button" onClick={onClick}>
                {title}
            </button>
        </>
    );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};
