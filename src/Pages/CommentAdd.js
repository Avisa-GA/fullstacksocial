import React, {useState} from "react";
export default function CommnetAdd(props) {

    const {handleCommentSubmit} = props;
    const [text, setText] = useState("");

    return (
        <div>
            <div className="card mt-4 mb-3">
                <div className="card-header">
                    <div className="card-body">
                        <textarea 
                        name="text" 
                        className="form-control" 
                        placeholder="Add a new comment"
                        onChange={event => setText(event.target.value)}
                        value={text}
                        ></textarea>
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary mr-3" onClick={event => {
                        handleCommentSubmit(text);
                        setText('');
                    }}>Comment</button>
                    <button className="btn btn-warning">Close issue</button>
                </div>
            </div>
        </div>
    )
}