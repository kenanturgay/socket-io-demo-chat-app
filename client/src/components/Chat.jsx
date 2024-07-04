import { useEffect, useState } from "react";

const Chat = ({ socket, room, username }) => {

    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on('messageReturn', (data) => {
            console.log('messageReturn', data);
            setMessageList((prev) => [...prev, data]);
        })
    }, [socket]);

    const sendMessage = async () => {
        const messageContent = { message, room, username }
        await socket.emit('message', messageContent);
        setMessageList(prev => [...prev, messageContent]);
        setMessage('');
    }

    console.log(messageList);

    return (
        <div className='flex items-center justify-center h-full'>
            <div className='w-1/3 h-[600px] bg-white relative'>
                <div className='w-full h-16 bg-gray-700 flex items-center p-3'>
                    <div className='w-12 h-12 bg-white rounded-full'></div>
                </div>
                <div className='w-full h-[400px] overflow-y-auto'>
                    {
                        messageList && messageList.map((item, index) => (
                            <div className={username === item.username ? 'flex justify-end' : ''} >
                                <div className={`${username === item.username ? 'bg-green-600' : 'bg-blue-600'} w-2/3 h-12 p-2  text-white m-2 rounded-xl rounded-br-none`}>
                                    <div>{item.message}</div>
                                    <div className='w-full flex justify-end text-xs'>{item.username}</div>
                                </div>
                            </div>
                        ))
                    }



                </div>
                <div className='absolute bottom-0 left-0 w-full'>
                    <input value={message} onChange={(e) => setMessage(e.target.value)} className='w-3/4 h-12 border p-3 outline-none' type='text' placeholder='message send' />
                    <button onClick={sendMessage} className='w-1/4 bg-indigo-600 text-white h-12 hover:opacity-70'>SEND</button>
                </div>
            </div>
        </div>
    );
}
export default Chat;