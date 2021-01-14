import React, {useState} from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();      // delete nweet
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();       // delete file
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {target : {value}} = event;
        setNewNweet(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text  : newNweet
        });
        setEditing(false);
    }

    return(
        <div className="nweet">
            {editing ? (
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit} className="container nweetEdit">
                                <input type="text" placeholder="Edit your nweet" value={newNweet} onChange={onChange} autoFocus required className="formInput" />
                                <input type="submit" value="Update Nweet" className="formBtn" />
                            </form>
                            <button onClick={toggleEditing} className="formBtn cancelBtn" >Cancel</button>
                        </>
                    )}                    
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (<img src={nweetObj.attachmentUrl} />)}
                    {isOwner && (
                        <div class="nweet__actions">
                            <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}                                    
                </>
            )}            
        </div>
    );    
};

export default Nweet;