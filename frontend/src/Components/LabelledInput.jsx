import PropTypes from 'prop-types';

export default function LabelledInput({value, onChange, name, title, type, errors}) {
    return (
        <>
            <div className='w-full'>
                {/* <label className="w-full font-medium" htmlFor={name}>{title}</label> */}
                <input className={`w-full p-2 my-3 border rounded-md  ${errors[name] ? `border-red-600` : ``}`} 
                    value={value} 
                    onChange={onChange} 
                    name={name}
                    type={type}
                    placeholder={title} 
                    autoComplete='true'
                    autoCapitalize='true'
                />
                {errors && errors[name] && <p className='text-red-600'>{errors[name]}</p>}
            </div>

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
