import React from "react";

class ErrorBoundary extends React.Component{
    constructor(props) {
        super(props)
        this.state = {hasError: false, error: null}
    }

    static getDerivedStateFromError(error) {
        return {hasError: true, error}
    }

    componentDidCatch(error, info) {
        console.error(`caught an error: `, error, info)
    }


    render() {

        //if there is an error show this
        if (this.state.hasError) return (
            <div>
                <p>THERE IS AN ERROR :O</p>
                <p>{this.state.error.message}</p>
                <button className='button' onClick={ () => this.setState({hasError: false, error: null}) } >try again</button>
            </div>
        )

        //else, shows the component's children
        return this.props.children
    }
}


export default ErrorBoundary;