import PropTypes from 'prop-types';

export default function LabelledInput({value, onChange, name, title, type}) {
    return (
        <>
            <label className="block mb-1 mt-3 font-medium" htmlFor={name}>{title}</label>
            <input className="my-1 w-full p-2 rounded-md" 
                value={value} 
                onChange={onChange} 
                name={name}
                type={type}
                placeholder={title} 
                autoComplete='true'
                autoCapitalize='true'
            />
        </>
    );
}

LabelledInput.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};
