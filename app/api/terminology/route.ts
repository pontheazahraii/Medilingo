import { NextRequest, NextResponse } from 'next/server';
import { 
  SKELETAL_FLASHCARDS,
  MUSCULAR_FLASHCARDS,
  CIRCULATORY_FLASHCARDS,
  DIGESTIVE_FLASHCARDS,
  RESPIRATORY_FLASHCARDS,
  NERVOUS_FLASHCARDS
} from "@/constants/medical-content";

const API_BASE_URL = "https://api-endpoint-227943627758.us-central1.run.app";

// Helper function to get mock data when the API fails
function getMockTerminologyData(systemId?: string | null) {
  const systemIdNum = systemId ? parseInt(systemId) : undefined;
  
  // Map the appropriate mock data based on system ID
  switch (systemIdNum) {
    case 1:
      return SKELETAL_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 1,
        system_name: "Skeletal System"
      }));
    case 2:
      return MUSCULAR_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 2,
        system_name: "Muscular System"
      }));
    case 3:
      return CIRCULATORY_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 3,
        system_name: "Circulatory System"
      }));
    case 4:
      return DIGESTIVE_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 4,
        system_name: "Digestive System"
      }));
    case 5:
      return RESPIRATORY_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 5,
        system_name: "Respiratory System"
      }));
    case 6:
      return NERVOUS_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 6,
        system_name: "Nervous System"
      }));
    default:
      // If no system ID or unrecognized ID, return all flashcards
      return [
        ...SKELETAL_FLASHCARDS.map(card => ({
          id: card.id,
          term: card.term,
          definition: card.definition,
          system_id: 1,
          system_name: "Skeletal System"
        })),
        ...MUSCULAR_FLASHCARDS.map(card => ({
          id: card.id,
          term: card.term,
          definition: card.definition,
          system_id: 2,
          system_name: "Muscular System"
        })),
        ...CIRCULATORY_FLASHCARDS.map(card => ({
          id: card.id,
          term: card.term,
          definition: card.definition,
          system_id: 3,
          system_name: "Circulatory System"
        })),
        ...DIGESTIVE_FLASHCARDS.map(card => ({
          id: card.id,
          term: card.term,
          definition: card.definition,
          system_id: 4,
          system_name: "Digestive System"
        })),
        ...RESPIRATORY_FLASHCARDS.map(card => ({
          id: card.id,
          term: card.term,
          definition: card.definition,
          system_id: 5,
          system_name: "Respiratory System"
        })),
        ...NERVOUS_FLASHCARDS.map(card => ({
          id: card.id,
          term: card.term,
          definition: card.definition,
          system_id: 6,
          system_name: "Nervous System"
        }))
      ];
  }
}

/**
 * This is a proxy API route that forwards requests to the terminology API
 * or provides fallback mock data if the API fails.
 */
export async function GET(request: NextRequest) {
  // Extract search parameters from the incoming request
  const { searchParams } = new URL(request.url);
  const systemId = searchParams.get('system_id');
  const term = searchParams.get('term');
  const skip = searchParams.get('skip');
  const limit = searchParams.get('limit');
  
  // Build query string for the API request
  const queryParams = new URLSearchParams();
  if (systemId) queryParams.append('system_id', systemId);
  if (term) queryParams.append('term', term);
  if (skip) queryParams.append('skip', skip);
  if (limit) queryParams.append('limit', limit);
  
  const queryString = queryParams.toString();
  const url = `${API_BASE_URL}/terminology${queryString ? `?${queryString}` : ''}`;
  
  try {
    console.log(`Proxying request to: ${url}`);
    
    // Forward the request to the actual API with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    }).catch(error => {
      console.log('Fetch error, returning mock data:', error.message);
      clearTimeout(timeoutId);
      return null;
    });
    
    clearTimeout(timeoutId);
    
    // If the response exists and is OK, return the API data
    if (response && response.ok) {
      try {
        const data = await response.json();
        console.log(`Received ${data.length} items from API`);
        
        // Add a source flag to indicate this is from the real API
        const dataWithSource = data.map((item: any) => ({
          ...item,
          source: 'api'
        }));
        
        return NextResponse.json(dataWithSource);
      } catch (jsonError) {
        console.error('Error parsing API response:', jsonError);
        // Fall through to mock data
      }
    }
    
    // If we reach here, either the response failed or wasn't OK
    // Return mock data as a fallback
    console.log(`API unavailable or errored, using mock data for system_id: ${systemId || 'all'}`);
    const mockData = getMockTerminologyData(systemId);
    
    // Add a source flag to indicate this is mock data
    const mockDataWithSource = mockData.map(item => ({
      ...item,
      source: 'mock'
    }));
    
    return NextResponse.json(mockDataWithSource);
  } catch (error) {
    console.error('Error in terminology proxy:', error);
    
    // Even in case of error, return mock data
    const mockData = getMockTerminologyData(systemId);
    
    // Add a source flag to indicate this is mock data
    const mockDataWithSource = mockData.map(item => ({
      ...item,
      source: 'mock'
    }));
    
    return NextResponse.json(mockDataWithSource);
  }
} 