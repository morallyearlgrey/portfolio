import { dbConnect } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = "IEEE-Website"; 

export async function GET() {
  await dbConnect();

  await client.connect();
  const db = client.db(dbName);

  try {
    const projects = await db.collection('Projects').find({}).toArray();
    return NextResponse.json({ success: true, data: projects });
  
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 });
  }

}