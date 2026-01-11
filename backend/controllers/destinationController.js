const destinations = [
    {
        id: 1,
        name: "Eiffel Tower",
        location: "Paris, France",
        description: "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
        bestTimeToVisit: "April–June, September–October",
    },
    {
        id: 2,
        name: "Taj Mahal",
        location: "Agra, India",
        description: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife, the Taj Mahal is the jewel of Muslim art in India.",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        bestTimeToVisit: "October–March",
    },
    {
        id: 3,
        name: "Machu Picchu",
        location: "Cusco Region, Peru",
        description: "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it’s renowned for its sophisticated dry-stone walls.",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        bestTimeToVisit: "May–September"
    },
    {
        id: 4,
        name: "Santorini",
        location: "Aegean Sea, Greece",
        description: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape.",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        bestTimeToVisit: "May–June, September"
    },
    {
        id: 5,
        name: "Grand Canyon",
        location: "Arizona, USA",
        description: "The Grand Canyon in Arizona is a natural formation distinguished by layered bands of red rock, revealing millions of years of geological history in cross-section.",
        image: "https://images.unsplash.com/photo-1527333656061-ca7adf608ae1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        bestTimeToVisit: "March–May, September–November"
    },
    {
        id: 6,
        name: "Colosseum",
        location: "Rome, Italy",
        description: "The Colosseum is an oval amphitheatre in the centre of the city of Rome, Italy, just east of the Roman Forum. It is the largest ancient amphitheatre ever built.",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        bestTimeToVisit: "April–June, September–October"
    },
    {
        id: 7,
        name: "Great Wall of China",
        location: "China",
        description: "The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups.",
        image: "https://images.unsplash.com/photo-1608037521277-154cd1b89191?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bestTimeToVisit: "April–May, September–Octobe"
    },
    {
        id: 8,
        name: "Pyramids of Giza",
        location: "Cairo, Egypt",
        description: "The Great Pyramid of Giza is the oldest and largest of the three pyramids in the Giza pyramid complex bordering present-day Giza in Greater Cairo, Egypt.",
        image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bestTimeToVisit: "October–April"
    },
    {
        id: 9,
        name: "Kyoto",
        location: "Japan",
        description: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        bestTimeToVisit: "March–April (Cherry Blossom), October–November (Autumn)"
    },
    {
        id: 10,
        name: "Petra",
        location: "Ma'an, Jordan",
        description: "Petra is a historical and archaeological city in southern Jordan. It is famous for its rock-cut architecture and water conduit system. Another name for Petra is the Rose City due to the color of the stone.",
        image: "https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bestTimeToVisit: "March–May, September–November"
    },
    {
        id: 11,
        name: "Statue of Liberty",
        location: "New York, USA",
        description: "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City, in the United States.",
        image: "https://images.unsplash.com/photo-1628353900470-0bd683a6946a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0YXR1ZSUyMG9mJTIwbGliZXJ0eXxlbnwwfHwwfHx8MA%3D%3D",
        bestTimeToVisit: "April–June, September–October"
    },
    {
        id: 12,
        name: "Sydney Opera House",
        location: "Sydney, Australia",
        description: "The Sydney Opera House is a multi-venue performing arts centre in Sydney. Located on the banks of the Sydney Harbour, it is often regarded as one of the 20th century's most famous and distinctive buildings.",
        image: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=3133&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bestTimeToVisit: "September–November, March–May"
    },
    {
        id: 13,
        name: "Jaipur City Palace",
        location: "Jaipur, India",
        description: "A magnificent blend of Rajasthani and Mughal architecture, the City Palace in Jaipur showcases royal courtyards, museums, and beautifully preserved palaces that reflect the grandeur of Rajasthan’s history.",
        image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1000&q=80",
        bestTimeToVisit: "October–March"
    },
    {
        id: 14,
        name: "Hawa Mahal",
        location: "Jaipur, India",
        description: "Known as the Palace of Winds, Hawa Mahal features a stunning pink sandstone façade with hundreds of small windows designed to allow royal women to observe street life unseen.",
        image: "https://images.unsplash.com/photo-1695395550316-8995ae9d35ff?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bestTimeToVisit: "October–March"
    },
    {
        id: 15,
        name: "Gateway of India",
        location: "Mumbai, India",
        description: "Overlooking the Arabian Sea, the Gateway of India is an iconic arch monument built during the British era, serving as a symbolic landmark and popular tourist attraction in Mumbai.",
        image: "https://images.unsplash.com/photo-1598434192043-71111c1b3f41?auto=format&fit=crop&w=1000&q=80",
        bestTimeToVisit: "November–February"
    },
    {
        id: 16,
        name: "Mysore Palace",
        location: "Mysuru, India",
        description: "One of the grandest palaces in India, Mysore Palace is renowned for its Indo-Saracenic architecture, intricate interiors, and spectacular illumination during festivals.",
        image: "https://images.unsplash.com/photo-1659126574791-13313aa424bd?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bestTimeToVisit: "October–February"
    },
    {
        id: 17,
        name: "Varanasi Ghats",
        location: "Varanasi, India",
        description: "Stretching along the sacred River Ganges, the Varanasi Ghats are a spiritual and cultural hub where rituals, ceremonies, and daily life blend into a timeless experience.",
        image: "https://images.unsplash.com/photo-1706186839147-0d708602587b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bestTimeToVisit: "October–March"
    }, 
    {
        id: 18,
        name: "Red Fort",
        location: "Delhi, India",
        description: "A UNESCO World Heritage Site, the Red Fort is a massive red sandstone fortress that served as the main residence of Mughal emperors and stands as a symbol of India’s rich history.",
        image: "https://images.unsplash.com/photo-1685790582503-1b2762d95407?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkJTIwZm9ydHxlbnwwfHwwfHx8MA%3D%3D",
        bestTimeToVisit: "October–March"
    },
    {
        id: 19,
        name: "Qutub Minar",
        location: "Delhi, India",
        description: "The tallest brick minaret in the world, Qutub Minar is an architectural masterpiece built in the early 13th century and surrounded by ancient monuments.",
        image: "https://images.unsplash.com/photo-1748500192752-6f3f441c2a51?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHF1dHViJTIwbWluYXJ8ZW58MHx8MHx8fDA%3D",
        bestTimeToVisit: "October–March"
    },
    {
        id: 20,
        name: "Golden Temple",
        location: "Amritsar, India",
        description: "The holiest shrine of Sikhism, the Golden Temple is known for its serene atmosphere, stunning golden façade, and the world’s largest free community kitchen.",
        image: "https://images.unsplash.com/photo-1609947017526-bd33c710b3a9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdvbGRlbiUyMHRlbXBsZXxlbnwwfHwwfHx8MA%3D%3D",
        bestTimeToVisit: "October–March"
    },
    {
        id: 21,
        name: "Meenakshi Temple",
        location: "Madurai, India",
        description: "An ancient Hindu temple famous for its towering gopurams covered in colorful sculptures, Meenakshi Temple is a vibrant center of South Indian culture and devotion.",
        image: "https://images.unsplash.com/photo-1732883247945-896e63ee644a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVlbmFrc2hpJTIwdGVtcGxlfGVufDB8fDB8fHww",
        bestTimeToVisit: "October–March"
    },
    {
        id: 22,
        name: "Ranthambore National Park",
        location: "Rajasthan, India",
        description: "One of India’s most famous wildlife reserves, Ranthambore is known for its Bengal tigers, scenic lakes, and ancient ruins scattered throughout the forest.",
        image: "https://images.unsplash.com/photo-1633939380243-2601544191c9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHJhbnRoYW1ib3JlJTIwbmF0aW9uYWwlMjBwYXJrfGVufDB8fDB8fHww",
        bestTimeToVisit: "October–April"
    },
    {
        id: 23,
        name: "Backwaters of Alleppey",
        location: "Kerala, India",
        description: "A tranquil network of canals and lagoons, Alleppey’s backwaters offer a peaceful escape with houseboat cruises, palm-lined shores, and scenic village life.",
        image: "https://images.unsplash.com/photo-1718821585734-e22a8fc425a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja3dhdGVycyUyMG9mJTIwYWxsZXBwZXl8ZW58MHx8MHx8fDA%3D",
        bestTimeToVisit: "October–March"
    },
    {
        id: 24,
        name: "Bali",
        location: "Indonesia",
        description: "Bali is a popular island destination known for its forested volcanic mountains, iconic rice terraces, beaches, and vibrant spiritual culture.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
        bestTimeToVisit: "April–October"
    },
    
    {
        id: 25,
        name: "Leh-Ladakh",
        location: "Ladakh, India",
        description: "A high-altitude desert region known for dramatic landscapes, Buddhist monasteries, and stunning mountain passes.",
        image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80",
        bestTimeToVisit: "June–September"
    },
    {
        id: 26,
        name: "Niagara Falls",
        location: "Ontario, Canada / New York, USA",
        description: "One of the most famous waterfalls in the world, Niagara Falls is renowned for its immense power and breathtaking beauty.",
        image: "https://plus.unsplash.com/premium_photo-1697730069404-280d3289650f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmlhZ2FyYSUyMGZhbGxzfGVufDB8fDB8fHww",
        bestTimeToVisit: "June–September"
    },
    {
        id: 27,
        name: "Rishikesh",
        location: "Uttarakhand, India",
        description: "Known as the Yoga Capital of the World, Rishikesh is a spiritual town on the banks of the Ganges, surrounded by Himalayan foothills.",
        image: "https://images.unsplash.com/photo-1720819029162-8500607ae232?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmlzaGlrZXNofGVufDB8fDB8fHww",
        bestTimeToVisit: "September–April"
    },
    {
        id: 28,
        name: "Dubai Burj Khalifa",
        location: "Dubai, UAE",
        description: "The Burj Khalifa is the tallest building in the world, offering breathtaking views of Dubai’s skyline from its observation decks.",
        image: "https://images.unsplash.com/photo-1582120031356-35f21bf61055?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVyaiUyMGtoYWxpZmF8ZW58MHx8MHx8fDA%3D",
        bestTimeToVisit: "November–March"
    }
];

// @desc    Get all popular destinations
// @route   GET /api/destinations
// @access  Public
const getDestinations = (req, res) => {
    res.json(destinations);
};

module.exports = {
    getDestinations
};
