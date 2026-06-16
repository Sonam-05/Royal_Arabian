import { createClient } from "@sanity/client";

// Read environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  console.error("Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set in environment.");
  process.exit(1);
}

if (!token) {
  console.error("Error: SANITY_WRITE_TOKEN is not set in environment. A write token is required to seed data.");
  console.log("Please create a token in your Sanity Manage project settings with 'Editor' or 'Administrator' role.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function uploadImageFromUrl(url: string, filename: string) {
  try {
    console.log(`Downloading and uploading image to Sanity: ${filename}...`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const asset = await client.assets.upload("image", buffer, {
      filename,
    });
    console.log(`Successfully uploaded image asset: ${asset._id}`);
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`Error uploading image from URL ${url}:`, error);
    return null;
  }
}

async function run() {
  console.log("Starting Sanity seeding process...");

  try {
    // 1. Create or update Destination (China)
    const chinaHeroUrl = "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1920&q=80";
    const heroImageAsset = await uploadImageFromUrl(chinaHeroUrl, "china_hero.jpg");

    if (!heroImageAsset) {
      throw new Error("Failed to upload China hero image. Aborting seeding.");
    }

    const destinationDoc = {
      _type: "destination",
      name: "China",
      slug: {
        _type: "slug",
        current: "cn",
      },
      tagline: "Explore the Land of the Dragon",
      heroImage: heroImageAsset,
      description: "China, a land of ancient dynasties and futuristic skylines, offers an unparalleled wealth of travel experiences. From the colossal heights of the Great Wall winding over rugged peaks to the quiet symmetry of Beijing's Forbidden City, the nation is a living museum. Travel from the historic imperial capitals to Shanghai's neon-lit Bund, witnessing how one of the world's oldest civilizations seamlessly integrates with cutting-edge technology and modern lifestyles.\n\nBeyond its historic monuments, China's natural beauty spans dramatic limestone karsts in Guilin, mountain skylines in Chongqing, and lush panda sanctuaries in Sichuan. Whether you are tasting authentic Peking duck, exploring the Silk Road heritage in Xi'an, or walking through the ancient gardens of Suzhou, every city reveals a new dimension. For global travel partners, China represents a highly diverse and dynamic destination designed to inspire and captivate every type of traveller.",
      highlights: [
        "Walk the iconic Great Wall of China",
        "Explore the imperial Forbidden City in Beijing",
        "Uncover the historic Terracotta Warriors in Xi'an",
        "See Giant Pandas in Chengdu conservation centers",
        "Cruise the historic Bund in Shanghai"
      ],
      goodToKnow: [
        {
          _key: "gtk1",
          title: "Visa Requirements",
          content: "Most visitors require a visa to enter China. Ensure your passport is valid for at least 6 months beyond your planned stay."
        },
        {
          _key: "gtk2",
          title: "Best Time to Visit",
          content: "Spring (April to May) and Autumn (September to October) offer the most pleasant weather across most regions."
        },
        {
          _key: "gtk3",
          title: "Currency & Payments",
          content: "Renminbi (RMB / Yuan). Digital payments via WeChat Pay and Alipay are widely accepted and preferred over cash or foreign cards."
        },
        {
          _key: "gtk4",
          title: "Language & Apps",
          content: "Mandarin Chinese is the official language. English is spoken in tourist areas, but translation and navigation apps (like Baidu/Amap) are highly recommended."
        }
      ],
      metaTitle: "China Travel Destinations | Royal Arabian DMC",
      metaDescription: "Explore China's top travel destinations including Beijing, Shanghai, Xi'an, and Chengdu. Discover curated packages, corporate tours, and travel services."
    };

    console.log("Saving China destination document...");
    // Use an id based on the slug to make it upsertable
    const destinationId = "destination-china";
    const savedDestination = await client.createOrReplace({
      _id: destinationId,
      ...destinationDoc
    });
    console.log(`Saved Destination: ${savedDestination._id}`);

    // 2. Define packages
    const packagesToSeed = [
      {
        slug: "china-highlights-tour",
        imageUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80",
        doc: {
          _type: "package",
          name: "China Highlights Tour",
          slug: { _type: "slug", current: "china-highlights-tour" },
          destination: {
            _type: "reference",
            _ref: destinationId
          },
          duration: "8 Days / 7 Nights",
          price: 3499,
          originalPrice: 4299,
          shortDescription: "Discover the classic landmarks of Beijing and Shanghai, including the Great Wall and the Bund, with premium B2B travel support.",
          included: [
            "4-Star Hotel Accommodation",
            "Daily Buffet Breakfast & Local Lunches",
            "All Domestic High-Speed Rail Tickets",
            "Professional English-Speaking Guides",
            "All Airport & Station Private Transfers"
          ],
          itinerary: [
            {
              _key: "it1",
              day: 1,
              title: "Arrival in Beijing",
              description: "Welcome to China! Upon arrival at Beijing Capital International Airport, you will be met by our representative and transferred to your premium hotel. Enjoy a welcome briefing and free time to rest or explore at your own pace."
            },
            {
              _key: "it2",
              day: 2,
              title: "Forbidden City & Temple of Heaven",
              description: "Begin your exploration at the iconic Tiananmen Square before entering the majestic Forbidden City, home to 24 emperors. After lunch, visit the Temple of Heaven, a masterpiece of Ming Dynasty architecture where emperors prayed for good harvests."
            },
            {
              _key: "it3",
              day: 3,
              title: "The Great Wall Excursion",
              description: "Travel to the Mutianyu section of the Great Wall, famous for its watchtowers and breathtaking scenery. Ascend via cable car, walk along the historic ramparts, and enjoy a thrilling toboggan ride down. Return to the city for a traditional Peking Duck welcome dinner."
            },
            {
              _key: "it4",
              day: 4,
              title: "Bullet Train to Shanghai",
              description: "Transfer to Beijing South Railway Station to board a high-speed bullet train to Shanghai. Travelling at speeds of up to 350 km/h, you will experience the modern face of Chinese infrastructure. Arrive in Shanghai and check in to your hotel."
            },
            {
              _key: "it5",
              day: 5,
              title: "Old Shanghai & Modern Heights",
              description: "Explore the classical Yu Garden, a peaceful retreat dating back to the Ming Dynasty. Then, cross the Huangpu River to Lujiazui, the financial district, to ascend the Shanghai Tower for a stunning panoramic view. Stroll along the historic Bund in the evening."
            },
            {
              _key: "it6",
              day: 6,
              title: "Suzhou Canal Gardens Day Trip",
              description: "Take a short high-speed train ride to Suzhou, the 'Venice of the East'. Visit the Humble Administrator's Garden, one of China's most famous classical gardens, and take a traditional wooden boat ride along the ancient canals of Shantang Street."
            },
            {
              _key: "it7",
              day: 7,
              title: "Nanjing Road & Huangpu Cruise",
              description: "Enjoy a day at leisure for shopping on the bustling Nanjing Road or exploring the trendy French Concession. In the evening, gather for a farewell dinner followed by a luxury cruise on the Huangpu River, viewing the lit-up skylines."
            },
            {
              _key: "it8",
              day: 8,
              title: "Departure from Shanghai",
              description: "Enjoy a final breakfast at your hotel before checking out. Transfer to Shanghai Pudong International Airport via the Maglev train (optional) for your return flight home, bringing back memories of an unforgettable journey."
            }
          ],
          featured: true
        }
      },
      {
        slug: "imperial-wonders-pandas",
        imageUrl: "https://images.unsplash.com/photo-1547989453-11e67ffb3885?auto=format&fit=crop&w=1200&q=80",
        doc: {
          _type: "package",
          name: "Imperial Wonders & Pandas",
          slug: { _type: "slug", current: "imperial-wonders-pandas" },
          destination: {
            _type: "reference",
            _ref: destinationId
          },
          duration: "10 Days / 9 Nights",
          price: 4599,
          originalPrice: 5499,
          shortDescription: "An immersive journey through Beijing's imperial sites, Xi'an's Terracotta Army, and Chengdu's world-famous Giant Panda sanctuaries.",
          included: [
            "5-Star Hotel Accommodation",
            "All Internal Flights & High-Speed Rail Tickets",
            "Entrance Fees to All Listed Attractions",
            "Special Chengdu Giant Panda breeding center entry",
            "Daily Breakfast & Authentic Sichuan Hotpot Dinner"
          ],
          itinerary: [
            {
              _key: "it1",
              day: 1,
              title: "Arrival in Beijing",
              description: "Arrive in Beijing and receive a warm welcome from our private driver. Transfer to your 5-star hotel and enjoy the rest of the day to recover from jet lag."
            },
            {
              _key: "it2",
              day: 2,
              title: "Imperial Beijing Exploration",
              description: "Explore the massive Tiananmen Square and the sprawling Forbidden City. In the afternoon, visit the Summer Palace, the former imperial retreat set around the scenic Kunming Lake."
            },
            {
              _key: "it3",
              day: 3,
              title: "Great Wall & Hutong Tour",
              description: "Visit the Mutianyu Great Wall in the morning. In the afternoon, explore Beijing's ancient alleys (Hutongs) on a rickshaw, visiting a local family to learn about traditional courtyard living."
            },
            {
              _key: "it4",
              day: 4,
              title: "Flight to Xi'an",
              description: "Board a domestic flight to Xi'an, the ancient capital and starting point of the Silk Road. Visit the historic Big Wild Goose Pagoda and stroll through the lively Muslim Quarter in the evening."
            },
            {
              _key: "it5",
              day: 5,
              title: "Terracotta Warriors & City Wall",
              description: "Marvel at the world-famous Terracotta Warriors, thousands of life-sized clay soldiers buried with the first emperor. In the afternoon, ride a bicycle along the top of Xi'an's remarkably preserved 14th-century Ancient City Wall."
            },
            {
              _key: "it6",
              day: 6,
              title: "Bullet Train to Chengdu",
              description: "Take a high-speed train through the Qinling Mountains to Chengdu, the capital of Sichuan province. Check in and experience a traditional teahouse in People's Park to experience the local laid-back culture."
            },
            {
              _key: "it7",
              day: 7,
              title: "Chengdu Giant Panda Breeding Base",
              description: "Spend the morning at the Giant Panda Breeding Research Base, observing giant pandas and cute red pandas in naturalistic bamboo enclosures. In the evening, enjoy a famous fiery Sichuan Hotpot dinner."
            },
            {
              _key: "it8",
              day: 8,
              title: "Mount Qingcheng Day Trip",
              description: "Take an excursion to Mount Qingcheng, one of the birthplaces of Taoism. Hike or take a cable car up the forest-clad slopes, passing ancient wooden temples and enjoying the serene atmosphere."
            },
            {
              _key: "it9",
              day: 9,
              title: "Leshan Giant Buddha excursion",
              description: "Travel to Leshan to see the Giant Buddha, a 71-meter tall stone statue carved directly into the cliffside during the Tang Dynasty. View it via a scenic boat cruise at the confluence of three rivers."
            },
            {
              _key: "it10",
              day: 10,
              title: "Departure from Chengdu",
              description: "Transfer to Chengdu Shuangliu International Airport for your departure flight, carrying memories of imperial architecture, ancient treasures, and adorable pandas."
            }
          ],
          featured: true
        }
      },
      {
        slug: "sichuan-yangtze-cruise",
        imageUrl: "https://images.unsplash.com/photo-1543097692-fa13c6cd8595?auto=format&fit=crop&w=1200&q=80",
        doc: {
          _type: "package",
          name: "Sichuan & Yangtze River Cruise",
          slug: { _type: "slug", current: "sichuan-yangtze-cruise" },
          destination: {
            _type: "reference",
            _ref: destinationId
          },
          duration: "12 Days / 11 Nights",
          price: 5999,
          shortDescription: "A scenic journey combining Chengdu pandas and cuisine with a 4-night luxury Yangtze River cruise through the Three Gorges.",
          included: [
            "4-Night Luxury Yangtze River Cruise Cabin",
            "5-Star Hotels in Chengdu & Chongqing",
            "All Shore Excursion Fees during Cruise",
            "Full Board Meals on Cruise Ship",
            "All Transfers and High-Speed Rail Tickets"
          ],
          itinerary: [
            {
              _key: "it1",
              day: 1,
              title: "Arrival in Chengdu",
              description: "Arrive in Chengdu and transfer to your luxury hotel. Enjoy a relaxing evening exploring the nearby dining options."
            },
            {
              _key: "it2",
              day: 2,
              title: "Pandas & Jinli Street",
              description: "Visit the Giant Panda Research Base in the morning. In the afternoon, wander the historic Jinli Pedestrian Street, sampling local snacks and shopping for traditional handicrafts."
            },
            {
              _key: "it3",
              day: 3,
              title: "Train to Chongqing & Board Cruise",
              description: "Take a bullet train to Chongqing, a spectacular mountain megacity. Take a brief city tour of the Jiefangbei square and Hongyadong stilt houses before boarding your luxury Yangtze River cruise ship in the evening."
            },
            {
              _key: "it4",
              day: 4,
              title: "Yangtze Cruise: Fengdu Ghost City",
              description: "Enjoy your first day on the river. Take a shore excursion to Fengdu Ghost City, an ancient temple complex dedicated to the afterlife, featuring colorful statues and shrines."
            },
            {
              _key: "it5",
              day: 5,
              title: "Yangtze Cruise: The Three Gorges",
              description: "Sail through the magnificent Qutang Gorge and Wu Gorge. Board smaller wooden boats for an excursion along the emerald waters of Shennong Stream or Lesser Three Gorges."
            },
            {
              _key: "it6",
              day: 6,
              title: "Three Gorges Dam Shore Excursion",
              description: "Visit the massive Three Gorges Dam project, the world's largest hydroelectric dam. Learn about its construction and take in views of the lock system."
            },
            {
              _key: "it7",
              day: 7,
              title: "Disembark in Yichang & Fly to Shanghai",
              description: "Disembark the cruise in Yichang. Transfer to the airport for a flight to Shanghai. Check in to your hotel near the Bund and enjoy a relaxed evening."
            },
            {
              _key: "it8",
              day: 8,
              title: "Shanghai Highlights",
              description: "Visit the classical Yu Garden, the former French Concession, and walk along the Bund to see the colonial architecture contrasted with the futuristic skyline."
            },
            {
              _key: "it9",
              day: 9,
              title: "Zhujiajiao Water Town",
              description: "Take a day trip to Zhujiajiao, a charming 1,700-year-old water town. Take a gondola ride through its narrow canals, passing under stone bridges and historic homes."
            },
            {
              _key: "it10",
              day: 10,
              title: "Shanghai Leisure & Farewell Dinner",
              description: "Enjoy a free day for shopping or independent exploration. In the evening, gather for a high-end farewell dinner at a restaurant overlooking the Huangpu River."
            },
            {
              _key: "it11",
              day: 11,
              title: "Departure from Shanghai",
              description: "Transfer to Pudong International Airport for your flight home, concluding your comprehensive tour of China's rivers, cities, and wonders."
            }
          ],
          featured: true
        }
      }
    ];

    for (const pkg of packagesToSeed) {
      console.log(`Processing package: ${pkg.doc.name}...`);
      const packageImage = await uploadImageFromUrl(pkg.imageUrl, `${pkg.slug}.jpg`);
      
      const pkgDoc = {
        ...pkg.doc,
        heroImage: packageImage || (pkg.doc as any).heroImage // Fallback if upload fails
      };

      const packageId = `package-${pkg.slug}`;
      const savedPkg = await client.createOrReplace({
        _id: packageId,
        ...pkgDoc
      } as any);
      console.log(`Saved Package: ${savedPkg._id}`);
    }

    console.log("Seeding process completed successfully!");
  } catch (error) {
    console.error("Error seeding Sanity:", error);
    process.exit(1);
  }
}

run();
