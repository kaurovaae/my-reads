import React, {Component} from 'react'
import {Route} from 'react-router-dom';
import SearchPage from './SearchPage';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';

import './App.css'

class BooksApp extends Component {
    state = {
        books: [],
        booksIds: {},
        searchedBooks: [],
        shelves: [
            {
                key: "currentlyReading",
                name: "Currently Reading"
            },
            {
                key: "wantToRead",
                name: "Want to Read"
            },
            {
                key: "read",
                name: "Read"
            }
        ],
        submitting: false
    }

    getBooks = () => {
        BooksAPI.getAll()
            .then(res => {
                const {shelves} = this.state;

                let booksIds = {};
                for (const shelf of shelves) {
                    booksIds[shelf.key] = res.filter(b => b.shelf === shelf.key).map(el => el.id)
                }

                this.setState({
                    books: res, // list of books
                    booksIds // books ids by shelf
                })
            });
    }

    componentDidMount() {
        this.getBooks();
    }

    update = (book, shelf) => {
        this.setState({submitting: true});
        BooksAPI.update(book, shelf)
            .then(res => {
                this.setState(prevState => {
                    let books;
                    if (book.shelf === 'none') {
                        books = prevState.books.concat([{...book, shelf}]); // adding book on shelf
                    } else {
                        books = prevState.books.map(b => b.id === book.id ? ({...b, shelf}): ({...b})) // change shelf
                    }

                    return {
                        books,
                        booksIds: res,
                        searchedBooks: prevState.searchedBooks.map(b => b.id === book.id ? ({...b, shelf}) : ({...b})),
                        submitting: false
                    }
                });
            });
    }

    search = (query) => {
        if (!query) {
            this.setState({searchedBooks: []});
            return;
        }

        BooksAPI.search(query)
            .then(res => {
                const searchedBooks = !res || res.error ? [] : res;

                this.setState(prevState => ({
                    searchedBooks: searchedBooks.map(b => {
                        for (const shelf of prevState.shelves) {
                            if (prevState.booksIds[shelf.key].includes(b.id)) {
                                return {...b, shelf: shelf.key}
                            }
                        }

                        return {...b, shelf: 'none'}
                    })
                }))
            });
    }


    render() {
        const {books, booksIds, searchedBooks, shelves, submitting} = this.state;

        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListBooks
                        books={books}
                        booksIds={booksIds}
                        shelves={shelves}
                        submitting={submitting}
                        moveBook={this.update}
                    />
                )} />
                <Route path='/search' render={() => (
                    <SearchPage
                        books={searchedBooks}
                        shelves={shelves}
                        submitting={submitting}
                        search={this.search}
                        moveBook={this.update}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp;
