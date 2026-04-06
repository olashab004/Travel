import { collection, addDoc, getDocs, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';

const RAW_DATA = {
  "states": [
    {
      "id": "rajasthan",
      "name": "Rajasthan",
      "capital": "Jaipur",
      "region": "North India",
      "tagline": "The Land of Kings",
      "coverImage": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      "description": "Rajasthan is India's largest state, known for its majestic forts, vibrant culture, colourful festivals, and the golden Thar Desert.",
      "bestTimeToVisit": "October to March",
      "language": "Hindi, Rajasthani",
      "places": [
        {
          "id": "amber-fort",
          "name": "Amber Fort",
          "city": "Jaipur",
          "category": "Heritage",
          "description": "Amber Fort is a magnificent hilltop fort built in 1592 by Raja Man Singh I. It blends Hindu and Mughal architecture with grand palaces, halls, gardens and temples.",
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
          "description": "The Palace of Winds, built in 1799 by Maharaja Sawai Pratap Singh, is a five-storey honeycomb sandstone facade with 953 small windows.",
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
      "coverImage": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      "description": "Kerala is famous for its palm-lined beaches, serene backwaters, lush hill stations, and Ayurvedic treatments.",
      "bestTimeToVisit": "September to March",
      "language": "Malayalam",
      "places": [
        {
          "id": "alleppey-backwaters",
          "name": "Alleppey Backwaters",
          "city": "Alappuzha",
          "category": "Nature",
          "description": "Alleppey, known as the Venice of the East, is famous for its houseboat cruises through a network of canals, lagoons, and lakes.",
          "bestTimeToVisit": "November to February",
          "entryFee": "Free (Houseboat charges: ₹8,000–₹25,000/night)",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Alleppey+Backwaters+Kerala",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Kumarakom_backwaters.jpg/1280px-Kumarakom_backwaters.jpg"],
          "nearbyAttractions": ["Kumarakom", "Kuttanad", "Marari Beach"],
          "tags": ["Houseboat", "Backwaters", "Venice of the East"]
        },
        {
          "id": "munnar-tea-gardens",
          "name": "Munnar Tea Gardens",
          "city": "Munnar",
          "category": "Nature",
          "description": "Munnar is a picturesque hill station famous for its sprawling tea plantations, misty mountains, and diverse flora and fauna.",
          "bestTimeToVisit": "September to May",
          "entryFee": "Free",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Munnar+Tea+Gardens",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Munnar_tea_plantation.jpg/1280px-Munnar_tea_plantation.jpg"],
          "nearbyAttractions": ["Eravikulam National Park", "Mattupetty Dam", "Anamudi Peak"],
          "tags": ["Hill Station", "Tea Plantation", "Misty Mountains"]
        }
      ]
    },
    {
      "id": "uttarakhand",
      "name": "Uttarakhand",
      "capital": "Dehradun",
      "region": "North India",
      "tagline": "The Land of Gods",
      "coverImage": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      "description": "Uttarakhand is known as Devbhoomi (abode of gods). It offers Himalayan treks and sacred pilgrimage sites.",
      "bestTimeToVisit": "May to June, September to November",
      "language": "Hindi, Garhwali, Kumaoni",
      "places": [
        {
          "id": "kedarnath",
          "name": "Kedarnath Temple",
          "city": "Rudraprayag",
          "category": "Religious",
          "description": "Kedarnath is one of the 12 Jyotirlingas of Lord Shiva, situated at 3,583m in the Garhwal Himalayas.",
          "bestTimeToVisit": "May to June, September to October",
          "entryFee": "Free",
          "timings": "4:00 AM – 9:00 PM",
          "mapLink": "https://maps.google.com/?q=Kedarnath+Temple+Uttarakhand",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Kedarnath_Temple.jpg/1280px-Kedarnath_Temple.jpg"],
          "nearbyAttractions": ["Badrinath", "Gaurikund", "Chorabari Lake"],
          "tags": ["Char Dham", "Jyotirlinga", "Himalayan Trek"]
        }
      ]
    },
    {
      "id": "tamil-nadu",
      "name": "Tamil Nadu",
      "capital": "Chennai",
      "region": "South India",
      "tagline": "The Land of Temples",
      "coverImage": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "description": "Tamil Nadu is the cradle of Dravidian culture, known for magnificent Gopuram-adorned temples.",
      "bestTimeToVisit": "October to March",
      "language": "Tamil",
      "places": [
        {
          "id": "meenakshi-temple",
          "name": "Meenakshi Amman Temple",
          "city": "Madurai",
          "category": "Religious",
          "description": "A historic Hindu temple dedicated to Goddess Meenakshi and Lord Sundareswarar.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "5:00 AM – 10:00 PM",
          "mapLink": "https://maps.google.com/?q=Meenakshi+Amman+Temple+Madurai",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Meenakshi_Amman_Temple.jpg/1280px-Meenakshi_Amman_Temple.jpg"],
          "nearbyAttractions": ["Thirumalai Nayakkar Palace", "Gandhi Museum", "Alagar Kovil"],
          "tags": ["Dravidian Architecture", "Gopuram", "Ancient Temple"]
        }
      ]
    },
    {
      "id": "maharashtra",
      "name": "Maharashtra",
      "capital": "Mumbai",
      "region": "West India",
      "tagline": "Spirit of India",
      "coverImage": "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=1200&q=80",
      "description": "Maharashtra blends the energy of modern Mumbai with ancient Ajanta-Ellora caves.",
      "bestTimeToVisit": "October to March",
      "language": "Marathi",
      "places": [
        {
          "id": "gateway-of-india",
          "name": "Gateway of India",
          "city": "Mumbai",
          "category": "Heritage",
          "description": "Built in 1924, this 26-metre basalt arch monument overlooks the Arabian Sea.",
          "bestTimeToVisit": "November to February",
          "entryFee": "Free",
          "timings": "Open 24 hours",
          "mapLink": "https://maps.google.com/?q=Gateway+of+India+Mumbai",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1280px-Mumbai_03-2016_30_Gateway_of_India.jpg"],
          "nearbyAttractions": ["Elephanta Caves", "Colaba Causeway", "Marine Drive"],
          "tags": ["Colonial Architecture", "Mumbai Icon", "Waterfront"]
        }
      ]
    },
    {
      "id": "himachal-pradesh",
      "name": "Himachal Pradesh",
      "capital": "Shimla",
      "region": "North India",
      "tagline": "The Dev Bhoomi of Hills",
      "coverImage": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      "description": "Himachal Pradesh offers snow-capped Himalayan peaks and apple orchards.",
      "bestTimeToVisit": "March to June, October to February",
      "language": "Hindi, Pahari",
      "places": [
        {
          "id": "rohtang-pass",
          "name": "Rohtang Pass",
          "city": "Manali",
          "category": "Adventure",
          "description": "At 3,978m, Rohtang Pass is a high mountain pass connecting Kullu to Lahaul and Spiti.",
          "bestTimeToVisit": "May to October",
          "entryFee": "₹500 per vehicle",
          "timings": "Open during daylight hours",
          "mapLink": "https://maps.google.com/?q=Rohtang+Pass+Manali",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Rohtang_Pass.jpg/1280px-Rohtang_Pass.jpg"],
          "nearbyAttractions": ["Solang Valley", "Hadimba Temple", "Beas Kund Trek"],
          "tags": ["High Altitude Pass", "Snow Activities", "Mountain Pass"]
        }
      ]
    },
    {
      "id": "uttar-pradesh",
      "name": "Uttar Pradesh",
      "capital": "Lucknow",
      "region": "North India",
      "tagline": "The Heart of Incredible India",
      "coverImage": "https://images.unsplash.com/photo-1564507592333-c60657eaa0ae?auto=format&fit=crop&w=1200&q=80",
      "description": "Uttar Pradesh is India's most historically rich state, home to the Taj Mahal.",
      "bestTimeToVisit": "October to March",
      "language": "Hindi, Urdu",
      "places": [
        {
          "id": "taj-mahal",
          "name": "Taj Mahal",
          "city": "Agra",
          "category": "Heritage",
          "description": "A UNESCO World Heritage Site and one of the Seven Wonders of the World.",
          "bestTimeToVisit": "October to March",
          "entryFee": "₹50 (Indians), ₹1,300 (Foreigners)",
          "timings": "6:00 AM – 6:30 PM (Closed Fridays)",
          "mapLink": "https://maps.google.com/?q=Taj+Mahal+Agra",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1280px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg"],
          "nearbyAttractions": ["Agra Fort", "Fatehpur Sikri", "Itmad-ud-Daula"],
          "tags": ["Seven Wonders", "UNESCO World Heritage", "Mughal Architecture"]
        }
      ]
    },
    {
      "id": "goa",
      "name": "Goa",
      "capital": "Panaji",
      "region": "West India",
      "tagline": "Pearl of the Orient",
      "coverImage": "https://images.unsplash.com/photo-1512783569644-770e6ec2cddf?auto=format&fit=crop&w=1200&q=80",
      "description": "Goa is known for golden beaches, Portuguese colonial architecture, and vibrant nightlife.",
      "bestTimeToVisit": "November to February",
      "language": "Konkani, Portuguese",
      "places": [
        {
          "id": "baga-beach",
          "name": "Baga Beach",
          "city": "North Goa",
          "category": "Beach",
          "description": "One of Goa's most popular beaches, famous for water sports and nightlife.",
          "bestTimeToVisit": "November to February",
          "entryFee": "Free",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Baga+Beach+Goa",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Baga_beach_Goa.jpg/1280px-Baga_beach_Goa.jpg"],
          "nearbyAttractions": ["Anjuna Beach", "Calangute Beach", "Aguada Fort"],
          "tags": ["Beach", "Water Sports", "Nightlife"]
        }
      ]
    },
    {
      "id": "west-bengal",
      "name": "West Bengal",
      "capital": "Kolkata",
      "region": "East India",
      "tagline": "The Cultural Capital of India",
      "coverImage": "https://images.unsplash.com/photo-1558431382-bb74a8d10e24?auto=format&fit=crop&w=1200&q=80",
      "description": "West Bengal is a land of intellectual and artistic heritage.",
      "bestTimeToVisit": "October to March",
      "language": "Bengali",
      "places": [
        {
          "id": "victoria-memorial",
          "name": "Victoria Memorial",
          "city": "Kolkata",
          "category": "Heritage",
          "description": "A magnificent white marble monument built between 1906 and 1921.",
          "bestTimeToVisit": "October to March",
          "entryFee": "₹30 (Indians), ₹500 (Foreigners)",
          "timings": "10:00 AM – 5:00 PM",
          "mapLink": "https://maps.google.com/?q=Victoria+Memorial+Kolkata",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Victoria_Memorial_Kolkata.jpg/1280px-Victoria_Memorial_Kolkata.jpg"],
          "nearbyAttractions": ["Howrah Bridge", "Park Street", "Indian Museum"],
          "tags": ["Colonial Heritage", "Marble Monument", "Museum"]
        }
      ]
    },
    {
      "id": "ladakh",
      "name": "Ladakh",
      "capital": "Leh",
      "region": "North India",
      "tagline": "The Land of High Passes",
      "coverImage": "https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&w=1200&q=80",
      "description": "Ladakh is a high-altitude cold desert with dramatic landscapes.",
      "bestTimeToVisit": "May to September",
      "language": "Ladakhi, Hindi",
      "places": [
        {
          "id": "pangong-lake",
          "name": "Pangong Tso Lake",
          "city": "Leh",
          "category": "Nature",
          "description": "At 4,350m altitude, Pangong Tso is a breathtaking high-altitude saline lake.",
          "bestTimeToVisit": "May to September",
          "entryFee": "₹400",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Pangong+Lake+Ladakh",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pangong_Tso_lake.jpg/1280px-Pangong_Tso_lake.jpg"],
          "nearbyAttractions": ["Spangmik Village", "Chang La Pass", "Hemis Monastery"],
          "tags": ["High Altitude Lake", "3 Idiots Location", "Indo-China Border"]
        }
      ]
    },
    {
      "id": "karnataka",
      "name": "Karnataka",
      "capital": "Bengaluru",
      "region": "South India",
      "tagline": "One State, Many Worlds",
      "coverImage": "https://images.unsplash.com/photo-1600100397990-d4b98009a964?auto=format&fit=crop&w=1200&q=80",
      "description": "Karnataka is a diverse state offering ancient ruins and coffee plantations.",
      "bestTimeToVisit": "October to March",
      "language": "Kannada",
      "places": [
        {
          "id": "hampi",
          "name": "Hampi – Ruins of Vijayanagara",
          "city": "Hampi",
          "category": "Heritage",
          "description": "A UNESCO World Heritage Site, Hampi was the capital of the Vijayanagara Empire.",
          "bestTimeToVisit": "October to February",
          "entryFee": "₹40 (Indians), ₹600 (Foreigners)",
          "timings": "6:00 AM – 6:00 PM",
          "mapLink": "https://maps.google.com/?q=Hampi+Karnataka",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hampi_Virupaksha_Temple.jpg/1280px-Hampi_Virupaksha_Temple.jpg"],
          "nearbyAttractions": ["Vittala Temple", "Lotus Mahal", "Elephant Stables"],
          "tags": ["UNESCO World Heritage", "Vijayanagara Empire", "Ancient Ruins"]
        }
      ]
    },
    {
      "id": "andhra-pradesh",
      "name": "Andhra Pradesh",
      "capital": "Amaravati",
      "region": "South India",
      "tagline": "The Land of Rice and Rivers",
      "coverImage": "https://images.unsplash.com/photo-1600100397990-d4b98009a964?auto=format&fit=crop&w=1200&q=80",
      "description": "Andhra Pradesh is famous for the world's richest temple at Tirupati.",
      "bestTimeToVisit": "October to March",
      "language": "Telugu",
      "places": [
        {
          "id": "tirupati-balaji",
          "name": "Tirumala Venkateswara Temple",
          "city": "Tirupati",
          "category": "Religious",
          "description": "The richest and most visited religious site in the world.",
          "bestTimeToVisit": "September to February",
          "entryFee": "Free",
          "timings": "2:30 AM – 11:30 PM",
          "mapLink": "https://maps.google.com/?q=Tirumala+Tirupati+Temple",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Tirumala_Tirupati.jpg/1280px-Tirumala_Tirupati.jpg"],
          "nearbyAttractions": ["Kapila Theertham", "Sri Padmavathi Temple", "Chandragiri Fort"],
          "tags": ["Richest Temple", "Pilgrimage", "Dravidian Architecture"]
        }
      ]
    },
    {
      "id": "madhya-pradesh",
      "name": "Madhya Pradesh",
      "capital": "Bhopal",
      "region": "Central India",
      "tagline": "The Heart of Incredible India",
      "coverImage": "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=1200&q=80",
      "description": "Madhya Pradesh is the heart of India, home to tiger reserves and UNESCO temples.",
      "bestTimeToVisit": "October to March",
      "language": "Hindi",
      "places": [
        {
          "id": "khajuraho",
          "name": "Khajuraho Temples",
          "city": "Khajuraho",
          "category": "Heritage",
          "description": "A UNESCO World Heritage Site famous for Nagara-style architecture.",
          "bestTimeToVisit": "October to March",
          "entryFee": "₹40 (Indians), ₹600 (Foreigners)",
          "timings": "Sunrise to Sunset",
          "mapLink": "https://maps.google.com/?q=Khajuraho+Temples+Madhya+Pradesh",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Khajuraho_Temple.jpg/1280px-Khajuraho_Temple.jpg"],
          "nearbyAttractions": ["Panna National Park", "Raneh Falls", "Ajaigarh Fort"],
          "tags": ["UNESCO World Heritage", "Chandela Architecture", "Erotic Sculptures"]
        }
      ]
    },
    {
      "id": "gujarat",
      "name": "Gujarat",
      "capital": "Gandhinagar",
      "region": "West India",
      "tagline": "The Land of Legends",
      "coverImage": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      "description": "Gujarat is known for the vast white salt desert of Rann of Kutch.",
      "bestTimeToVisit": "October to March",
      "language": "Gujarati",
      "places": [
        {
          "id": "rann-of-kutch",
          "name": "White Rann of Kutch",
          "city": "Bhuj",
          "category": "Nature",
          "description": "The Rann of Kutch is the world's largest salt desert.",
          "bestTimeToVisit": "November to February",
          "entryFee": "₹100",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=White+Rann+of+Kutch+Gujarat",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Rann_of_Kutch.jpg/1280px-Rann_of_Kutch.jpg"],
          "nearbyAttractions": ["Dholavira", "Mandvi Beach", "Bhujodi Craft Village"],
          "tags": ["Salt Desert", "Rann Utsav", "UNESCO Tentative List"]
        }
      ]
    },
    {
      "id": "odisha",
      "name": "Odisha",
      "capital": "Bhubaneswar",
      "region": "East India",
      "tagline": "India's Best Kept Secret",
      "coverImage": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      "description": "Odisha is home to the Konark Sun Temple and pristine beaches.",
      "bestTimeToVisit": "October to March",
      "language": "Odia",
      "places": [
        {
          "id": "konark-sun-temple",
          "name": "Konark Sun Temple",
          "city": "Konark",
          "category": "Heritage",
          "description": "A UNESCO World Heritage Site designed as a massive chariot of the Sun God.",
          "bestTimeToVisit": "October to February",
          "entryFee": "₹40",
          "timings": "6:00 AM – 8:00 PM",
          "mapLink": "https://maps.google.com/?q=Konark+Sun+Temple+Odisha",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Konark_Sun_Temple.jpg/1280px-Konark_Sun_Temple.jpg"],
          "nearbyAttractions": ["Puri Beach", "Chandrabhaga Beach", "Chilika Lake"],
          "tags": ["UNESCO World Heritage", "Sun Temple", "Stone Chariot"]
        }
      ]
    }
  ]
};

export const seedInitialData = async () => {
  try {
    console.log('Starting seeding process...');
    
    // Clear existing data in small chunks to avoid batch limits
    const collectionsToClear = ['states', 'places', 'cities'];
    for (const colName of collectionsToClear) {
      const snapshot = await getDocs(collection(db, colName));
      console.log(`Clearing ${snapshot.docs.length} documents from ${colName}...`);
      
      // Delete in batches of 400
      let batch = writeBatch(db);
      let count = 0;
      for (const d of snapshot.docs) {
        batch.delete(d.ref);
        count++;
        if (count >= 400) {
          await batch.commit();
          batch = writeBatch(db);
          count = 0;
        }
      }
      if (count > 0) await batch.commit();
    }

    console.log('Database cleared. Adding new data...');

    for (const stateData of RAW_DATA.states) {
      const { places, ...stateInfo } = stateData;
      
      console.log(`Seeding state: ${stateInfo.name}`);
      
      // Add State using its ID as the document ID
      const stateDocRef = doc(db, 'states', stateInfo.id);
      await setDoc(stateDocRef, {
        ...stateInfo,
        imageUrl: stateInfo.coverImage,
        code: stateInfo.id.toUpperCase().slice(0, 2)
      });

      // Add Places for this state
      const citiesInState = new Set<string>();
      for (const placeData of places) {
        citiesInState.add(placeData.city);
        
        await addDoc(collection(db, 'places'), {
          ...placeData,
          stateId: stateInfo.id,
          cityId: placeData.city.toLowerCase().replace(/\s+/g, '-'),
          imageUrls: placeData.images,
          isFeatured: true,
          rating: 4.5 + Math.random() * 0.5,
          reviewsCount: Math.floor(Math.random() * 1000) + 100
        });
      }

      // Add Cities to the cities collection
      for (const cityName of Array.from(citiesInState)) {
        const cityId = cityName.toLowerCase().replace(/\s+/g, '-');
        await setDoc(doc(db, 'cities', cityId), {
          name: cityName,
          stateId: stateInfo.id,
          description: `Explore the beautiful city of ${cityName} in ${stateInfo.name}.`
        });
      }
    }
    
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
