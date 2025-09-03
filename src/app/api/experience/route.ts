import { dbConnect } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = "personal-portfolio"; 

export async function GET() {
  await dbConnect();

  await client.connect();
  const db = client.db(dbName);

  try {
    const experience = await db.collection('experience').find({}).toArray();
    return NextResponse.json({ success: true, data: experience });
  
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch experience' }, { status: 500 });
  }

}