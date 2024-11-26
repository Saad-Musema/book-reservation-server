/* eslint-disable no-undef */
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } = require('@jest/globals');
const { createReservation } = require('../controllers/reservationController');
const User = require('../models/User');
const Book = require('../models/Book');
const Reservation = require('../models/Reservation');

describe('Reservation Controller', () => {
  let mongoServer;
  beforeAll(async () => {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });
  
  afterAll(async () => {
      await mongoose.disconnect();
      await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Book.deleteMany({});
    await Reservation.deleteMany({});
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Book.deleteMany({});
    await Reservation.deleteMany({});
  });

  it('should create a reservation', async () => {
    const user = new User({ name: 'User', email: 'user4@example.com', phoneNumber: '1234567890', password: 'password123' });
    await user.save();
    const book = new Book({ title: 'Test Book', author: 'Author', publicationDate: new Date(), description: 'Description' });
    await book.save();

    const req = {
      user: { id: user._id },
      body: { bookId: book._id, startDate: new Date(), endDate: new Date() }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await createReservation(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      user: user._id,
      book: book._id,
      status: 'pending'
    }));
  });

  });
