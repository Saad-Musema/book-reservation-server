/* eslint-disable no-undef */
const mongoose = require('mongoose');
// const jest = require('jest-mock');
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const { getBooks, getBook, addBook, updateBook } = require('../controllers/bookController');
const Book = require('../models/Book');
const config = require('../config/database');

describe('Book Controller', () => {
    beforeAll(async () => {
        await mongoose.connect(config.database);
      }, 30000); // 30 seconds timeout
      
      afterAll(async () => {
        await mongoose.connection.close();
      }, 30000); // 30 seconds timeout
      

  it('should get all books', async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await getBooks(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('should get a book by ID', async () => {
    const book = new Book({ title: 'Test Book', author: 'Author', publicationDate: new Date(), description: 'Description' });
    await book.save();

    const req = { params: { id: book._id } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await getBook(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Test Book',
      author: 'Author'
    }));
  });

  it('should add a new book', async () => {
    const req = {
      body: { title: 'New Book', author: 'New Author', publicationDate: new Date(), description: 'New Description' }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await addBook(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      title: 'New Book',
      author: 'New Author'
    }));
  });

  it('should update a book', async () => {
    const book = new Book({ title: 'Old Book', author: 'Old Author', publicationDate: new Date(), description: 'Old Description' });
    await book.save();

    const req = {
      params: { id: book._id },
      body: { title: 'Updated Book', author: 'Updated Author' }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await updateBook(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Updated Book',
      author: 'Updated Author'
    }));
  });
});
