const BookAsset = ({ book, onSelectBook }) => {
    return (
        <li 
            key={book.id}
            className="flex hover:cursor-pointer"
            onClick={() => book.available && onSelectBook(book)}
        >
            <div className={`
                relative
                min-w-32 h-48 w-32
                flex items-center justify-center 
                bg-indigo-400 drop-shadow-xl shadow-inner border-b-2 border-gray-200 ${book.available ? '' : 'opacity-30'}`}>
                <h4 className="bg-yellow-50 w-full h-24 text-sm flex items-center justify-center flex-col">
                    <span className="font-bold">{book.title}<br /></span><span>—<br /></span><span className="font-medium">{book.author}</span>
                </h4>
                <div class="texture-overlay" className={`
                    w-full h-full absolute top-0 left-0
                    bg-[url('../public/img/book-texture.jpg')] bg-contain
                    mix-blend-overlay opacity-100
                    `}>
                </div>
            </div>
        </li>
    );
};

export default BookAsset;