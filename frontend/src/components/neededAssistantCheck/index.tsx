import React, { useEffect } from 'react';
import { checkUserContext } from '../../services/userService';

interface IProp {
    openPopup: () => void;    
}

const NeededAssistantCheck: React.FC<IProp> = ({openPopup}: IProp) => {

    useEffect(() => {
        const checkAssistant = async () => {
            const isNeeded = await checkUserContext();
            if (isNeeded) {
                openPopup();
            }
        };
        checkAssistant();      
    },[]);
    return (
        <></>
    );
};

export default NeededAssistantCheck;