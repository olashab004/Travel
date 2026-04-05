import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

const RAW_DATA = {
  "states": [
    {
      "id": "rajasthan",
      "name": "Rajasthan",
      "capital": "Jaipur",
      "region": "North India",
      "tagline": "The Land of Kings",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Amber_fort.jpg/1280px-Amber_fort.jpg",
      "description": "Rajasthan is India's largest state, known for its majestic forts, vibrant culture, colourful festivals, and the golden Thar Desert.",
      "bestTimeToVisit": "October to March",
      "language": "Hindi, Rajasthani",
      "places": [
        {
          "id": "amber-fort",
          "name": "Amber Fort",
          "city": "Jaipur",
          "category": "Heritage",
          "description": "Amber Fort is a magnificent hilltop fort built in 1592 by Raja Man Singh I. It blends Hindu and Mughal architecture with grand palaces, halls, gardens and temples. The Sheesh Mahal (Mirror Palace) inside is especially stunning.",
          "bestTimeToVisit": "October to March",
          "entryFee": "₹100 (Indians), ₹500 (Foreigners)",
          "timings": "8:00 AM – 5:30 PM",
          "mapLink": "https://maps.google.com/?q=Amber+Fort+Jaipur",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Amber_fort.jpg/1280px-Amber_fort.jpg"],
          "nearbyAttractions": ["Jaigarh Fort", "Nahargarh Fort", "Hawa Mahal"],
          "tags": ["UNESCO Tentative List", "Mughal Architecture", "Hilltop Fort"]
        },
        {
          "id": "hawa-mahal",
          "name": "Hawa Mahal",
          "city": "Jaipur",
          "category": "Heritage",
          "description": "The Palace of Winds, built in 1799 by Maharaja Sawai Pratap Singh, is a five-storey honeycomb sandstone facade with 953 small windows adorned with intricate latticework, allowing royal ladies to observe street life.",
          "bestTimeToVisit": "November to February",
          "entryFee": "₹50 (Indians), ₹200 (Foreigners)",
          "timings": "9:00 AM – 4:30 PM",
          "mapLink": "https://maps.google.com/?q=Hawa+Mahal+Jaipur",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Hawa_Mahal_Jaipur.jpg/800px-Hawa_Mahal_Jaipur.jpg"],
          "nearbyAttractions": ["City Palace", "Jantar Mantar", "Amber Fort"],
          "tags": ["Pink City", "Rajput Architecture", "Iconic Landmark"]
        }
      ]
    },
    {
      "id": "kerala",
      "name": "Kerala",
      "capital": "Thiruvananthapuram",
      "region": "South India",
      "tagline": "God's Own Country",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Kumarakom_backwaters.jpg/1280px-Kumarakom_backwaters.jpg",
      "description": "Kerala is famous for its palm-lined beaches, serene backwaters, lush hill stations, Ayurvedic treatments, and rich cultural heritage including Kathakali dance.",
      "bestTimeToVisit": "September to March",
      "language": "Malayalam",
      "places": [
        {
          "id": "alleppey-backwaters",
          "name": "Alleppey Backwaters",
          "city": "Alappuzha",
          "category": "Nature",
          "description": "Alleppey, known as the Venice of the East, is famous for its houseboat cruises through a network of canals, lagoons, and lakes. The backwaters support a rich biodiversity and unique fishing communities.",
          "bestTimeToVisit": "November to February",
          "entryFee": "Free (Houseboat charges: ₹8,000–₹25,000/night)",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Alleppey+Backwaters+Kerala",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Kumarakom_backwaters.jpg/1280px-Kumarakom_backwaters.jpg"],
          "nearbyAttractions": ["Kumarakom", "Kuttanad", "Marari Beach"],
          "tags": ["Houseboat", "Backwaters", "Venice of the East"]
        },
        {
          "id": "munnar",
          "name": "Munnar Tea Gardens",
          "city": "Munnar",
          "category": "Nature",
          "description": "Munnar is a hill station at 1,600m altitude, blanketed with sprawling tea plantations. It is home to the rare Neelakurinji flowers that bloom once every 12 years and the Eravikulam National Park.",
          "bestTimeToVisit": "September to March",
          "entryFee": "Free",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Munnar+Kerala",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Munnar_2.jpg/1280px-Munnar_2.jpg"],
          "nearbyAttractions": ["Eravikulam National Park", "Mattupetty Dam", "Top Station"],
          "tags": ["Hill Station", "Tea Plantation", "Neelakurinji"]
        }
      ]
    },
    {
      "id": "uttar-pradesh",
      "name": "Uttar Pradesh",
      "capital": "Lucknow",
      "region": "North India",
      "tagline": "The Heart of Incredible India",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1280px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg",
      "description": "Uttar Pradesh is India's most historically rich state, home to the Taj Mahal, Varanasi ghats, and the birthplace of Lord Ram in Ayodhya.",
      "bestTimeToVisit": "October to March",
      "language": "Hindi, Urdu",
      "places": [
        {
          "id": "taj-mahal",
          "name": "Taj Mahal",
          "city": "Agra",
          "category": "Heritage",
          "description": "A UNESCO World Heritage Site and one of the Seven Wonders of the World, the Taj Mahal was built by Mughal Emperor Shah Jahan between 1631 and 1648 as a mausoleum for his wife Mumtaz Mahal.",
          "bestTimeToVisit": "October to March",
          "entryFee": "₹50 (Indians), ₹1,300 (Foreigners)",
          "timings": "6:00 AM – 6:30 PM (Closed Fridays)",
          "mapLink": "https://maps.google.com/?q=Taj+Mahal+Agra",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1280px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg"],
          "nearbyAttractions": ["Agra Fort", "Fatehpur Sikri", "Itmad-ud-Daula"],
          "tags": ["Seven Wonders", "UNESCO World Heritage", "Mughal Architecture"]
        }
      ]
    }
  ]
};

export async function seedInitialData() {
  const statesSnapshot = await getDocs(collection(db, 'states'));
  if (!statesSnapshot.empty) {
    console.log('States already exist, skipping seed.');
    return;
  }

  console.log('Seeding data...');
  
  for (const stateData of RAW_DATA.states) {
    const stateRef = await addDoc(collection(db, 'states'), {
      name: stateData.name,
      code: stateData.id.substring(0, 2).toUpperCase(),
      description: stateData.description,
      imageUrl: stateData.coverImage,
      capital: stateData.capital,
      region: stateData.region,
      tagline: stateData.tagline,
      language: stateData.language
    });

    const cityMap: Record<string, string> = {};

    for (const placeData of stateData.places) {
      let cityId = cityMap[placeData.city];
      
      if (!cityId) {
        const cityRef = await addDoc(collection(db, 'cities'), {
          name: placeData.city,
          stateId: stateRef.id,
          description: `Explore the beautiful city of ${placeData.city} in ${stateData.name}.`
        });
        cityId = cityRef.id;
        cityMap[placeData.city] = cityId;
      }

      await addDoc(collection(db, 'places'), {
        name: placeData.name,
        stateId: stateRef.id,
        cityId: cityId,
        category: placeData.category,
        description: placeData.description,
        bestTimeToVisit: placeData.bestTimeToVisit,
        entryFees: placeData.entryFee,
        timings: placeData.timings,
        locationUrl: placeData.mapLink,
        imageUrls: placeData.images,
        nearbyAttractions: placeData.nearbyAttractions,
        tags: placeData.tags,
        isFeatured: true // Mark seeded places as featured for the homepage
      });
    }
  }
  
  console.log('Seed completed!');
}
