import { useImperativeHandle, useState } from 'react'

const TogglableVisibility = (props) => {

    const [isVisible, setIsVisible] = useState(false)

    const showWhenVisible = { display: isVisible ? '' : 'none' }
    const hideWhenVisible = { display: isVisible ? 'none' : '' }

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }


    //this allows to the parent obejct to make reference to this item/function/object
    useImperativeHandle(props.ref, () => ({ toggleVisibility }) ) //return toggleVisibility


    return (
        <div>


            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>


            <div style={showWhenVisible}>
                <div>
                    {props.children}
                </div>
                <button onClick={toggleVisibility}>Cancel</button>
            </div>

        </div>
    )
}


export default TogglableVisibility