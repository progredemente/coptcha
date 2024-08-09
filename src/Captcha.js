import React, { Component } from 'react';
import './Captcha.css';
import CaptchaImg from './CaptchaImg';
import { Icon } from 'components/Icon';


class Captcha extends Component {

    constructor() {
        super();
        this.minPuigdemonts = 3;
        this.maxPuigdemonts = 5;
        this.puigdemontImgCount = 9;
        this.notPuigdemontImgCount = 12;
        this.state = {
            imageData: [],
            error: false
        }
    }

    componentDidMount() {
        this.init();
    }

    init(error) {
        let numPuigdemonts = Math.floor(Math.random() * (this.maxPuigdemonts - this.minPuigdemonts + 1)) + this.minPuigdemonts;
        let numNoPuigdemonts = this.puigdemontImgCount - numPuigdemonts;
        this.setState({
            imageData: [...this.getPuigdemontImgPaths(numPuigdemonts), ...this.getNotPuigdemontImgPaths(numNoPuigdemonts)].sort(() => 0.5 - Math.random()),
            error: !!error
        });
    }

    getPuigdemontImgPaths(numPaths) {
        return this.getImgPaths(numPaths, "puchi", this.puigdemontImgCount);
    }

    getNotPuigdemontImgPaths(numPaths) {
        return this.getImgPaths(numPaths, "nopuchi", this.notPuigdemontImgCount);
    }

    getImgPaths(numPaths, prefix, maxPaths) {
        return Array.from(Array(maxPaths).keys()).sort(() => 0.5 - Math.random()).slice(0, numPaths).map((i) => {
            return {
                path: `./img/${prefix}-${i}.png`,
                type: prefix,
                selected: false
            }
        });
    }

    select = (imgData) => {
        imgData.selected = !imgData.selected;
        this.setState({});
    }

    reload = () => {
        this.init();
    }
    
    verify = () => {
        let correct = true;
        for(let img of this.state.imageData) {
            if(img.type === "puchi" && !img.selected || img.type === "nopuchi" && img.selected) {
                correct = false;
                break;
            }
        }
        if(!correct) {
                this.init(true);
        }
        else {
            this.setState({error: false}, () => this.props.close(true))
        }
    }

    render() {
        return (
            <div className='captcha'>
                <div className='captcha-header'>
                    <div>
                        Selecciona todas las imágenes en las que salga
                    </div>
                    <div className='captcha-header-highlight'>
                        Carles Puigdemont
                    </div>
                </div>
                <div className='captcha-body'>
                    {
                        this.state.imageData.map((img) => {
                            return (
                                <div key={img.path}>
                                    <CaptchaImg
                                        img={img}
                                        select={() => {
                                            this.select(img);
                                        }}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='captcha-footer'>
                    {
                        this.state.error &&
                        <div className='captcha-footer-error'>Por favor vuelve a intentarlo</div>
                    }
                    <hr/>
                    <div className='captcha-footer-buttons'>
                        <div
                            onClick={this.reload}
                        >
                            <Icon icon="↻"/>
                        </div>
                        <div
                            className='prg-button'
                            onClick={this.verify}
                        >
                            Verificar
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Captcha;
