import BookAsset from './BookAsset';
import ProgressBar from './ProgressBar';
const BookWithProgress = ({ chat, onSelectChat }) => {
    return (
        <li
            key={chat.chatId}
            className="
                min-w-80 max-w-md mr-0 h-auto
                p-4
                flex gap-6
                flex-grow bg-gray-100 rounded-lg hover:bg-indigo-50 hover:cursor-pointer"
            onClick={() => onSelectChat(chat.chatId)}>
            <BookAsset
                key={chat.book.id}
                book={chat.book}
                onSelectBook={null}
            />
            <div className="flex flex-col gap-3">
                <div className="book-info text-left">
                    <h1 className="font-medium">{chat.book.title}</h1>
                    <h2 className="font-light text-sm">{chat.book.author}</h2>
                </div>
                <ProgressBar
                    key={chat.book.id}
                    book={chat.book}
                    progress={chat.progress}
                ></ProgressBar>
                <div className="description">
                    <p>{chat.chatId}</p>
                </div>
            </div>
        </li>
    );
};
export default BookWithProgress;