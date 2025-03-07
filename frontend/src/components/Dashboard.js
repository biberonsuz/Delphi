import { useState, useEffect } from 'react';
import BookIcon from './icons/BookIcon';
import BookWithProgress from './BookWithProgress';
import BookAsset from './BookAsset';

const Dashboard = ({ books, onSelectChat, onSelectBook }) => {
    const [chats, setChats] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const categories = Array.from(new Set(books.map(book => book.category)));

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        if (token) fetchUserChats(token);
    }, []);

    const fetchUserChats = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/api/user-chats', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setChats(data.chats);
            } else {
                console.error('Failed to fetch chats');
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    return (
        <div className="p-6 pt-24 text-center grow overflow-y-scroll">
            <div className="flex flex-col items-center space-y-12">
                {chats.length ? (
                    <div className="w-full min-h-60 rounded-xl flex flex-col">
                        <h2 className="text-left text-2xl mb-4 font-medium">Pick up where you left off</h2>
                        <ul className="overflow-x-scroll gap-8 w-full flex grow">
                            {chats.map((chat) => (
                                <BookWithProgress
                                key={chat.id}
                                chat={chat}
                                onSelectBook={onSelectBook}
                            />
                            ))}
                        </ul>
                    </div>
                ) : null}

                <div className="bg-gray-50 w-full h-4/6 rounded-xl p-4 pb-6">
                    <h2 className="text-left text-2xl mb-4 font-medium">Curated for You</h2>
                    <ul className="overflow-x-scroll w-full h-full flex gap-6">
                        {books.slice(0, 3).map((book) => (
                            <BookAsset
                                key={book.id}
                                book={book}
                                onSelectBook={onSelectBook}
                            />
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
    );
};

export default Dashboard;