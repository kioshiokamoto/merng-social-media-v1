import {Popup} from 'semantic-ui-react'
import React from 'react'

export default function MyPopup({content,children}){
    return <Popup inverted content={content} trigger={children}/>
}