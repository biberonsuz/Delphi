const ProgressBar = ({ book }) => {
    return (
        <li 
            key={book.id}
            className="flex hover:cursor-pointer"
        >
            <div className={`h-2 w-36 bg-indigo-100 rounded-full`}>
                <div  className={`h-2 w-24 bg-indigo-500 rounded-full`}></div>
                <div className={`text-xs text-left pt-1`}>55% complete</div>
            </div>
        </li>
    );
};

export default ProgressBar;