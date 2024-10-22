const books = [
    { id: 1, author: 'Leo Tolstoy', title: 'War and Peace', available: true },
    { id: 2, author: 'Victor Hugo', title: "Les Misérables", available: false },
    { id: 3, author: 'Fyodor Dostevsky', title: "The Brothers Karamazov", available: false },
    { id: 4, author: 'George Orwell', title: 'Animal Farm', available: false },
  ];
  
  const BookSelection = ({ onSelectBook }) => {
    return (
      <div className="p-6 text-center grow flex flex-col justify-center items-center">
        <h2 className="text-2xl mb-16 drop-shadow-xl">Which book would you like to study today?</h2>
        <div className="flex gap-6 max-w-76 w-3/4 h-128 justify-around">
          {books.map((book) => (
            <div key={book.id} className={`cursor-pointer bg-indigo-400 w-32 h-48 flex items-center justify-center drop-shadow-xl shadow-inner border-b-2 border-gray-200 ${book.available ? '' : 'opacity-30'}`} onClick={() => book.available && onSelectBook(book)}>
              <h4 className="text-lg bg-yellow-50 font-bold w-full h-24 text-sm flex items-center justify-center">{book.title}<br />—<br />{book.author}</h4>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default BookSelection;