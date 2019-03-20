import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import LogTable from './components/LogTable/LogTable'

class Options extends React.Component {

    constructor() {
        super()
        this.state = {
            siteList: '',
            logs: [
                {
                    timestamp: 'timestamp',
                    reason: 'reason',
                    time: 'time'
                }
            ]
        }
    }

    componentDidMount() {
        chrome.storage.sync.get(['siteList', 'logs'], (items) => {
            this.setState({
                siteList: items.siteList,
                logs: items.logs
            })
        })
    }

    onChange(e) {
        this.setState({
            siteList: e.target.value
        })
    }

    saveConfig() {
        chrome.storage.sync.set({
            siteList: this.state.siteList
        }, function () {
            alert('Saved')
        })
    }

    render() {
        return (
            <div>
                <h2>Options</h2>
                <div>
                    <div>
                        Restricted sites
                    </div>
                    <textarea key="sitelist" onChange={this.onChange.bind(this)} value={this.state.siteList} className="settings__field"></textarea>
                    <button onClick={this.saveConfig.bind(this)}> Salvar </button>
                </div>
                <div>
                    <div>
                        Usage log
                    </div>
                    <LogTable logs={this.state.logs !== undefined ? this.state.logs : []} />
                </div>
            </div>
        )
    }
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<Options />, app);