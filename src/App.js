import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'
import { Waves } from './utils/wave'
import { Button, Input, Form, InputNumber } from 'antd'
import { toPng } from 'html-to-image'
import logo from './assets/move.jpg'
function App() {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    }
    let [waveCount, setWaveCount] = useState(5)
    let [form, setForm] = useState({
        title: '输入标题',
        fontSize: 50
    })

    let titleStyle = {
        fontSize: form.fontSize
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

    const onFormLayoutChange = () => {
        console.log('onFormLayoutChange')
    }

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
                    <h2 style={titleStyle}>{form.title}</h2>
                    <img src={logo} className="logo"></img>
                </div>
            </div>
            <div className="waveControl">
                <Input
                    value={form.title}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            title: e.target.value
                        })
                    }}
                    addonBefore={<span>标题</span>}
                ></Input>
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

                <Button onClick={onGenerate} style={{ marginTop: 20 }}>
                    导出
                </Button>
            </div>
        </div>
    )
}

export default App
