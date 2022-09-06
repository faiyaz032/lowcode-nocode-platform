import mongoose from 'mongoose';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const create = catchAsync(async (req, res) => {
  const { targetCollection } = req.params;
  const { db } = mongoose.connection;

  //check if the targeted collection exists on the database
  const existedCollection = await (
    await db.listCollections().toArray()
  ).map(collection => collection.name);
  if (!existedCollection.includes(targetCollection))
    throw new AppError(400, 'Collection does not exists');

  //save the data on database
  await db.collection(targetCollection).insertOne(req.body);

  //send response
  res.status(201).json({ status: 'success', message: 'document created successfully' });
});

export const get = catchAsync(async (req, res) => {
  const { targetCollection } = req.params;
  const { db } = mongoose.connection;

  //check if the targeted collection exists on the database
  const existedCollection = await (
    await db.listCollections().toArray()
  ).map(collection => collection.name);
  if (!existedCollection.includes(targetCollection))
    throw new AppError(400, 'Collection does not exists');

  //get the data from the database
  const data = await db.collection(targetCollection).find().toArray();

  //send response
  res.status(200).json({ status: 'success', message: 'Data fetched successfully', data: data });
});

export const getById = catchAsync(async (req, res) => {
  const { targetCollection, id } = req.params;
  const { db } = mongoose.connection;

  //check if the targeted collection exists on the database
  const existedCollection = await (
    await db.listCollections().toArray()
  ).map(collection => collection.name);

  if (!existedCollection.includes(targetCollection))
    throw new AppError(400, 'Collection does not exists');

  //get the data from database
  const data = await db.collection(targetCollection).findOne({ _id: mongoose.Types.ObjectId(id) });

  //send response
  res.status(200).json({ status: 'success', message: 'Data fetched successfully', data });
});
