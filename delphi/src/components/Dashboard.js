import { useState, useEffect } from 'react'
import BookIcon from './icons/BookIcon'

const Dashboard = ({ books, onSelectChat, onSelectBook }) => {
    const [chats, setChats] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const categories = Array.from(new Set(books.map(book => book.category)))
    console.log(chats)
    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsLoggedIn(!!token)
        if (token) fetchUserChats(token)
    }, [])

    const fetchUserChats = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/api/user-chats', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setChats(data.chats)
            } else {
                console.error('Failed to fetch chats')
            }
        } catch (error) {
            console.error('Error fetching chats:', error)
        }
    }

    return (
        <div className="p-6 pt-24 text-center grow overflow-y-scroll">
            <div className="flex flex-col items-center space-y-12">
                {chats.length ? (
                    <div className="w-full min-h-60 h-60 rounded-xl flex flex-col">
                        <h2 className="text-left text-2xl mb-4 font-medium">Jump back in</h2>
                        <ul className="overflow-x-scroll gap-8 w-full flex grow">
                            {chats.map((chat, index) => (
                                <li
                                    key={chat.chatId}
                                    className="w-24 h-full max-w-96 mr-0 flex-grow bg-gray-100 rounded-lg hover:bg-indigo-50 hover:cursor-pointer"
                                    onClick={() => onSelectChat(chat.chatId)}
                                >
                                    <span className={`py-1 px-1 rounded-3xl flex w-min`}>
                                        <BookIcon size={24} strokeWidth={1.5} />
                                    </span>
                                    <h1 className="font-m">{chat.book.title}</h1>
                                    <h2 className="">{chat.book.author}</h2>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
                
                <div className="bg-gray-50 w-full h-4/6 rounded-xl p-4 pb-6">
                    <h2 className="text-left text-2xl mb-4 font-medium">Curated for You</h2>
                    <ul className="overflow-x-scroll w-full h-full flex justify-between">
                        {books.slice(0, 3).map((book) => (
                            <li 
                                key={book.id}
                                className="flex hover:cursor-pointer"
                                onClick={() => book.available && onSelectBook(book)}
                            >
                                <div className={`bg-indigo-400 min-w-32 h-48 w-32 flex items-center justify-center drop-shadow-xl shadow-inner border-b-2 border-gray-200 ${book.available ? '' : 'opacity-30'}`}>
                                    <h4 className="text-lg bg-yellow-50 font-bold w-full h-24 text-sm flex items-center justify-center">{book.title}<br />—<br />{book.author}</h4>
                                </div>
                                <div className={`${book.available ? '' : 'opacity-20'} text-left ml-4 max-w-52`}>
                                    <h2 className="font-medium">{book.title}</h2>
                                    <h3 className="">{book.author}</h3>
                                    <p className="text-xs mt-4">{book.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full h-4/6 rounded-xl pb-6">
                    <h2 className="text-left text-2xl mb-4 font-medium">Explore our Library</h2>
                    <ul className="overflow-x-scroll w-full h-full flex gap-6 flex-wrap">
                        {categories.map((category) => (
                            <li 
                                key={category}
                                className="bg-indigo-400 hover:bg-indigo-500 hover:cursor-pointer w-32 h-32 rounded-2xl flex items-center justify-center p-4"
                            >
                                <h2 className="text-white font-medium">{category}</h2>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
