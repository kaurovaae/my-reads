import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        shelves: PropTypes.array.isRequired,
        moveBook: PropTypes.func.isRequired,
        submitting: PropTypes.bool
    }

    render() {
        const {book, shelves, submitting, moveBook} = this.props;
        const {imageLinks, authors, title, shelf} = book;

        const style = {
            width: 128,
            height: 193,
            backgroundImage: imageLinks && imageLinks.thumbnail ? `url(${imageLinks.thumbnail})` : ''
        }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={style} />
                    <form className="book-shelf-changer">
                        <select value={shelf} onChange={e => moveBook(book, e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            {shelves.map(sh => (
                                <option key={sh.key} value={sh.key} disabled={submitting}>
                                    {sh.name}
                                </option>
                            ))}
                            <option value="none" disabled={submitting}>None</option>
                        </select>
                    </form>
                </div>
                <div className="book-title">{title}</div>
                {authors && (
                    <div className="book-authors">
                        {authors.join(", ")}
                    </div>
                )}
            </div>
        )
    }
}

export default Book;
