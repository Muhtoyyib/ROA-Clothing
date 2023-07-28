import './form-input.styles.scss'
// eslint-disable-next-line react/prop-types
export default function FormInput({label, inputOptions}){
    return(
        <div className="group">
            <input className="form-input" {...inputOptions}/>
            { label && (
                // eslint-disable-next-line react/prop-types
                <label className={`${inputOptions.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
        </div>
    )
}

