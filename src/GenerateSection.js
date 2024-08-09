import React, { Component, createRef } from 'react';
import './GenerateSection.css';
import { Icon } from 'components/Icon';


class GenerateSection extends Component {

    constructor() {
        super();
        this.state = {
            url: null,
            generatedUrl: null,
            error: null,
            success: false,
            copied: false
        }
        this.inputRef = createRef();
        this.animationTime = 1000;
    }

    changeUrl = (event) => {
        this.setState({url: event.target.value, error: false, success:false});
    }

    generate = () => {
        try {
            new URL(this.state.url);
            this.inputRef.current.value = `${window.location.href}?next=${this.inputRef.current.value}`;
            this.setState({success: true})
        }
        catch(_){
            this.inputRef.current.value = null;
            this.setState({error: true});
        }
    }

    copyUrl = () => {
        if(!this.state.copied) {
            navigator.clipboard.writeText(this.inputRef.current.value);
            this.setState({copied: true}, () => {
                setTimeout(() => {
                    this.setState({copied: false});
                }, this.animationTime);
            })
        }
    }

    render() {
        return (
            <div className='generate-section'>
                <p>¿Quieres proteger tu sistema de la intromisión de investigadores indeseados?</p>
                <p>Pega aquí la URL de tu sitio y genera una nueva URL con protección*:</p>
                <div>
                    <div className='generate-input-container'>
                        <input
                            type="text"
                            className={`generate-input${this.state.error ? " error": ""}${this.state.success ? " success": ""}`}
                            placeholder={this.state.error ? 'URL inválida' : 'Tu URL'}
                            onChange={this.changeUrl}
                            ref={this.inputRef}
                        />
                        {
                            this.state.success &&
                            <span
                                className={`prg-button${this.state.copied ? " copied" : ""}`}
                                onClick={this.copyUrl}
                            >
                                {
                                    !this.state.copied &&<Icon icon="C" />
                                }
                                {
                                    this.state.copied &&<Icon icon="✓" />
                                }
                            </span>
                        }
                    </div>
                    {
                        !this.state.success &&
                        <div
                            className='prg-button'
                            onClick={this.generate}
                        >
                            Generar
                        </div>
                    }
                </div>
                <p className='generate-disclaimer'>
                    * Obviamente esta web es una sátira, no protege de absolutamente nada. Es triste que tenga que remarcar esto.
                </p>
            </div>
        );
    }
}

export default GenerateSection;
