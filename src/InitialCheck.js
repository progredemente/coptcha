import React, { Component } from 'react';
import './InitialCheck.css';
import { Icon } from 'components/Icon';


class InitialCheck extends Component {

    constructor(props) {
        super(props);
        this.state = {
            circle: false,
            incomplete: false,
        }
        this.animationTime = 250;
    }

    openCaptcha = () => {
        this.setState({circle: true}, () => {
            setTimeout(() => {
                this.setState({incomplete: true}, () => {
                    setTimeout(() => {
                        this.props.openCaptcha();
                    }, this.animationTime * 2);
                })
            }, this.animationTime);
        })
    }

    render() {
        return (
            <div className='initial-check'>
                <div
                    className='initial-check-check-container'
                >
                    {
                        !this.props.success &&
                        <div
                            className={`initial-check-check${this.state.circle ? ' circle' : ''}${this.state.incomplete ? ' incomplete' : ''}`}
                            style={{
                                '--animation-time': `${this.animationTime}ms`
                            }}
                            onClick={this.openCaptcha}
                        ></div>
                    }
                    {
                        this.props.success &&
                        <div className='initial-check-success'>
                            <Icon icon="✓"/>
                        </div>
                    }
                    <div>
                        No soy policía
                    </div>
                </div>
                <div className='initial-check-logo'>
                    <img
                        src={`${process.env.RESOURCES_URL}/coptcha.png`} alt={"COPTCHA LOGO"}
                    />
                    <div className='initial-check-title'><span>COP</span>TCHA</div>
                </div>
            </div>
        );
    }
}

export default InitialCheck;
