import { Metadata } from "next";
import { fetchSanity } from "@/lib/sanity";
import type { Destination, PackageWithDestination } from "@/types";
import { mockDestination, mockPackages } from "@/lib/mockData";
import ChinaDestinationClient from "@/components/ChinaDestinationClient";

// Force dynamic fetch, or let it revalidate
export const revalidate = 60; // Revalidate every minute

// Generate Metadata dynamically from Sanity if configured
export async function generateMetadata(): Promise<Metadata> {
  try {
    const destination = await fetchSanity<Destination>(
      `*[_type == "destination" && slug.current == "cn"][0]`
    );
    
    if (destination) {
      return {
        title: destination.metaTitle || `${destination.name} Travel Destinations | Royal Arabian`,
        description: destination.metaDescription || destination.tagline,
      };
    }
  } catch (err) {
    console.warn("Could not generate metadata from Sanity, falling back to default.");
  }
  
  return {
    title: mockDestination.metaTitle,
    description: mockDestination.metaDescription,
  };
}

export default async function ChinaPage() {
  let destination: Destination | null = null;
  let packages: PackageWithDestination[] = [];
  let isMock = false;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (projectId) {
    try {
      // Fetch destination
      destination = await fetchSanity<Destination>(
        `*[_type == "destination" && slug.current == "cn"][0]`
      );
      
      // Fetch packages
      if (destination) {
        packages = await fetchSanity<PackageWithDestination[]>(
          `*[_type == "package" && destination->slug.current == "cn" && featured == true]`
        );
      }
    } catch (error) {
      console.error("Failed to fetch data from Sanity:", error);
      isMock = true;
    }
  } else {
    // No Sanity project configured yet, use mock fallback
    isMock = true;
  }

  // Fallback to mock data if anything fails or has no values
  if (!destination || packages.length === 0) {
    destination = mockDestination;
    packages = mockPackages;
    isMock = true;
  }

  return (
    <ChinaDestinationClient
      destination={destination}
      packages={packages}
      isMock={isMock}
    />
  );
}
