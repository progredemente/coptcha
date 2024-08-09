import React, { Component } from 'react';
import './CaptchaImg.css';
import { Icon } from 'components/Icon';


class CaptchaImg extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className={`captcha-icon${this.props.img.selected ? ' selected' : ''}`}>
                    <Icon icon="✓"/>
                </div>
                <img
                    className={`captcha-img${this.props.img.selected ? ' selected' : ''}`}
                    src={this.props.img.path}
                    onClick={this.props.select}
                    draggable={false}
                />
            </>
        );
    }
}

export default CaptchaImg;
