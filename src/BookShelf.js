import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const BookShelf = ({title, books, ...otherProps}) => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <li key={book.id}>
                            <Book book={book} {...otherProps} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    submitting: PropTypes.bool
}

export default BookShelf;
