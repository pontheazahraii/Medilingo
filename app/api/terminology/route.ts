import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const systemId = searchParams.get('systemId');
  
  if (!systemId) {
    return NextResponse.json({ error: 'System ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api-endpoint-227943627758.us-central1.run.app/terminology/system_id=${systemId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API responded with status: ${response.status}` }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching terminology:', error);
    return NextResponse.json(
      { error: 'Failed to fetch terminology data' }, 
      { status: 500 }
    );
  }
} 