const ChatBubble = (props) => {
    return (
        <div>
            <p>{props.chatMessage}</p>
            <p>{props.timeSent}</p>
        </div>
    )
}

export default ChatBubble;