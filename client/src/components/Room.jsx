import React from 'react';

const Room = ({ username, setUsername, room, setRoom, setChatScreen, socket }) => {

    const sendRoom = () => {
        socket.emit('room', { room });
        setChatScreen(true);
    }

    return (
        <div className='flex items-center justify-center h-screen bg-black'>
            <div className='w-1/3 h-[400px] rounded-lg bg-indigo-600 flex flex-col space-y-4 p-6'>
                <h1 className='text-center my-4 font-bold text-2xl text-black'>WELCOME TO CHAT</h1>
                <input value={username} onChange={(e) => setUsername(e.target.value)} className='h-12 rounded-xl p-3 outline-none text-black' type='text' placeholder='Username' />
                <input value={room} onChange={(e) => setRoom(e.target.value)} className='h-12 rounded-xl p-3 outline-none text-black' type='text' placeholder='Room' />
                <div onClick={sendRoom} className='tracking-wider hover:opacity-70 cursor-pointer text-white bg-indigo-900 h-12 flex items-center justify-center'>
                    CHAT!!!
                </div>
            </div>
        </div>
    );
}

export default Room;
