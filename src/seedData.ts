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
        },
        {
          "id": "jaisalmer-fort",
          "name": "Jaisalmer Fort",
          "city": "Jaisalmer",
          "category": "Heritage",
          "description": "Known as Sonar Quila (Golden Fort), this UNESCO World Heritage Site rises from the Thar Desert. Built in 1156 AD, it is one of the largest fully preserved and living fortified cities in the world.",
          "bestTimeToVisit": "October to February",
          "entryFee": "₹70 (Indians), ₹250 (Foreigners)",
          "timings": "9:00 AM – 6:00 PM",
          "mapLink": "https://maps.google.com/?q=Jaisalmer+Fort",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Jaisalmer_fort.jpg/1280px-Jaisalmer_fort.jpg"],
          "nearbyAttractions": ["Sam Sand Dunes", "Patwon Ki Haveli", "Gadsisar Lake"],
          "tags": ["UNESCO World Heritage", "Desert Fort", "Living Fort"]
        },
        {
          "id": "dilwara-temples",
          "name": "Dilwara Temples",
          "city": "Mount Abu",
          "category": "Religious",
          "description": "A group of svetambara Jain temples famous for their extraordinary architecture and marble stone carvings. Built between the 11th and 13th centuries AD.",
          "bestTimeToVisit": "12:00 PM - 5:00 PM (For Tourists)",
          "entryFee": "Free",
          "timings": "12:00 PM - 5:00 PM",
          "mapLink": "https://maps.google.com/?q=Dilwara+Temples+Mount+Abu",
          "images": ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80"],
          "nearbyAttractions": ["Nakki Lake", "Guru Shikhar"],
          "tags": ["Jain Temple", "Marble Carvings", "Mount Abu"],
          "dressCode": "Strictly modest. No leather items allowed inside."
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
          "id": "padmanabhaswamy-temple",
          "name": "Padmanabhaswamy Temple",
          "city": "Thiruvananthapuram",
          "category": "Religious",
          "description": "The richest place of worship in the world, this temple is built in an intricate fusion of the Chera style and the Dravidian style of architecture. The principal deity Vishnu is enshrined in the 'Anantha Shayanam' posture.",
          "bestTimeToVisit": "September to March",
          "entryFee": "Free",
          "timings": "3:30 AM - 12:00 PM, 5:00 PM - 8:30 PM",
          "mapLink": "https://maps.google.com/?q=Padmanabhaswamy+Temple+Thiruvananthapuram",
          "images": ["https://www.sreestours.com/wp-content/uploads/2025/08/sree-padmanabhaswamy-temple-thiruvananthapuram-4.jpg"],
          "nearbyAttractions": ["Napier Museum", "Kovalam Beach"],
          "tags": ["Richest Temple", "Vishnu", "Kerala Architecture"],
          "rituals": ["Nirmalya Darshanam: 3:30 AM", "Usha Pooja: 5:15 AM", "Deeparadhana: 6:30 PM"],
          "festivals": ["Alpashi Utsavam", "Painkuni Utsavam", "Laksha Deepam"],
          "dressCode": "Strict Traditional. Men: Mundu (Dhoti) without shirt. Women: Saree or long skirt and blouse."
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
      "description": "Uttarakhand is known as Devbhoomi (abode of gods). It offers Himalayan treks, sacred pilgrimage sites, Char Dham yatra, national parks, and adventure sports.",
      "bestTimeToVisit": "May to June, September to November",
      "language": "Hindi, Garhwali, Kumaoni",
      "places": [
        {
          "id": "kedarnath",
          "name": "Kedarnath Temple",
          "city": "Kedarnath",
          "category": "Religious",
          "description": "Kedarnath is one of the 12 Jyotirlingas of Lord Shiva, situated at 3,583m in the Garhwal Himalayas. The ancient stone temple dates to the 8th century and is accessible only by a 16 km trek from Gaurikund.",
          "bestTimeToVisit": "May to June, September to October",
          "entryFee": "Free",
          "timings": "4:00 AM – 9:00 PM",
          "mapLink": "https://maps.google.com/?q=Kedarnath+Temple+Uttarakhand",
          "images": ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80"],
          "nearbyAttractions": ["Badrinath", "Gaurikund", "Chorabari Lake"],
          "tags": ["Char Dham", "Jyotirlinga", "Himalayan Trek"],
          "rituals": ["Maha Abhishek: 4:00 AM", "Shayan Aarti: 8:30 PM"],
          "festivals": ["Mahashivratri", "Badri-Kedar Utsav"],
          "dressCode": "Warm modest clothing."
        },
        {
          "id": "badrinath",
          "name": "Badrinath Temple",
          "city": "Badrinath",
          "category": "Religious",
          "description": "One of the Char Dham and Chota Char Dham pilgrimage sites. It is situated in the Garhwal hill tracks in Chamoli district along the banks of the Alaknanda River.",
          "bestTimeToVisit": "May to June, September to October",
          "entryFee": "Free",
          "timings": "4:30 AM - 1:00 PM, 4:00 PM - 9:00 PM",
          "mapLink": "https://maps.google.com/?q=Badrinath+Temple+Uttarakhand",
          "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSve9LBAZE9sJSkOwsmiU5Aq2NAZ-_SbBcjgg&s"],
          "nearbyAttractions": ["Mana Village", "Vasudhara Falls"],
          "tags": ["Char Dham", "Vishnu", "Himalayas"],
          "rituals": ["Maha Abhishek: 4:30 AM", "Geeta Path: 9:00 PM"],
          "festivals": ["Mata Murti Ka Mela", "Badri Kedar Festival"],
          "dressCode": "Warm modest clothing. Traditional attire preferred."
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
      "description": "Tamil Nadu is the cradle of Dravidian culture, known for magnificent Gopuram-adorned temples, classical Bharatanatyam dance, Carnatic music, and rich cuisine.",
      "bestTimeToVisit": "October to March",
      "language": "Tamil",
      "places": [
        {
          "id": "meenakshi-temple",
          "name": "Meenakshi Amman Temple",
          "city": "Madurai",
          "category": "Religious",
          "description": "A historic Hindu temple dedicated to Goddess Meenakshi and Lord Sundareswarar. It features 14 spectacular gopurams decorated with thousands of colourful sculptures. Over 15,000 devotees visit daily.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "5:00 AM – 12:30 PM, 4:00 PM – 10:00 PM",
          "mapLink": "https://maps.google.com/?q=Meenakshi+Amman+Temple+Madurai",
          "images": ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80"],
          "nearbyAttractions": ["Thirumalai Nayakkar Palace", "Gandhi Museum"],
          "tags": ["Dravidian Architecture", "Gopuram", "Ancient Temple"],
          "rituals": ["Thiruvananthal Pooja: 5:00 AM", "Vizha Pooja: 6:30 AM", "Uchikala Pooja: 11:30 AM", "Ardhajama Pooja: 9:00 PM"],
          "festivals": ["Chithirai Festival", "Navaratri", "Meenakshi Tirukalyanam"],
          "dressCode": "Strict dress code. Men: Dhoti/Formal Trousers. Women: Saree/Salwar Kameez with dupatta."
        },
        {
          "id": "brihadeeswarar-temple",
          "name": "Brihadeeswarar Temple",
          "city": "Thanjavur",
          "category": "Religious",
          "description": "A Hindu temple dedicated to Shiva located in South bank of Kaveri river in Thanjavur, Tamil Nadu, India. It is one of the largest South Indian temples and an exemplary example of a fully realized Dravidian architecture.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM",
          "mapLink": "https://maps.google.com/?q=Brihadeeswarar+Temple+Thanjavur",
          "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk55sURm46lr3uN56RD890Dng4n7ZKalmO9Q&s"],
          "nearbyAttractions": ["Thanjavur Royal Palace", "Saraswathi Mahal Library"],
          "tags": ["Chola Architecture", "UNESCO World Heritage", "Shiva"],
          "rituals": ["Daily Puja: 6 times a day"],
          "festivals": ["Brahmotsavam", "Maha Shivaratri"],
          "dressCode": "Traditional attire preferred."
        }
      ]
    },
    {
      "id": "maharashtra",
      "name": "Maharashtra",
      "capital": "Mumbai",
      "region": "West India",
      "tagline": "Spirit of India",
      "coverImage": "https://images.unsplash.com/photo-1570160897040-30430ef2015a?auto=format&fit=crop&w=1200&q=80",
      "description": "Maharashtra blends the energy of modern Mumbai with ancient Ajanta-Ellora caves, coastal Maratha forts, and sacred pilgrimage sites.",
      "bestTimeToVisit": "October to March",
      "language": "Marathi",
      "places": [
        {
          "id": "gateway-of-india",
          "name": "Gateway of India",
          "city": "Mumbai",
          "category": "Heritage",
          "description": "Built in 1924 to commemorate King George V's visit, this 26-metre basalt arch monument overlooks the Arabian Sea. It is Mumbai's most iconic landmark and the starting point for ferries to Elephanta Caves.",
          "bestTimeToVisit": "November to February",
          "entryFee": "Free",
          "timings": "Open 24 hours",
          "mapLink": "https://maps.google.com/?q=Gateway+of+India+Mumbai",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1280px-Mumbai_03-2016_30_Gateway_of_India.jpg"],
          "nearbyAttractions": ["Elephanta Caves", "Colaba Causeway", "Marine Drive"],
          "tags": ["Colonial Architecture", "Mumbai Icon", "Waterfront"]
        },
        {
          "id": "siddhivinayak-temple",
          "name": "Siddhivinayak Temple",
          "city": "Mumbai",
          "category": "Religious",
          "description": "One of the most popular and richest temples in Mumbai. Dedicated to Lord Ganesha, the temple was originally built by Laxman Vithu and Deubai Patil in 1801.",
          "bestTimeToVisit": "Year round",
          "entryFee": "Free",
          "timings": "5:30 AM - 10:00 PM",
          "mapLink": "https://maps.google.com/?q=Siddhivinayak+Temple+Mumbai",
          "images": ["https://divinehindu.com/wp-content/uploads/2025/12/Siddhivinayak-Temple.webp"],
          "nearbyAttractions": ["Prabhadevi Beach", "Shivaji Park"],
          "tags": ["Ganesha", "Mumbai", "Famous Temple"],
          "rituals": ["Kakad Aarti: 5:30 AM", "Naivedhya: 12:00 PM", "Shej Aarti: 10:00 PM"],
          "festivals": ["Ganesh Chaturthi", "Angarki Sankashti Chaturthi", "Maghi Ganesh Jayanti"],
          "dressCode": "Casual but modest. Avoid revealing clothes."
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
      "description": "Uttar Pradesh is India's most historically rich state, home to the Taj Mahal, Varanasi ghats, and the birthplace of Lord Ram in Ayodhya.",
      "bestTimeToVisit": "October to March",
      "language": "Hindi, Urdu",
      "places": [
        {
          "id": "taj-mahal",
          "name": "Taj Mahal",
          "city": "Agra",
          "category": "Heritage",
          "description": "A UNESCO World Heritage Site and one of the Seven Wonders of the World, the Taj Mahal was built by Mughal Emperor Shah Jahan between 1631 and 1648 as a mausoleum for his wife Mumtaz Mahal. It is the finest example of Mughal architecture.",
          "bestTimeToVisit": "October to March",
          "entryFee": "₹50 (Indians), ₹1,300 (Foreigners)",
          "timings": "6:00 AM – 6:30 PM (Closed Fridays)",
          "mapLink": "https://maps.google.com/?q=Taj+Mahal+Agra",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1280px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg"],
          "nearbyAttractions": ["Agra Fort", "Fatehpur Sikri", "Itmad-ud-Daula"],
          "tags": ["Seven Wonders", "UNESCO World Heritage", "Mughal Architecture"]
        },
        {
          "id": "kashi-vishwanath",
          "name": "Kashi Vishwanath Temple",
          "city": "Varanasi",
          "category": "Religious",
          "description": "One of the most famous Hindu temples dedicated to Lord Shiva. It is located in Varanasi, Uttar Pradesh, India. The temple stands on the western bank of the holy river Ganga, and is one of the twelve Jyotirlingas, the holiest of Shiva temples.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "3:00 AM - 11:00 PM",
          "mapLink": "https://maps.google.com/?q=Kashi+Vishwanath+Temple+Varanasi",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/f/ff/Kashi_Vishwanath.jpg"],
          "nearbyAttractions": ["Dashashwamedh Ghat", "Sarnath"],
          "tags": ["Jyotirlinga", "Shiva", "Varanasi"],
          "rituals": ["Mangala Aarti: 3:00 AM", "Bhog Aarti: 11:15 AM", "Sapt Rishi Aarti: 7:00 PM", "Shringar Aarti: 9:00 PM", "Shayan Aarti: 10:30 PM"],
          "festivals": ["Mahashivratri", "Dev Deepawali", "Shravan Month"],
          "dressCode": "Traditional attire preferred. Men: Dhoti/Kurta-Pyjama. Women: Saree/Salwar Kameez."
        }
      ]
    },
    {
      "id": "punjab",
      "name": "Punjab",
      "capital": "Chandigarh",
      "region": "North India",
      "tagline": "The Land of Five Rivers",
      "coverImage": "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80",
      "description": "Punjab is the land of the Sikhs, known for the magnificent Golden Temple at Amritsar, the Wagah Border Ceremony, fertile farmlands, bhangra music, and rich Punjabi cuisine.",
      "bestTimeToVisit": "October to March",
      "language": "Punjabi, Hindi",
      "places": [
        {
          "id": "golden-temple",
          "name": "Golden Temple",
          "city": "Amritsar",
          "category": "Religious",
          "description": "Also known as Harmandir Sahib, it is the preeminent spiritual site of Sikhism. The gurdwara is built around a man-made pool (sarovar) that was completed by the fourth Sikh Guru, Guru Ram Das, in 1577.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "Open 24 Hours",
          "mapLink": "https://maps.google.com/?q=Golden+Temple+Amritsar",
          "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlE1rDiut8HhQhyEUmtWuM37S0LVlzfyY7Cw&s"],
          "nearbyAttractions": ["Jallianwala Bagh", "Wagah Border"],
          "tags": ["Sikhism", "Amritsar", "Peaceful"],
          "rituals": ["Prakash of Guru Granth Sahib: 2:30 AM", "Sukhasan: 10:00 PM"],
          "festivals": ["Vaisakhi", "Gurpurab", "Diwali"],
          "dressCode": "Head must be covered. No shoes or socks allowed inside. Modest clothing."
        }
      ]
    },
    {
      "id": "andhra-pradesh",
      "name": "Andhra Pradesh",
      "capital": "Amaravati",
      "region": "South India",
      "tagline": "The Land of Rice and Rivers",
      "coverImage": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
      "description": "Andhra Pradesh is famous for the world's richest temple at Tirupati, Araku Valley hill station, Borra Caves, and the ancient Buddhist sites of Nagarjunakonda.",
      "bestTimeToVisit": "October to March",
      "language": "Telugu",
      "places": [
        {
          "id": "venkateswara-temple",
          "name": "Venkateswara Temple",
          "city": "Tirumala",
          "category": "Religious",
          "description": "Located in the hill town of Tirumala at Tirupati, it is one of the most visited and richest temples in the world. It is dedicated to Lord Venkateswara, an incarnation of Vishnu who is believed to have appeared here to save mankind from trials of Kali Yuga.",
          "bestTimeToVisit": "Year round",
          "entryFee": "Free (Paid darshan available)",
          "timings": "Open 24 Hours (Darshan timings vary)",
          "mapLink": "https://maps.google.com/?q=Venkateswara+Temple+Tirumala",
          "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQ48sHcdXVkIT_NN_a2JmtzVkSgkI6m5rbQ&s"],
          "nearbyAttractions": ["Akasaganga Teertham", "Silathoranam"],
          "tags": ["Tirupati", "Vishnu", "Richest Temple"],
          "rituals": ["Suprabhatam: 3:00 AM", "Thomala Seva: 3:45 AM", "Ekanta Seva: 1:30 AM"],
          "festivals": ["Brahmotsavam", "Vaikuntha Ekadashi", "Rathasapthami"],
          "dressCode": "Strict Traditional. Men: Dhoti/Kurta. Women: Saree/Half-saree/Churidar with Dupatta."
        }
      ]
    },
    {
      "id": "gujarat",
      "name": "Gujarat",
      "capital": "Gandhinagar",
      "region": "West India",
      "tagline": "The Land of Legends",
      "coverImage": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
      "description": "Gujarat, the birthplace of Mahatma Gandhi, is known for the vast white salt desert of Rann of Kutch, Asiatic lions of Gir, Somnath temple, and the ancient Harappan city of Lothal.",
      "bestTimeToVisit": "October to March",
      "language": "Gujarati",
      "places": [
        {
          "id": "somnath-temple",
          "name": "Somnath Temple",
          "city": "Veraval",
          "category": "Religious",
          "description": "The Somnath temple located in Prabhas Patan near Veraval in Saurashtra on the western coast of Gujarat, India is believed to be the first among the twelve jyotirlinga shrines of Shiva.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "6:00 AM - 9:00 PM",
          "mapLink": "https://maps.google.com/?q=Somnath+Temple+Veraval",
          "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHA8YKr7J916iMpgceayRVrNob0EGpkC12kQ&s"],
          "nearbyAttractions": ["Triveni Sangam", "Bhalka Tirth"],
          "tags": ["Jyotirlinga", "Shiva", "Gujarat Coast"],
          "rituals": ["Aarti: 7:00 AM, 12:00 PM, 7:00 PM"],
          "festivals": ["Mahashivratri", "Kartik Purnima"],
          "dressCode": "Decent clothing. Avoid shorts and sleeveless tops."
        }
      ]
    },
    {
      "id": "odisha",
      "name": "Odisha",
      "capital": "Bhubaneswar",
      "region": "East India",
      "tagline": "India's Best Kept Secret",
      "coverImage": "https://images.unsplash.com/photo-1599408162162-670544909353?auto=format&fit=crop&w=1200&q=80",
      "description": "Odisha, the land of ancient temples and tribal art, is home to the Konark Sun Temple, the Jagannath Temple at Puri, pristine beaches, and vibrant Pattachitra art.",
      "bestTimeToVisit": "October to March",
      "language": "Odia",
      "places": [
        {
          "id": "jagannath-temple",
          "name": "Jagannath Temple",
          "city": "Puri",
          "category": "Religious",
          "description": "A significant Hindu temple dedicated to Jagannath, a form of Vishnu, in Puri in the state of Odisha on the eastern coast of India. The temple is famous for its annual Ratha Yatra, or chariot festival.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "5:00 AM - 11:00 PM",
          "mapLink": "https://maps.google.com/?q=Jagannath+Temple+Puri",
          "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjcBF3KEqp5zzlp4Uo8tG-0hWLRUNWLuBXnw&s"],
          "nearbyAttractions": ["Puri Beach", "Konark Sun Temple"],
          "tags": ["Char Dham", "Krishna", "Ratha Yatra"],
          "rituals": ["Dwarapala Puja: 5:00 AM", "Gopala Vallabha Bhoga: 8:30 AM", "Sandhya Dhupa: 7:00 PM"],
          "festivals": ["Ratha Yatra", "Snana Yatra", "Chandan Yatra"],
          "dressCode": "Traditional Indian attire. Non-Hindus are not allowed inside the main temple complex."
        },
        {
          "id": "konark-sun-temple",
          "name": "Konark Sun Temple",
          "city": "Konark",
          "category": "Heritage",
          "description": "A 13th-century CE Sun temple at Konark about 35 kilometers northeast from Puri on the coastline of Odisha, India. The temple is attributed to king Narasimhadeva I of the Eastern Ganga Dynasty about 1250 CE.",
          "bestTimeToVisit": "October to March",
          "entryFee": "₹40 (Indians), ₹600 (Foreigners)",
          "timings": "6:00 AM - 8:00 PM",
          "mapLink": "https://maps.google.com/?q=Konark+Sun+Temple",
          "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTYHO3RXr8HmwNc_cQiDm1zRRlV_wJtedNOA&s"],
          "nearbyAttractions": ["Chandrabhaga Beach"],
          "tags": ["Sun God", "UNESCO World Heritage", "Architecture"]
        }
      ]
    },
    {
      "id": "assam",
      "name": "Assam",
      "capital": "Dispur",
      "region": "Northeast India",
      "tagline": "The Gateway to Northeast India",
      "coverImage": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
      "description": "Assam is a land of tea gardens, the mighty Brahmaputra river, Kaziranga's one-horned rhinos, Kamakhya temple, and the diverse cultures of 30+ tribal communities.",
      "bestTimeToVisit": "October to April",
      "language": "Assamese, Bengali",
      "places": [
        {
          "id": "kamakhya-temple",
          "name": "Kamakhya Temple",
          "city": "Guwahati",
          "category": "Religious",
          "description": "A Hindu temple dedicated to the mother goddess Kamakhya. It is one of the oldest of the 51 Shakti Pithas. Situated on the Nilachal Hill in western part of Guwahati city.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "8:00 AM - 1:00 PM, 2:30 PM - 5:30 PM",
          "mapLink": "https://maps.google.com/?q=Kamakhya+Temple+Guwahati",
          "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFU6j-qsY6MJsR1jDdyqEdrWmbmF4QqJLlzg&s"],
          "nearbyAttractions": ["Umananda Temple", "Brahmaputra River"],
          "tags": ["Shakti Peeth", "Guwahati", "Mother Goddess"],
          "rituals": ["Snana: 5:30 AM", "Nitya Puja: 8:00 AM", "Aarti: 6:00 PM"],
          "festivals": ["Ambubachi Mela", "Manasa Puja", "Durga Puja"],
          "dressCode": "Traditional attire. Modest clothing required."
        }
      ]
    },
    {
      "id": "bihar",
      "name": "Bihar",
      "capital": "Patna",
      "region": "East India",
      "tagline": "The Land of Enlightenment",
      "coverImage": "https://images.unsplash.com/photo-1590766940554-634a7ed41450?w=600&q=80",
      "description": "Bihar is the land where Buddha attained enlightenment and Mahavira was born. It is rich in ancient history and spiritual heritage.",
      "bestTimeToVisit": "October to March",
      "language": "Hindi, Maithili, Bhojpuri",
      "places": [
        {
          "id": "mahabodhi-temple",
          "name": "Mahabodhi Temple",
          "city": "Bodh Gaya",
          "category": "Religious",
          "description": "A UNESCO World Heritage Site, it is a Buddhist temple in Bodh Gaya, marking the location where the Buddha is said to have attained enlightenment. It is one of the four holy sites related to the life of the Lord Buddha.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "5:00 AM - 9:00 PM",
          "mapLink": "https://maps.google.com/?q=Mahabodhi+Temple+Bodh+Gaya",
          "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe4QdnQN1snxG2BGJbRoA3gdoSz67G9QDcWw&s"],
          "nearbyAttractions": ["Great Buddha Statue", "Bodhi Tree"],
          "tags": ["Buddhism", "Enlightenment", "UNESCO"],
          "rituals": ["Chanting: 5:30 AM", "Meditation Sessions"],
          "festivals": ["Buddha Purnima", "Nyingma Monlam Chenmo"],
          "dressCode": "Modest clothing. Shoulders and knees must be covered."
        }
      ]
    },
    {
      "id": "jammu-kashmir",
      "name": "Jammu & Kashmir",
      "capital": "Srinagar/Jammu",
      "region": "North India",
      "tagline": "Heaven on Earth",
      "coverImage": "https://images.unsplash.com/photo-1566833921403-3105a23c7c89?auto=format&fit=crop&w=1200&q=80",
      "description": "Jammu & Kashmir is known for its stunning natural beauty, snow-capped mountains, and sacred shrines.",
      "bestTimeToVisit": "March to October",
      "language": "Kashmiri, Dogri, Hindi",
      "places": [
        {
          "id": "vaishno-devi",
          "name": "Vaishno Devi Temple",
          "city": "Katra",
          "category": "Religious",
          "description": "A holy cave shrine dedicated to the Mother Goddess. It is located at an altitude of 5200 ft in the Trikuta Mountains. Millions of devotees undertake the 12km trek from Katra to reach the Bhawan.",
          "bestTimeToVisit": "Year round",
          "entryFee": "Free",
          "timings": "Open 24 Hours",
          "mapLink": "https://maps.google.com/?q=Vaishno+Devi+Temple+Katra",
          "images": ["https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYTBiYTUyNzAwLTg1YWItMTFmMC04NDliLWQxMWMzZjNiMjVlNy5qcGc="],
          "nearbyAttractions": ["Bhairon Nath Temple", "Ardh Kuwari Cave"],
          "tags": ["Shakti", "Pilgrimage", "Trek"],
          "rituals": ["Atka Aarti: Morning & Evening"],
          "festivals": ["Navaratri", "Diwali"],
          "dressCode": "Comfortable trekking clothes. Modesty expected."
        }
      ]
    },
    {
      "id": "telangana",
      "name": "Telangana",
      "capital": "Hyderabad",
      "region": "South India",
      "tagline": "The Land of Charminar",
      "coverImage": "https://images.unsplash.com/photo-1590766940554-634a7ed41450?w=600&q=80",
      "description": "Telangana is known for its rich history, iconic monuments, and vibrant culture.",
      "bestTimeToVisit": "October to March",
      "language": "Telugu, Urdu",
      "places": [
        {
          "id": "ramappa-temple",
          "name": "Ramappa Temple",
          "city": "Mulugu",
          "category": "Religious",
          "description": "A UNESCO World Heritage Site, it was built in 1213 AD during the reign of the Kakatiya Empire. The temple is named after its sculptor Ramappa, making it perhaps the only temple in India named after its architect.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "6:00 AM - 6:00 PM",
          "mapLink": "https://maps.google.com/?q=Ramappa+Temple+Mulugu",
          "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSorWI_yNA7lEEj52hGmeucx6FrMAMnbX7kfQ&s"],
          "nearbyAttractions": ["Ramappa Lake", "Warangal Fort"],
          "tags": ["UNESCO", "Kakatiya", "Architecture"],
          "rituals": ["Daily Pooja: 6:00 AM"],
          "festivals": ["Mahashivratri"],
          "dressCode": "Decent clothing."
        }
      ]
    },
    {
      "id": "delhi",
      "name": "Delhi",
      "capital": "New Delhi",
      "region": "North India",
      "tagline": "Dilwalon ki Dilli",
      "coverImage": "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
      "description": "Delhi is the capital city of India, a melting pot of cultures and history.",
      "bestTimeToVisit": "October to March",
      "language": "Hindi, English, Punjabi",
      "places": [
        {
          "id": "lotus-temple",
          "name": "Lotus Temple",
          "city": "New Delhi",
          "category": "Religious",
          "description": "A Baháʼí House of Worship that was dedicated in December 1986. Notable for its flowerlike shape, it has become a prominent attraction in the city.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free",
          "timings": "9:00 AM - 5:30 PM (Closed on Mondays)",
          "mapLink": "https://maps.google.com/?q=Lotus+Temple+New+Delhi",
          "images": ["https://images.unsplash.com/photo-1592639296346-560c37a0f711?w=600&q=80"],
          "nearbyAttractions": ["Kalkaji Mandir", "Iskcon Temple"],
          "tags": ["Bahai", "Architecture", "Peaceful"],
          "rituals": ["Silent Prayer & Meditation"],
          "festivals": ["Baháʼí Holy Days"],
          "dressCode": "Modest clothing. Maintain silence."
        },
        {
          "id": "akshardham-temple",
          "name": "Akshardham Temple",
          "city": "New Delhi",
          "category": "Religious",
          "description": "A Hindu temple, and a spiritual-cultural campus in Delhi, India. The temple displays millennia of traditional and modern Hindu culture, spirituality, and architecture.",
          "bestTimeToVisit": "October to March",
          "entryFee": "Free (Exhibitions are paid)",
          "timings": "10:00 AM - 6:30 PM (Closed on Mondays)",
          "mapLink": "https://maps.google.com/?q=Akshardham+Temple+New+Delhi",
          "images": ["https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80"],
          "nearbyAttractions": ["Yamuna Bank"],
          "tags": ["Swaminarayan", "Culture", "Architecture"],
          "rituals": ["Aarti: Morning & Evening", "Water Show: Evening"],
          "festivals": ["Diwali", "Annakut"],
          "dressCode": "Strict dress code. Shoulders, chest, navel, and upper arms must be covered. Bottom wear must be below knee length."
        }
      ]
    }
  ]
};

export const seedInitialData = async () => {
  const statesCollection = collection(db, 'states');
  const citiesCollection = collection(db, 'cities');
  const placesCollection = collection(db, 'places');

  // Clear existing data
  const clearCollection = async (collRef: any) => {
    const snapshot = await getDocs(collRef);
    const batch = writeBatch(db);
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  };

  console.log('Clearing existing data...');
  await Promise.all([
    clearCollection(statesCollection),
    clearCollection(citiesCollection),
    clearCollection(placesCollection)
  ]);

  console.log('Seeding new data...');
  for (const stateData of RAW_DATA.states) {
    const { places, ...stateInfo } = stateData;
    
    // Add state
    const stateDocRef = doc(db, 'states', stateInfo.id);
    await setDoc(stateDocRef, {
      name: stateInfo.name,
      capital: stateInfo.capital,
      region: stateInfo.region,
      tagline: stateInfo.tagline,
      imageUrl: stateInfo.coverImage,
      description: stateInfo.description,
      bestTimeToVisit: stateInfo.bestTimeToVisit,
      language: stateInfo.language,
      code: stateInfo.id.toUpperCase()
    });

    // Add places and cities
    const cityMap = new Map();

    for (const place of places) {
      // Handle city
      let cityId = place.city.toLowerCase().replace(/\s+/g, '-');
      if (!cityMap.has(cityId)) {
        const cityDocRef = doc(db, 'cities', cityId);
        await setDoc(cityDocRef, {
          name: place.city,
          stateId: stateInfo.id,
          imageUrl: place.images[0]
        });
        cityMap.set(cityId, true);
      }

      // Add place
      await addDoc(placesCollection, {
        name: place.name,
        stateId: stateInfo.id,
        cityId: cityId,
        category: place.category,
        description: place.description,
        bestTimeToVisit: place.bestTimeToVisit,
        entryFees: place.entryFee,
        timings: place.timings,
        locationUrl: place.mapLink,
        imageUrls: place.images,
        nearbyAttractions: place.nearbyAttractions,
        tags: place.tags,
        isFeatured: Math.random() > 0.7,
        rating: 4 + Math.random(),
        reviewsCount: Math.floor(Math.random() * 1000),
        rituals: (place as any).rituals || [],
        festivals: (place as any).festivals || [],
        dressCode: (place as any).dressCode || ''
      });
    }
  }

  console.log('Seeding completed!');
};
