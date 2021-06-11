import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';
import {throttle} from 'lodash';

class SearchPage extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        search: PropTypes.func.isRequired,
        shelves: PropTypes.array.isRequired,
        moveBook: PropTypes.func.isRequired,
        submitting: PropTypes.bool
    }

    state = {
        query: ''
    }

    componentDidMount() {
        this.props.search('');
    }

    handleSearch = throttle(() => {
        const {query} = this.state;
        this.props.search(query || '');
    }, 800);

    handleChange = (e) => {
        this.setState({
            query: e.target.value
        });
        this.handleSearch();
    }

    render() {
        const {books, ...otherProps} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map(book => (
                            <li key={book.id}>
                                <Book book={{...book}} {...otherProps} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage;
