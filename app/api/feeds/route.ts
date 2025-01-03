import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUser } from '@/lib/session';

const clientID = process.env.IMGUR_CLIENT_ID;
export async function POST(req: NextRequest) {
  const user = await getUser();
  const receievedFormData = await req.formData();

  const image = receievedFormData.get('image') as File;

  // Upload image to Imgur using fetch
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Client-ID ${clientID}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Image upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    const imgurLink = data.data.link; // Extract image link

    console.log('Image uploaded to Imgur:', imgurLink);

    // Create news feed post in database
    const newsFeed = await db.newsFeeds.create({
      data: {
        title: receievedFormData.get('title') as string,
        content: receievedFormData.get('content') as string,
        image: imgurLink,
        author: user?.name as string,
        isPublic: true
      },
    });
    return NextResponse.json({ message: 'Files Created', newsFeed });
  } catch (error) {
    console.error("Error uploading image to Imgur:", error);
    return NextResponse.json({ message: 'Image upload failed' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const authorizationHeader = req.headers.get('Authorization');

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // Remove "Bearer " from the token
    // Now 'token' contains the actual token value
    const isValid = await db.accessToken.findUnique({
      where: {
        token,
        expiresAt: {
          gte: new Date(new Date().getTime() - 60 * 60 * 24 * 1000),
        },
      },
    });
    if (isValid) {
      const newsFeeds = await db.newsFeeds.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return NextResponse.json(newsFeeds);
    }
    return NextResponse.json({ message: "Authorization token not valid", status: 401 });
  } else {
    // Handle the case where the token is not provided or is not in the correct format
    return NextResponse.json({ message: 'Token invalid or expired' }, { status: 401 });
  }
}
