import { useMessagePrintStore } from "../store/messagePrintStore"


const StatusMessage = () => {
    const statusMessage = useMessagePrintStore(state => state.statusMessage)
    return (
        <div>
            {statusMessage && <p>{statusMessage}</p>}
        </div>

    )
}


export default StatusMessage