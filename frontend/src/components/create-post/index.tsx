import React, { useCallback, useState } from "react";
import { createPost, editPost } from "../../services/postService";
import { UpsertPost } from "../upsert-post";
import { mutate } from "swr";
import './index.scss'

interface IProp {
    keyToRefetch: string
}

export const CreatePost: React.FC<IProp> = ({ keyToRefetch }: IProp) => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const togglePopUp = useCallback(() => setIsPopupOpen((prevState) => !prevState), [setIsPopupOpen]);

    const onCreate = useCallback(async (newPost: FormData) => {
        await createPost(newPost);
        mutate(keyToRefetch);
    }, [keyToRefetch])

    return <>
        <div onClick={togglePopUp} className="create-post-button">
            +
        </div>
        <UpsertPost onSave={onCreate} isOpen={isPopupOpen} toggleIsOpen={togglePopUp} />
    </>
} 