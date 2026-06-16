import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchSanity } from "@/lib/sanity";
import type { PackageWithDestination } from "@/types";
import { mockPackages } from "@/lib/mockData";
import PackageDetailClient from "@/components/PackageDetailClient";

export const revalidate = 60; // Revalidate every minute

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate Metadata dynamically from Sanity if configured
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;

  try {
    const pkg = await fetchSanity<PackageWithDestination>(
      `*[_type == "package" && slug.current == $slug][0]`,
      { slug }
    );
    
    if (pkg) {
      return {
        title: `${pkg.name} | China Tour Package | Royal Arabian`,
        description: pkg.shortDescription,
      };
    }
  } catch (err) {
    console.warn("Could not generate package metadata from Sanity, falling back.");
  }
  
  // Fallback to mock data matching slug
  const mockPkg = mockPackages.find(p => p.slug.current === slug);
  if (mockPkg) {
    return {
      title: `${mockPkg.name} | China Tour Package | Royal Arabian`,
      description: mockPkg.shortDescription,
    };
  }

  return {
    title: "China Travel Package | Royal Arabian DMC",
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = params;
  let pkg: PackageWithDestination | null = null;
  let isMock = false;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (projectId) {
    try {
      pkg = await fetchSanity<PackageWithDestination>(
        `*[_type == "package" && slug.current == $slug][0] {
          ...,
          destination-> {
            name,
            slug,
            tagline,
            heroImage,
            description,
            highlights,
            goodToKnow
          }
        }`,
        { slug }
      );
    } catch (error) {
      console.error(`Failed to fetch package ${slug} from Sanity:`, error);
      isMock = true;
    }
  } else {
    isMock = true;
  }

  // Fallback to mock data if not found or failed
  if (!pkg) {
    const foundMock = mockPackages.find(p => p.slug.current === slug);
    if (foundMock) {
      pkg = foundMock;
      isMock = true;
    }
  }

  // If still not found, return Next.js 404
  if (!pkg) {
    return notFound();
  }

  return (
    <PackageDetailClient
      pkg={pkg}
      isMock={isMock}
    />
  );
}
