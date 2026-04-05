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
        },
        {
          "id": "jaisalmer-fort",
          "name": "Jaisalmer Fort",
          "city": "Jaisalmer",
          "category": "Heritage",
          "description": "Known as Sonar Quila (Golden Fort), this UNESCO World Heritage Site rises from the Thar Desert. Built in 1156 AD.",
          "bestTimeToVisit": "October to February",
          "entryFee": "₹70 (Indians), ₹250 (Foreigners)",
          "timings": "9:00 AM – 6:00 PM",
          "mapLink": "https://maps.google.com/?q=Jaisalmer+Fort",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Jaisalmer_fort.jpg/1280px-Jaisalmer_fort.jpg"],
          "nearbyAttractions": ["Sam Sand Dunes", "Patwon Ki Haveli", "Gadsisar Lake"],
          "tags": ["UNESCO World Heritage", "Desert Fort", "Living Fort"]
        },
        {
          "id": "sam-sand-dunes",
          "name": "Sam Sand Dunes",
          "city": "Jaisalmer",
          "category": "Adventure",
          "description": "Located 40 km from Jaisalmer, Sam Sand Dunes is the most popular desert camp destination in Rajasthan.",
          "bestTimeToVisit": "October to February",
          "entryFee": "Free (Camel safari charges apply)",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Sam+Sand+Dunes+Jaisalmer",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Sam_Sand_Dunes_Jaisalmer.jpg/1280px-Sam_Sand_Dunes_Jaisalmer.jpg"],
          "nearbyAttractions": ["Jaisalmer Fort", "Khuri Village", "Kuldhara Ghost Village"],
          "tags": ["Desert Safari", "Camel Ride", "Sunset Point"]
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
          "id": "munnar",
          "name": "Munnar Tea Gardens",
          "city": "Munnar",
          "category": "Nature",
          "description": "Munnar is a hill station at 1,600m altitude, blanketed with sprawling tea plantations.",
          "bestTimeToVisit": "September to March",
          "entryFee": "Free",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Munnar+Kerala",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Munnar_2.jpg/1280px-Munnar_2.jpg"],
          "nearbyAttractions": ["Eravikulam National Park", "Mattupetty Dam", "Top Station"],
          "tags": ["Hill Station", "Tea Plantation", "Neelakurinji"]
        },
        {
          "id": "periyar-wildlife",
          "name": "Periyar Wildlife Sanctuary",
          "city": "Thekkady",
          "category": "Wildlife",
          "description": "Periyar is one of India's premier wildlife sanctuaries, situated around the scenic Periyar Lake.",
          "bestTimeToVisit": "October to June",
          "entryFee": "₹25 (Indians), ₹300 (Foreigners)",
          "timings": "6:00 AM – 6:00 PM",
          "mapLink": "https://maps.google.com/?q=Periyar+Wildlife+Sanctuary+Thekkady",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Periyar_Tiger_Reserve.jpg/1280px-Periyar_Tiger_Reserve.jpg"],
          "nearbyAttractions": ["Kumily Spice Gardens", "Mangaladevi Temple", "Chellarkovil Viewpoint"],
          "tags": ["Tiger Reserve", "Elephant Safari", "Boat Ride"]
        }
      ]
    },
    {
      "id": "uttarakhand",
      "name": "Uttarakhand",
      "capital": "Dehradun",
      "region": "North India",
      "tagline": "The Land of Gods",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Kedarnath_Temple.jpg/1280px-Kedarnath_Temple.jpg",
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
        },
        {
          "id": "jim-corbett",
          "name": "Jim Corbett National Park",
          "city": "Nainital",
          "category": "Wildlife",
          "description": "India's oldest national park established in 1936. Home to Bengal tigers, elephants, and leopards.",
          "bestTimeToVisit": "November to June",
          "entryFee": "₹150 (Indians), ₹600 (Foreigners)",
          "timings": "6:00 AM – 6:00 PM",
          "mapLink": "https://maps.google.com/?q=Jim+Corbett+National+Park",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Corbett_National_Park.jpg/1280px-Corbett_National_Park.jpg"],
          "nearbyAttractions": ["Nainital Lake", "Lansdowne", "Ranikhet"],
          "tags": ["Tiger Reserve", "India's Oldest Park", "Jungle Safari"]
        },
        {
          "id": "rishikesh",
          "name": "Rishikesh – Yoga Capital",
          "city": "Rishikesh",
          "category": "Adventure",
          "description": "Rishikesh, nestled in the Himalayan foothills along the Ganges, is the Yoga Capital of the World.",
          "bestTimeToVisit": "February to May, September to November",
          "entryFee": "Free",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Rishikesh+Uttarakhand",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Rishikesh_Laxman_Jhula.jpg/1280px-Rishikesh_Laxman_Jhula.jpg"],
          "nearbyAttractions": ["Laxman Jhula", "Haridwar", "Neelkanth Mahadev Temple"],
          "tags": ["Yoga Capital", "River Rafting", "Spiritual Retreat"]
        }
      ]
    },
    {
      "id": "tamil-nadu",
      "name": "Tamil Nadu",
      "capital": "Chennai",
      "region": "South India",
      "tagline": "The Land of Temples",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Meenakshi_Amman_Temple.jpg/1280px-Meenakshi_Amman_Temple.jpg",
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
        },
        {
          "id": "mahabalipuram",
          "name": "Mahabalipuram Shore Temple",
          "city": "Mahabalipuram",
          "category": "Heritage",
          "description": "A UNESCO World Heritage Site built in the 8th century by the Pallava dynasty.",
          "bestTimeToVisit": "October to February",
          "entryFee": "₹40 (Indians), ₹600 (Foreigners)",
          "timings": "6:00 AM – 6:00 PM",
          "mapLink": "https://maps.google.com/?q=Mahabalipuram+Shore+Temple",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Shore_Temple_Mahabalipuram.jpg/1280px-Shore_Temple_Mahabalipuram.jpg"],
          "nearbyAttractions": ["Pancha Rathas", "Tiger Cave", "Crocodile Bank"],
          "tags": ["UNESCO World Heritage", "Pallava Dynasty", "Coastal Temple"]
        },
        {
          "id": "ooty",
          "name": "Ooty – Queen of Hill Stations",
          "city": "Ooty",
          "category": "Nature",
          "description": "Udhagamandalam (Ooty) is a scenic hill station in the Nilgiri Hills at 2,240m.",
          "bestTimeToVisit": "April to June, September to November",
          "entryFee": "Free",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Ooty+Tamil+Nadu",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Ooty_lake.jpg/1280px-Ooty_lake.jpg"],
          "nearbyAttractions": ["Doddabetta Peak", "Mudumalai Tiger Reserve", "Coonoor"],
          "tags": ["Hill Station", "Toy Train", "Nilgiri Hills"]
        }
      ]
    },
    {
      "id": "maharashtra",
      "name": "Maharashtra",
      "capital": "Mumbai",
      "region": "West India",
      "tagline": "Spirit of India",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1280px-Mumbai_03-2016_30_Gateway_of_India.jpg",
      "description": "Maharashtra blends the energy of modern Mumbai with ancient Ajanta-Ellora caves.",
      "bestTimeToVisit": "October to March",
      "language": "Marathi",
      "places": [
        {
          "id": "ajanta-caves",
          "name": "Ajanta Caves",
          "city": "Aurangabad",
          "category": "Heritage",
          "description": "A UNESCO World Heritage Site with 30 rock-cut Buddhist cave monuments.",
          "bestTimeToVisit": "October to March",
          "entryFee": "₹40 (Indians), ₹600 (Foreigners)",
          "timings": "9:00 AM – 5:30 PM (Closed Mondays)",
          "mapLink": "https://maps.google.com/?q=Ajanta+Caves+Aurangabad",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ajanta_cave2.jpg/1280px-Ajanta_cave2.jpg"],
          "nearbyAttractions": ["Ellora Caves", "Bibi Ka Maqbara", "Daulatabad Fort"],
          "tags": ["UNESCO World Heritage", "Buddhist Art", "Rock-cut Caves"]
        },
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
        },
        {
          "id": "lonavala",
          "name": "Lonavala & Khandala",
          "city": "Lonavala",
          "category": "Nature",
          "description": "Twin hill stations on the Sahyadri ranges in the Western Ghats.",
          "bestTimeToVisit": "June to September",
          "entryFee": "Free",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Lonavala+Maharashtra",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Lonavala_Lake.jpg/1280px-Lonavala_Lake.jpg"],
          "nearbyAttractions": ["Karla Caves", "Bhaja Caves", "Rajmachi Fort"],
          "tags": ["Hill Station", "Monsoon Destination", "Western Ghats"]
        }
      ]
    },
    {
      "id": "himachal-pradesh",
      "name": "Himachal Pradesh",
      "capital": "Shimla",
      "region": "North India",
      "tagline": "The Dev Bhoomi of Hills",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Rohtang_Pass.jpg/1280px-Rohtang_Pass.jpg",
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
        },
        {
          "id": "spiti-valley",
          "name": "Spiti Valley",
          "city": "Spiti",
          "category": "Adventure",
          "description": "A cold desert mountain valley at 3,800m, often called 'Little Tibet'.",
          "bestTimeToVisit": "June to September",
          "entryFee": "Free",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Spiti+Valley+Himachal+Pradesh",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Spiti_Valley_2.jpg/1280px-Spiti_Valley_2.jpg"],
          "nearbyAttractions": ["Key Monastery", "Chandratal Lake", "Kaza Town"],
          "tags": ["Little Tibet", "Cold Desert", "Monastery"]
        },
        {
          "id": "shimla",
          "name": "Shimla – Queen of Hills",
          "city": "Shimla",
          "category": "Nature",
          "description": "The former summer capital of British India, Shimla sits at 2,200m.",
          "bestTimeToVisit": "March to June",
          "entryFee": "Free",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Shimla+Himachal+Pradesh",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Shimla_city.jpg/1280px-Shimla_city.jpg"],
          "nearbyAttractions": ["Kufri", "Chail", "Narkanda"],
          "tags": ["Queen of Hills", "Colonial Heritage", "Toy Train"]
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
        },
        {
          "id": "varanasi-ghats",
          "name": "Varanasi Ghats",
          "city": "Varanasi",
          "category": "Religious",
          "description": "Varanasi is the oldest living city in the world and the holiest city in Hinduism.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "Open 24 hours",
          "mapLink": "https://maps.google.com/?q=Varanasi+Ghats",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Varanasi_ghats.jpg/1280px-Varanasi_ghats.jpg"],
          "nearbyAttractions": ["Kashi Vishwanath Temple", "Sarnath", "Ramnagar Fort"],
          "tags": ["Oldest City", "Ganga Aarti", "Spiritual Capital"]
        },
        {
          "id": "ayodhya",
          "name": "Ram Janmabhoomi – Ayodhya",
          "city": "Ayodhya",
          "category": "Religious",
          "description": "Ayodhya is the birthplace of Lord Ram, one of Hinduism's most sacred sites.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "6:00 AM – 10:00 PM",
          "mapLink": "https://maps.google.com/?q=Ram+Mandir+Ayodhya",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ram_Mandir_Ayodhya.jpg/1280px-Ram_Mandir_Ayodhya.jpg"],
          "nearbyAttractions": ["Hanuman Garhi", "Kanak Bhawan", "Sarayu Ghat"],
          "tags": ["Ram Mandir", "Pilgrimage", "Sacred City"]
        }
      ]
    },
    {
      "id": "goa",
      "name": "Goa",
      "capital": "Panaji",
      "region": "West India",
      "tagline": "Pearl of the Orient",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Baga_beach_Goa.jpg/1280px-Baga_beach_Goa.jpg",
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
        },
        {
          "id": "basilica-bom-jesus",
          "name": "Basilica of Bom Jesus",
          "city": "Old Goa",
          "category": "Heritage",
          "description": "A UNESCO World Heritage Site, this 16th-century Baroque church holds the mortal remains of St. Francis Xavier.",
          "bestTimeToVisit": "November to February",
          "entryFee": "Free",
          "timings": "9:00 AM – 6:30 PM",
          "mapLink": "https://maps.google.com/?q=Basilica+of+Bom+Jesus+Goa",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Basilica_of_Bom_Jesus.jpg/1280px-Basilica_of_Bom_Jesus.jpg"],
          "nearbyAttractions": ["Se Cathedral", "Church of St. Cajetan", "Archaeological Museum"],
          "tags": ["UNESCO World Heritage", "Portuguese Heritage", "Colonial Church"]
        },
        {
          "id": "dudhsagar-falls",
          "name": "Dudhsagar Waterfalls",
          "city": "South Goa",
          "category": "Nature",
          "description": "One of India's tallest waterfalls at 310m, Dudhsagar is a spectacular four-tiered waterfall.",
          "bestTimeToVisit": "June to December",
          "entryFee": "₹400",
          "timings": "8:00 AM – 5:00 PM",
          "mapLink": "https://maps.google.com/?q=Dudhsagar+Falls+Goa",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Dudhsagar_falls.jpg/1280px-Dudhsagar_falls.jpg"],
          "nearbyAttractions": ["Bhagwan Mahavir Wildlife Sanctuary", "Colva Beach", "Tambdi Surla Temple"],
          "tags": ["Waterfall", "Monsoon Trek", "Scenic Beauty"]
        }
      ]
    },
    {
      "id": "west-bengal",
      "name": "West Bengal",
      "capital": "Kolkata",
      "region": "East India",
      "tagline": "The Cultural Capital of India",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Howrah_Bridge_at_night.jpg/1280px-Howrah_Bridge_at_night.jpg",
      "description": "West Bengal is a land of intellectual and artistic heritage.",
      "bestTimeToVisit": "October to March",
      "language": "Bengali",
      "places": [
        {
          "id": "sundarbans",
          "name": "Sundarbans National Park",
          "city": "South 24 Parganas",
          "category": "Wildlife",
          "description": "A UNESCO World Heritage Site and the world's largest mangrove forest.",
          "bestTimeToVisit": "October to March",
          "entryFee": "₹150 (Indians), ₹1,000 (Foreigners)",
          "timings": "6:00 AM – 5:00 PM",
          "mapLink": "https://maps.google.com/?q=Sundarbans+National+Park+West+Bengal",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Sundarbans_Tiger.jpg/1280px-Sundarbans_Tiger.jpg"],
          "nearbyAttractions": ["Sajnekhali Bird Sanctuary", "Dobanki Canopy Walk", "Gosaba Island"],
          "tags": ["UNESCO World Heritage", "Bengal Tiger", "Mangrove Forest"]
        },
        {
          "id": "darjeeling",
          "name": "Darjeeling – Queen of Hills",
          "city": "Darjeeling",
          "category": "Nature",
          "description": "Darjeeling is a picturesque hill town at 2,042m, famous for its tea gardens.",
          "bestTimeToVisit": "March to May",
          "entryFee": "Free",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Darjeeling+West+Bengal",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Darjeeling_Himalayan_Railway.jpg/1280px-Darjeeling_Himalayan_Railway.jpg"],
          "nearbyAttractions": ["Tiger Hill Sunrise Point", "Batasia Loop", "Peace Pagoda"],
          "tags": ["Tea Garden", "Toy Train", "Himalayan Views"]
        },
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
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pangong_Tso_lake.jpg/1280px-Pangong_Tso_lake.jpg",
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
        },
        {
          "id": "leh-palace",
          "name": "Leh Palace",
          "city": "Leh",
          "category": "Heritage",
          "description": "A nine-storey palace built in the 17th century by King Sengge Namgyal.",
          "bestTimeToVisit": "May to September",
          "entryFee": "₹15 (Indians), ₹200 (Foreigners)",
          "timings": "7:00 AM – 4:00 PM",
          "mapLink": "https://maps.google.com/?q=Leh+Palace+Ladakh",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Leh_Palace.jpg/1280px-Leh_Palace.jpg"],
          "nearbyAttractions": ["Namgyal Tsemo Monastery", "Shanti Stupa", "Leh Market"],
          "tags": ["Medieval Palace", "Tibetan Architecture", "Mountain Views"]
        },
        {
          "id": "nubra-valley",
          "name": "Nubra Valley",
          "city": "Leh",
          "category": "Adventure",
          "description": "Nubra Valley lies north of Leh across the Khardung La Pass (5,359m).",
          "bestTimeToVisit": "June to September",
          "entryFee": "₹400",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Nubra+Valley+Ladakh",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nubra_Valley_Ladakh.jpg/1280px-Nubra_Valley_Ladakh.jpg"],
          "nearbyAttractions": ["Khardung La Pass", "Diskit Monastery", "Hunder Sand Dunes"],
          "tags": ["Bactrian Camel", "High Altitude Pass", "Sand Dunes"]
        }
      ]
    },
    {
      "id": "karnataka",
      "name": "Karnataka",
      "capital": "Bengaluru",
      "region": "South India",
      "tagline": "One State, Many Worlds",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hampi_Virupaksha_Temple.jpg/1280px-Hampi_Virupaksha_Temple.jpg",
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
        },
        {
          "id": "coorg",
          "name": "Coorg – Scotland of India",
          "city": "Madikeri",
          "category": "Nature",
          "description": "Coorg (Kodagu) is a lush hill station in the Western Ghats.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Coorg+Karnataka",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Coorg_coffee_plantation.jpg/1280px-Coorg_coffee_plantation.jpg"],
          "nearbyAttractions": ["Abbey Falls", "Namdroling Monastery", "Talacauvery"],
          "tags": ["Coffee Plantations", "Hill Station", "Western Ghats"]
        },
        {
          "id": "mysore-palace",
          "name": "Mysore Palace",
          "city": "Mysuru",
          "category": "Heritage",
          "description": "One of the most visited monuments in India, the Mysore Palace is a royal residence.",
          "bestTimeToVisit": "October to March",
          "entryFee": "₹100",
          "timings": "10:00 AM – 5:30 PM",
          "mapLink": "https://maps.google.com/?q=Mysore+Palace+Karnataka",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mysore_Palace_Morning.jpg/1280px-Mysore_Palace_Morning.jpg"],
          "nearbyAttractions": ["Chamundi Hill", "Brindavan Gardens", "St. Philomena's Church"],
          "tags": ["Royal Palace", "Dasara Festival", "Indo-Saracenic Architecture"]
        }
      ]
    },
    {
      "id": "andhra-pradesh",
      "name": "Andhra Pradesh",
      "capital": "Amaravati",
      "region": "South India",
      "tagline": "The Land of Rice and Rivers",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Tirumala_Tirupati.jpg/1280px-Tirumala_Tirupati.jpg",
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
        },
        {
          "id": "araku-valley",
          "name": "Araku Valley",
          "city": "Visakhapatnam",
          "category": "Nature",
          "description": "A scenic valley at 910m in the Eastern Ghats, famous for tribal culture.",
          "bestTimeToVisit": "October to February",
          "entryFee": "Free",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Araku+Valley+Andhra+Pradesh",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Araku_Valley.jpg/1280px-Araku_Valley.jpg"],
          "nearbyAttractions": ["Borra Caves", "Tribal Museum", "Chaparai Water Cascade"],
          "tags": ["Hill Station", "Coffee Plantation", "Tribal Culture"]
        }
      ]
    },
    {
      "id": "madhya-pradesh",
      "name": "Madhya Pradesh",
      "capital": "Bhopal",
      "region": "Central India",
      "tagline": "The Heart of Incredible India",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Khajuraho_Temple.jpg/1280px-Khajuraho_Temple.jpg",
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
        },
        {
          "id": "kanha-national-park",
          "name": "Kanha Tiger Reserve",
          "city": "Mandla",
          "category": "Wildlife",
          "description": "One of India's finest tiger reserves and the inspiration for 'The Jungle Book'.",
          "bestTimeToVisit": "October to June",
          "entryFee": "₹250",
          "timings": "6:00 AM – 6:00 PM",
          "mapLink": "https://maps.google.com/?q=Kanha+National+Park+Madhya+Pradesh",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Kanha_Tiger_Reserve.jpg/1280px-Kanha_Tiger_Reserve.jpg"],
          "nearbyAttractions": ["Bandhavgarh", "Amarkantak", "Jabalpur Marble Rocks"],
          "tags": ["Jungle Book Inspiration", "Tiger Reserve", "Barasingha"]
        },
        {
          "id": "sanchi-stupa",
          "name": "Sanchi Stupa",
          "city": "Sanchi",
          "category": "Heritage",
          "description": "A UNESCO World Heritage Site, India's oldest stone structure.",
          "bestTimeToVisit": "October to March",
          "entryFee": "₹40",
          "timings": "Sunrise to Sunset",
          "mapLink": "https://maps.google.com/?q=Sanchi+Stupa+Madhya+Pradesh",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Sanchi_stupa.jpg/1280px-Sanchi_stupa.jpg"],
          "nearbyAttractions": ["Udaygiri Caves", "Vidisha", "Raisen Fort"],
          "tags": ["UNESCO World Heritage", "Buddhist Monument", "Ashoka Era"]
        }
      ]
    },
    {
      "id": "gujarat",
      "name": "Gujarat",
      "capital": "Gandhinagar",
      "region": "West India",
      "tagline": "The Land of Legends",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Rann_of_Kutch.jpg/1280px-Rann_of_Kutch.jpg",
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
        },
        {
          "id": "gir-forest",
          "name": "Gir National Park",
          "city": "Junagadh",
          "category": "Wildlife",
          "description": "The last refuge of the Asiatic Lion.",
          "bestTimeToVisit": "December to March",
          "entryFee": "₹100",
          "timings": "6:00 AM – 6:30 PM",
          "mapLink": "https://maps.google.com/?q=Gir+National+Park+Gujarat",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Asiatic_lion.jpg/1280px-Asiatic_lion.jpg"],
          "nearbyAttractions": ["Somnath Temple", "Junagadh Fort", "Sasan Gir"],
          "tags": ["Asiatic Lion", "Wildlife Safari", "Unique in World"]
        },
        {
          "id": "somnath-temple",
          "name": "Somnath Temple",
          "city": "Somnath",
          "category": "Religious",
          "description": "Somnath is the first of the 12 Jyotirlingas of Lord Shiva.",
          "bestTimeToVisit": "October to February",
          "entryFee": "Free",
          "timings": "6:00 AM – 9:30 PM",
          "mapLink": "https://maps.google.com/?q=Somnath+Temple+Gujarat",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Somnath_temple.jpg/1280px-Somnath_temple.jpg"],
          "nearbyAttractions": ["Gir National Park", "Veraval Beach", "Bhalka Teertha"],
          "tags": ["Jyotirlinga", "Chalukya Architecture", "Arabian Sea View"]
        }
      ]
    },
    {
      "id": "odisha",
      "name": "Odisha",
      "capital": "Bhubaneswar",
      "region": "East India",
      "tagline": "India's Best Kept Secret",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Konark_Sun_Temple.jpg/1280px-Konark_Sun_Temple.jpg",
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
        },
        {
          "id": "jagannath-puri",
          "name": "Jagannath Temple",
          "city": "Puri",
          "category": "Religious",
          "description": "One of the four sacred dhams of Hinduism.",
          "bestTimeToVisit": "October to February",
          "entryFee": "Free",
          "timings": "5:00 AM – 11:30 PM",
          "mapLink": "https://maps.google.com/?q=Jagannath+Temple+Puri+Odisha",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Jagannath_Puri.jpg/1280px-Jagannath_Puri.jpg"],
          "nearbyAttractions": ["Puri Beach", "Konark Sun Temple", "Chilika Lake"],
          "tags": ["Char Dham", "Rath Yatra", "12th Century Temple"]
        },
        {
          "id": "chilika-lake",
          "name": "Chilika Lake",
          "city": "Puri/Khurda",
          "category": "Nature",
          "description": "Asia's largest brackish water lagoon.",
          "bestTimeToVisit": "November to February",
          "entryFee": "₹50",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Chilika+Lake+Odisha",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Chilika_lake.jpg/1280px-Chilika_lake.jpg"],
          "nearbyAttractions": ["Satapada", "Kalijai Temple Island", "Nalabana Bird Sanctuary"],
          "tags": ["Ramsar Wetland", "Migratory Birds", "Irrawaddy Dolphins"]
        }
      ]
    },
    {
      "id": "assam",
      "name": "Assam",
      "capital": "Dispur",
      "region": "Northeast India",
      "tagline": "The Gateway to Northeast India",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kaziranga_rhino.jpg/1280px-Kaziranga_rhino.jpg",
      "description": "Assam is a land of tea gardens and Kaziranga's one-horned rhinos.",
      "bestTimeToVisit": "October to April",
      "language": "Assamese, Bengali",
      "places": [
        {
          "id": "kaziranga",
          "name": "Kaziranga National Park",
          "city": "Golaghat",
          "category": "Wildlife",
          "description": "A UNESCO World Heritage Site hosting two-thirds of the world's rhinos.",
          "bestTimeToVisit": "November to April",
          "entryFee": "₹250",
          "timings": "7:00 AM – 5:00 PM",
          "mapLink": "https://maps.google.com/?q=Kaziranga+National+Park+Assam",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kaziranga_rhino.jpg/1280px-Kaziranga_rhino.jpg"],
          "nearbyAttractions": ["Majuli Island", "Sivasagar", "Pobitora Wildlife Sanctuary"],
          "tags": ["UNESCO World Heritage", "One-Horned Rhino", "Elephant Safari"]
        },
        {
          "id": "majuli-island",
          "name": "Majuli Island",
          "city": "Jorhat",
          "category": "Nature",
          "description": "The world's largest river island.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "Open all day",
          "mapLink": "https://maps.google.com/?q=Majuli+Island+Assam",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Majuli_Island.jpg/1280px-Majuli_Island.jpg"],
          "nearbyAttractions": ["Kamalabari Satra", "Garamur Satra", "Auniati Satra"],
          "tags": ["World's Largest River Island", "Vaishnavite Culture", "Brahmaputra"]
        }
      ]
    },
    {
      "id": "punjab",
      "name": "Punjab",
      "capital": "Chandigarh",
      "region": "North India",
      "tagline": "The Land of Five Rivers",
      "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Golden_Temple%2C_Amritsar.jpg/1280px-Golden_Temple%2C_Amritsar.jpg",
      "description": "Punjab is known for the magnificent Golden Temple at Amritsar.",
      "bestTimeToVisit": "October to March",
      "language": "Punjabi, Hindi",
      "places": [
        {
          "id": "golden-temple",
          "name": "Harmandir Sahib (Golden Temple)",
          "city": "Amritsar",
          "category": "Religious",
          "description": "The holiest shrine of Sikhism.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "Open 24 hours",
          "mapLink": "https://maps.google.com/?q=Golden+Temple+Amritsar",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Golden_Temple%2C_Amritsar.jpg/1280px-Golden_Temple%2C_Amritsar.jpg"],
          "nearbyAttractions": ["Jallianwala Bagh", "Wagah Border", "Durgiana Temple"],
          "tags": ["Sikh Pilgrimage", "Golden Architecture", "Free Langar"]
        },
        {
          "id": "wagah-border",
          "name": "Wagah Border Ceremony",
          "city": "Amritsar",
          "category": "Heritage",
          "description": "The Beating Retreat Ceremony at Wagah Border.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "Evening",
          "mapLink": "https://maps.google.com/?q=Wagah+Border+Amritsar",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Wagah_border.jpg/1280px-Wagah_border.jpg"],
          "nearbyAttractions": ["Golden Temple", "Jallianwala Bagh", "Partition Museum"],
          "tags": ["Indo-Pak Border", "Beating Retreat", "Patriotic"]
        }
      ]
    }
  ]
};

export const seedInitialData = async () => {
  try {
    // Clear existing data
    const statesSnapshot = await getDocs(collection(db, 'states'));
    const placesSnapshot = await getDocs(collection(db, 'places'));
    
    const batch = writeBatch(db);
    statesSnapshot.docs.forEach(d => batch.delete(d.ref));
    placesSnapshot.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();

    console.log('Database cleared');

    for (const stateData of RAW_DATA.states) {
      const { places, ...stateInfo } = stateData;
      
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
          cityId: placeData.city.toLowerCase().replace(/\s+/g, '-'), // Generate a cityId
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
