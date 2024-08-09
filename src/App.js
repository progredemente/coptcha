import React, { Component } from 'react';
import './App.css';
import { AppsBar } from 'components/AppsBar';
import Captcha from './Captcha';
import InitialCheck from './InitialCheck';
import GenerateSection from './GenerateSection';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleCaptcha: false,
            closingCaptcha: false,
            success: false,
            generateSection: false
        }
        this.animationTime=250;
        let queryParams = new URLSearchParams(window.location.search);
        this.next = queryParams.get("next");
        this.validUrl = true;
        try {
            new URL(this.next);
        }
        catch(_) {
            this.validUrl = false;
        }

    }

    openCaptcha = () => {
        if(!this.state.visibleCaptcha) {
            this.setState({visibleCaptcha: true});
        }
    }

    closeCaptcha = (success) => {
        this.setState({closingCaptcha: true}, () => {
            setTimeout(() => {
                this.setState({visibleCaptcha: false, closingCaptcha: false}, () => {
                    if(success) {
                        this.setState({success: true}, () => {
                            if(this.validUrl) {
                                setTimeout(() => {
                                    window.location.href = this.next;
                                }, this.animationTime);
                            }
                            else {
                                this.setState({generateSection: true});
                            }
                        });
                    }
                })
            }, this.animationTime * 2);
        })
    }

    render() {
        return (
            <>
                {
                    this.validUrl &&
                    <div className='app valid-url'>
                        <InitialCheck
                            openCaptcha={this.openCaptcha}
                            success={this.state.success}
                        />
                        <div className='title'>
                            <div className='title-author'>powered by <a href="." target="_blank">progredemente</a></div>
                        </div>
                        {
                            this.state.visibleCaptcha &&
                            <div
                                className={`captcha-container${this.state.closingCaptcha ? ' close' : ''}`}
                                style={{
                                    "--animation-time": `${this.animationTime}ms`
                                }}
                            >
                                <Captcha close={this.closeCaptcha}/>
                            </div>
                        }
                    </div>
                }
                {
                    !this.validUrl &&
                    <AppsBar current='coptcha'>
                        <div className='app'>
                            <div className='title'>
                                <img
                                    src={`${process.env.RESOURCES_URL}/coptcha.png`} alt={"COPTCHA LOGO"}
                                />
                                <div className='title-name'><span>COP</span>TCHA</div>
                                <div className='title-description'>
                                    El CAPTCHA para esquivar a la policía
                                </div>
                                <div className='title-author'>por <a href="/" target="_blank">progredemente</a></div>
                            </div>
                            <InitialCheck
                                openCaptcha={this.openCaptcha}
                                success={this.state.success}
                            />
                            {
                                this.state.visibleCaptcha &&
                                <div
                                    className={`captcha-container${this.state.closingCaptcha ? ' close' : ''}`}
                                    style={{
                                        "--animation-time": `${this.animationTime}ms`
                                    }}
                                >
                                    <Captcha close={this.closeCaptcha}/>
                                </div>
                            }
                            {
                                this.state.generateSection &&
                                <GenerateSection />
                            }
                        </div>
                    </AppsBar>
                }
            </>
        );
    }
}

export default App;
