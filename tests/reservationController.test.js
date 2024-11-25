const mongoose = require('mongoose');
const jest = require('jest');
const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const { createReservation, updateReservationStatus } = require('../controllers/reservationController');
const User = require('../models/User');
const Book = require('../models/Book');
const Reservation = require('../models/Reservation');
const config = require('../config/database');

describe('Reservation Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a reservation', async () => {
    const user = new User({ name: 'User', email: 'user@example.com', phoneNumber: '1234567890', password: 'password123' });
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

  it('should update reservation status', async () => {
    const reservation = new Reservation({ user: mongoose.Types.ObjectId(), book: mongoose.Types.ObjectId(), startDate: new Date(), endDate: new Date(), status: 'pending' });
    await reservation.save();

    const req = {
      params: { id: reservation._id },
      body: { status: 'approved' }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await updateReservationStatus(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      status: 'approved'
    }));
  });
});