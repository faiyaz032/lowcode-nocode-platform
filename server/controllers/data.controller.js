import mongoose from 'mongoose';
import { getCrudsModelData } from '../services/data.services.js';
import { createPermission } from '../services/permissions.services.js';
import { createRole } from '../services/roles.services.js';
import { createUser } from '../services/users.services.js';
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

  //if the collection is users then create the doc using the 'User' model
  if (targetCollection == 'users') {
    const user = await createUser(req.body);
    return res.status(201).json({ status: 'success', message: 'user created successfully', user });
  }

  if (targetCollection == 'permissions') {
    const permission = await createPermission(req.body);
    return res
      .status(201)
      .json({ status: 'success', message: 'permission created successfully', permission });
  }

  if (targetCollection == 'roles') {
    const role = await createRole(req.body);
    return res.status(201).json({ status: 'success', message: 'role created successfully', role });
  }

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

  //check if the req if its from game engine
  if (req.isFromGameEngine) {
    //get the fields from model-cruds
    const { inputFields } = await getCrudsModelData(targetCollection);
    //map the object like {field:1}
    const fieldsToReturn = inputFields.reduce((acc, curr) => {
      if (curr.irq === true) acc[curr.name] = 1;
      return acc;
    }, {});
    //query data from the database
    const data = await db.collection(targetCollection).find().project(fieldsToReturn).toArray();
    //send response
    return res
      .status(200)
      .json({ status: 'success', message: 'Data fetched successfully', data: data });
  }

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
