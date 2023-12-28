import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton';

function Chat() {
    return (
        <div className="w-full gap-5 flex flex-row justify-start items-center rounded-xl">
            <div className="flex items-center justify-center h-8 w-8 rounded-full">
                <Skeleton circle height={38} width={38} />
            </div>
            <div className="text-start flex flex-col">
                <Skeleton height={14} width={100} />
                <Skeleton height={12} width={150} />
            </div>
        </div>

    )
}

export default Chat