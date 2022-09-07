import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'
import { Waves } from './utils/wave'
import { Button, Input, Form, InputNumber } from 'antd'

import { toPng } from 'html-to-image'
import logo from './assets/move.jpg'
function App() {
    const { TextArea } = Input
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    }
    let [waveCount, setWaveCount] = useState(5)
    let [form, setForm] = useState({
        topTitle: 'Move系列之一',
        topTitleFontSize: 42,
        title: '「输入标题」',
        fontSize: 80,
        subtitle: '副标题',
        subTitleFontSize: 30
    })

    function topTitle() {
        return { __html: form.topTitle.replace(/\n/g, '<br/>') }
    }

    function title() {
        return { __html: form.title.replace(/\n/g, '<br/>') }
    }

    function subtitle() {
        return { __html: form.subtitle.replace(/\n/g, '<br/>') }
    }

    let topTitleStyle = {
        fontSize: form.topTitleFontSize,
        lineHeight: '1.4em'
    }

    let titleStyle = {
        fontSize: form.fontSize,
        lineHeight: '1.4em'
    }

    let subTitleStyle = {
        fontSize: form.subTitleFontSize,
        lineHeight: '1.4em'
    }

    const ref = useRef()

    const onGenerate = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'my-image-name.png'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    useEffect(() => {
        var waves = new Waves('#holder', {
            fps: false,
            waves: waveCount,
            width: 200
        })
        waves.animate()
    }, [waveCount])
    return (
        <div className="App">
            <div className="waveLayer" ref={ref}>
                <div id="holder"></div>
                <div className="textLayer">
                    <div className="name">「MoveDAO」</div>
                    <div className="textarea">
                        <h3 style={topTitleStyle} dangerouslySetInnerHTML={topTitle()}></h3>
                        <h2 style={titleStyle} dangerouslySetInnerHTML={title()}></h2>
                        <h4 style={subTitleStyle} dangerouslySetInnerHTML={subtitle()}></h4>
                    </div>
                    <img src={logo} className="logo"></img>
                </div>
            </div>
            <div className="waveControl">
                <TextArea
                    value={form.topTitle}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            topTitle: e.target.value
                        })
                    }}
                    rows={4}
                    placeholder="输入上标题"
                ></TextArea>
                <InputNumber
                    defaultValue={form.topTitleFontSize}
                    onChange={(value) => {
                        setForm({
                            ...form,
                            topTitleFontSize: value
                        })
                    }}
                    style={{ width: '100%', marginTop: 20 }}
                    addonBefore={<span>上标题字体大小</span>}
                />
                <TextArea
                    value={form.title}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            title: e.target.value
                        })
                    }}
                    rows={4}
                    placeholder="输入标题"
                    style={{ width: '100%', marginTop: 20 }}
                ></TextArea>
                <InputNumber
                    defaultValue={form.fontSize}
                    onChange={(value) => {
                        setForm({
                            ...form,
                            fontSize: value
                        })
                    }}
                    style={{ width: '100%', marginTop: 20 }}
                    addonBefore={<span>标题字体大小</span>}
                />

                <TextArea
                    value={form.subtitle}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            subtitle: e.target.value
                        })
                    }}
                    rows={4}
                    style={{ width: '100%', marginTop: 20 }}
                    placeholder="副标题"
                ></TextArea>

                <InputNumber
                    defaultValue={form.subTitleFontSize}
                    onChange={(value) => {
                        setForm({
                            ...form,
                            subTitleFontSize: value
                        })
                    }}
                    style={{ width: '100%', marginTop: 20 }}
                    addonBefore={<span>副标题字体大小</span>}
                />

                <Button onClick={onGenerate} style={{ marginTop: 20 }}>
                    导出
                </Button>
            </div>
        </div>
    )
}

export default App
