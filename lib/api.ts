// API utilities for MediLingo

import { 
  SKELETAL_FLASHCARDS,
  MUSCULAR_FLASHCARDS,
  CIRCULATORY_FLASHCARDS,
  DIGESTIVE_FLASHCARDS,
  RESPIRATORY_FLASHCARDS,
  NERVOUS_FLASHCARDS
} from "@/constants/medical-content";

// Base URL for the API
const API_BASE_URL = "https://api-endpoint-227943627758.us-central1.run.app";

// Type definition for terminology data
export interface TerminologyItem {
  id: number;
  term: string;
  definition: string;
  system_id: number;
  system_name?: string; // Optional field that might be included
}

export interface TerminologyParams {
  system_id?: number;
  term?: string;
  skip?: number;
  limit?: number;
}

/**
 * Maps local flashcard mock data to the API format
 * Used as a fallback when the API is not available
 */
function getMockTerminologyData(systemId?: number): TerminologyItem[] {
  // If no system_id is provided, return all flashcards
  if (systemId === undefined) {
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

  // Return flashcards for the specific system
  switch (systemId) {
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
      return [];
  }
}

/**
 * Fetches terminology data from the API
 * @param params Optional parameters to filter and paginate results
 * @returns Promise containing the terminology data
 */
export async function fetchTerminology(params: TerminologyParams = {}): Promise<TerminologyItem[]> {
  try {
    // Build query string from params
    const queryParams = new URLSearchParams();
    if (params.system_id !== undefined) queryParams.append("system_id", params.system_id.toString());
    if (params.term) queryParams.append("term", params.term);
    if (params.skip !== undefined) queryParams.append("skip", params.skip.toString());
    if (params.limit !== undefined) queryParams.append("limit", params.limit.toString());

    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/terminology${queryString ? `?${queryString}` : ''}`;

    console.log(`Fetching terminology from: ${url}`);
    
    // Try to fetch from the API
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details available');
        throw new Error(`API error (${response.status}): ${errorText}`);
      }
      
      const data = await response.json();
      
      // Log the data count for debugging
      console.log(`Fetched ${data.length} terminology items from API`);
      
      return data;
    } catch (apiError) {
      // If there's a CORS or network error, fall back to mock data
      console.warn(`API call failed, using mock data instead: ${apiError}`);
      const mockData = getMockTerminologyData(params.system_id);
      console.log(`Using ${mockData.length} mock terminology items`);
      return mockData;
    }
  } catch (error) {
    console.error("Error in fetchTerminology:", error);
    throw error;
  }
} 