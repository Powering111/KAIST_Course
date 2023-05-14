'use client'

import { eventManager } from '@/lib/eventManager';
import {useState, useEffect, useRef} from 'react';

export function PopupContainer(){
    const [popups,setPopups] = useState([]);
    const popupId = useRef(1);
    function addPopup(content){
        setPopups([...popups,{id:popupId.current++,content:content}]);
    }
    function deletePopup(){
        setPopups(popups.slice(0,-1));
    }
    useEffect(()=>{
        const show_listener = eventManager.register("showPopup",(content)=>{
            addPopup(content);
        });
        const hide_listener = eventManager.register("hidePopup",(content)=>{
            deletePopup();
        });

        return ()=>{
            eventManager.remove(show_listener);
            eventManager.remove(hide_listener);
        }
    },[addPopup, deletePopup]);


    return <div className="popup-container">
        {popups.map((popup)=>{
            return <Popup key={popup.id}>{popup.content}</Popup>
        })}
    </div>
}

export function Popup({children}){
    function close(){
        eventManager.emit("hidePopup");
    }
    return (
        <div className="popup-root">
            <div className="popup-main">
                {children}
            </div>
            <div className="popup-dim" onClick={close}>

            </div>
        </div>
    )
}