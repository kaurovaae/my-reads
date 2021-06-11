import React from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';

const ListBooks = ({books, booksIds, shelves, moveBook, submitting}) => {

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {shelves.map(shelf => (
                    <BookShelf
                        key={shelf.key}
                        title={shelf.name}
                        books={books.filter(book => booksIds[shelf.key].includes(book.id))}
                        shelves={shelves}
                        moveBook={moveBook}
                        submitting={submitting}
                    />
                ))}
            </div>
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    )
}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    submitting: PropTypes.bool
}

export default ListBooks;
