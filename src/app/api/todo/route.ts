import { dbConnect } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = "personal-portfolio"; 

export async function GET() {
  await dbConnect();

  await client.connect();
  const db = client.db(dbName);

  try {
    const todo = await db.collection('todo').find({}).toArray();
    return NextResponse.json({ success: true, data: todo });
  
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch todo' }, { status: 500 });
  }

}

export async function POST(req: Request) {
  await dbConnect();

  await client.connect();
  const db = client.db(dbName);

  try {
    const body = await req.json();
    const result = await db.collection('todo').insertOne(body);
    return NextResponse.json({ success: true, data: { ...body, _id: result.insertedId } }, { status: 201 });

  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create todo' }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  await dbConnect();
  await client.connect();
  const db = client.db(dbName);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  try {
    const body = await req.json();
  await db.collection('todo').updateOne({ _id: new ObjectId(id) }, { $set: { isComplete: body.isComplete } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update task' }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  await client.connect();
  const db = client.db(dbName);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  try {
    const body = await req.json();
  await db.collection('todo').updateOne({ _id: new ObjectId(id) }, { $set: { subject: body.subject, description: body.description } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to edit task' }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  await dbConnect();
  await client.connect();
  const db = client.db(dbName);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  try {
  await db.collection('todo').deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete task' }, { status: 400 });
  }
}