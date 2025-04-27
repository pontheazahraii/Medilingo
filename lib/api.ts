// API utilities for MediLingo

import { 
  SKELETAL_FLASHCARDS,
  MUSCULAR_FLASHCARDS,
  CIRCULATORY_FLASHCARDS,
  DIGESTIVE_FLASHCARDS,
  RESPIRATORY_FLASHCARDS,
  NERVOUS_FLASHCARDS
} from "@/constants/medical-content";

// Base URL for the API - now using our own proxy endpoint to avoid CORS
const API_BASE_URL = "/api/terminology"; // Relative URL to our proxy

// Type definition for terminology data
export interface TerminologyItem {
  id: number;
  term: string;
  definition: string;
  system_id: number;
  system_name?: string; // Optional field that might be included
  source?: 'api' | 'mock'; // Add source flag to indicate data origin
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
        system_name: "Skeletal System",
        source: 'mock' as const
      })),
      ...MUSCULAR_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 2,
        system_name: "Muscular System",
        source: 'mock' as const
      })),
      ...CIRCULATORY_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 3,
        system_name: "Circulatory System",
        source: 'mock' as const
      })),
      ...DIGESTIVE_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 4,
        system_name: "Digestive System",
        source: 'mock' as const
      })),
      ...RESPIRATORY_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 5,
        system_name: "Respiratory System",
        source: 'mock' as const
      })),
      ...NERVOUS_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 6,
        system_name: "Nervous System",
        source: 'mock' as const
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
        system_name: "Skeletal System",
        source: 'mock' as const
      }));
    case 2:
      return MUSCULAR_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 2,
        system_name: "Muscular System",
        source: 'mock' as const
      }));
    case 3:
      return CIRCULATORY_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 3,
        system_name: "Circulatory System",
        source: 'mock' as const
      }));
    case 4:
      return DIGESTIVE_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 4,
        system_name: "Digestive System",
        source: 'mock' as const
      }));
    case 5:
      return RESPIRATORY_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 5,
        system_name: "Respiratory System",
        source: 'mock' as const
      }));
    case 6:
      return NERVOUS_FLASHCARDS.map(card => ({
        id: card.id,
        term: card.term,
        definition: card.definition,
        system_id: 6,
        system_name: "Nervous System",
        source: 'mock' as const
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
    const url = `${API_BASE_URL}${queryString ? `?${queryString}` : ''}`;

    console.log(`Fetching terminology from: ${url}`);
    
    // Fetch from our proxy endpoint, which handles API calls or serves mock data
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error (${response.status}): ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Our proxy should already include the source flag
    console.log(`Fetched ${data.length} terminology items`);
    
    return data;
  } catch (error) {
    console.error("Error in fetchTerminology:", error);
    
    // Only in case of a network error (not API error), use local fallback
    const mockData = getMockTerminologyData(params.system_id);
    console.log(`Error fetching from proxy, using ${mockData.length} local mock items`);
    return mockData;
  }
} 