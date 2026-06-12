import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient();


async function main() {
  // Clean DB
  await prisma.client.deleteMany();
  await prisma.consultation.deleteMany();
  await prisma.remedy.deleteMany();

  // 1. Create Mock Clients
  const c1 = await prisma.client.create({ data: { name: 'Rajesh Kumar', email: 'rajesh.k@example.com', phone: '+91 9876543210', dob: new Date('1985-05-15'), tob: '10:30', pob: 'Delhi', zodiacSign: 'Taurus', sunSign: 'Taurus', moonSign: 'Aries', risingSign: 'Cancer' } });
  const c2 = await prisma.client.create({ data: { name: 'Priya Sharma', email: 'priya.s@example.com', phone: '+91 8765432109', dob: new Date('1992-08-22'), tob: '14:15', pob: 'Mumbai', zodiacSign: 'Leo', sunSign: 'Leo', moonSign: 'Gemini', risingSign: 'Scorpio' } });
  const c3 = await prisma.client.create({ data: { name: 'Amit Singh', email: 'amit.s@example.com', phone: '+91 7654321098', dob: new Date('1988-11-05'), tob: '08:45', pob: 'Bangalore', zodiacSign: 'Scorpio', sunSign: 'Scorpio', moonSign: 'Virgo', risingSign: 'Sagittarius' } });
  const c4 = await prisma.client.create({ data: { name: 'Sneha Patel', email: 'sneha.p@example.com', phone: '+91 6543210987', dob: new Date('1995-02-14'), tob: '23:10', pob: 'Ahmedabad', zodiacSign: 'Aquarius', sunSign: 'Aquarius', moonSign: 'Libra', risingSign: 'Capricorn' } });
  const c5 = await prisma.client.create({ data: { name: 'Vikram Mehta', email: 'vikram.m@example.com', phone: '+91 5432109876', dob: new Date('1980-09-30'), tob: '18:20', pob: 'Pune', zodiacSign: 'Libra', sunSign: 'Libra', moonSign: 'Taurus', risingSign: 'Pisces' } });

  const indianNames = [
    'Aarav Sharma', 'Vivaan Gupta', 'Aditya Singh', 'Vihaan Patel', 'Arjun Reddy',
    'Sai Kumar', 'Ayaan Khan', 'Krishna Iyer', 'Ishaan Joshi', 'Shaurya Verma',
    'Atharva Deshmukh', 'Kabir Das', 'Rishi Kapoor', 'Karthik Nair', 'Dhruv Menon',
    'Ananya Tiwari', 'Aadhya Rao', 'Kiara Pandey', 'Diya Saxena', 'Pari Chauhan',
    'Isha Bhatia', 'Riya Malhotra', 'Navya Mehra', 'Myra Thakur', 'Aarohi Nambiar',
    'Kavya Chawla', 'Sanvi Ahluwalia', 'Sneha Pillai', 'Manya Kaur', 'Avni Sethi',
    'Pranav Dubey', 'Rohan Kulkarni', 'Aditi Yadav', 'Pooja Agarwal', 'Megha Jain',
    'Nikhil Bhatt', 'Siddharth Chatterjee', 'Aryan Bose', 'Nandini Sen', 'Karan Mukherjee',
    'Ritika Ghosh', 'Varun Dutta'
  ];

  const zodiacs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Surat'];

  // Create 42 more realistic clients to get to 47
  for (let i = 0; i < 42; i++) {
    const name = indianNames[i];
    const email = name.toLowerCase().replace(' ', '.') + '@example.com';
    const phone = `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`;
    const dob = new Date(1970 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const tob = `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;
    const pob = cities[Math.floor(Math.random() * cities.length)];
    const zodiacSign = zodiacs[Math.floor(Math.random() * zodiacs.length)];
    const sunSign = zodiacSign;
    const moonSign = zodiacs[Math.floor(Math.random() * zodiacs.length)];
    const risingSign = zodiacs[Math.floor(Math.random() * zodiacs.length)];

    await prisma.client.create({ data: { name, email, phone, dob, tob, pob, zodiacSign, sunSign, moonSign, risingSign } });
  }

  // 2. Create Mock Consultations for Today
  const today = new Date();
  today.setHours(10, 0, 0, 0);
  await prisma.consultation.create({ data: { clientId: c1.id, date: today, type: 'Kundli Reading', status: 'COMPLETED', revenue: 2500, notes: 'Focus on career progression.' } });
  
  const today2 = new Date();
  today2.setHours(12, 30, 0, 0);
  await prisma.consultation.create({ data: { clientId: c2.id, date: today2, type: 'Compatibility', status: 'SCHEDULED', revenue: 3500, notes: 'Marriage compatibility matching.' } });

  const today3 = new Date();
  today3.setHours(15, 0, 0, 0);
  await prisma.consultation.create({ data: { clientId: c3.id, date: today3, type: 'Tarot Session', status: 'SCHEDULED', revenue: 1500, notes: 'General guidance.' } });

  const today4 = new Date();
  today4.setHours(17, 0, 0, 0);
  await prisma.consultation.create({ data: { clientId: c4.id, date: today4, type: 'Palmistry', status: 'SCHEDULED', revenue: 2000 } });

  const today5 = new Date();
  today5.setHours(18, 30, 0, 0);
  await prisma.consultation.create({ data: { clientId: c5.id, date: today5, type: 'Kundli Reading', status: 'SCHEDULED', revenue: 2500 } });

  // Backfill revenue for the month (we need ~38500 total, we have 12000 so far. Need 26500 more).
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 5);
  await prisma.consultation.create({ data: { clientId: c1.id, date: lastWeek, type: 'Vastu Consultation', status: 'COMPLETED', revenue: 15000, paymentStatus: 'PAID' } });
  await prisma.consultation.create({ data: { clientId: c4.id, date: lastWeek, type: 'Gemstone Suggestion', status: 'COMPLETED', revenue: 11500, paymentStatus: 'PAID' } });

  // Historical data to bump "Total Revenue" to ~1,24,500 (we need 86000 more)
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  await prisma.consultation.create({ data: { clientId: c2.id, date: lastMonth, type: 'Vastu Consultation', status: 'COMPLETED', revenue: 45000, paymentStatus: 'PAID' } });
  
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  await prisma.consultation.create({ data: { clientId: c3.id, date: twoMonthsAgo, type: 'Full Life Reading', status: 'COMPLETED', revenue: 41000, paymentStatus: 'PAID' } });

  // Add an Unpaid pending consultation
  await prisma.consultation.create({ data: { clientId: c5.id, date: lastWeek, type: 'Tarot Session', status: 'COMPLETED', revenue: 4500, paymentStatus: 'UNPAID' } });

  // 3. Create Mock Remedies
  const ritika = await prisma.client.findFirst({ where: { name: 'Ritika Ghosh' } }) || c1;
  const priya = await prisma.client.findFirst({ where: { name: 'Priya Sharma' } }) || c2;
  const vikram = await prisma.client.findFirst({ where: { name: 'Vikram Mehta' } }) || c5;
  const karan = await prisma.client.findFirst({ where: { name: 'Karan Mukherjee' } }) || c1;
  const aryan = await prisma.client.findFirst({ where: { name: 'Aryan Bose' } }) || c1;

  await prisma.remedy.create({ data: { clientId: ritika.id, type: 'Gemstone', name: 'Wear Yellow Sapphire', status: 'ACTIVE' } });
  await prisma.remedy.create({ data: { clientId: priya.id, type: 'Mantra', name: 'Chant Gayatri Mantra', status: 'ACTIVE' } });
  await prisma.remedy.create({ data: { clientId: vikram.id, type: 'Fasting', name: 'Monday Fast for Shiva', status: 'ACTIVE' } });
  await prisma.remedy.create({ data: { clientId: karan.id, type: 'Puja', name: 'Perform Shani Puja', status: 'ACTIVE' } });
  await prisma.remedy.create({ data: { clientId: aryan.id, type: 'Ritual', name: 'Donate Black Cloth', status: 'ACTIVE' } });

  const randomRemedies = [
    { type: 'Gemstone', name: 'Wear Ruby for Sun' },
    { type: 'Mantra', name: 'Chant Mahamrityunjaya Mantra' },
    { type: 'Fasting', name: 'Thursday Fast for Jupiter' },
    { type: 'Puja', name: 'Navagraha Shanti Puja' },
    { type: 'Ritual', name: 'Offer water to Sun god' }
  ];
  const allClients = await prisma.client.findMany();
  for(let i = 0; i < 15; i++) {
    const rr = randomRemedies[Math.floor(Math.random() * randomRemedies.length)];
    const rc = allClients[Math.floor(Math.random() * allClients.length)];
    await prisma.remedy.create({ data: { clientId: rc.id, type: rr.type, name: rr.name, status: Math.random() > 0.3 ? 'ACTIVE' : 'COMPLETED' } });
  }

  console.log('Database seeded successfully!');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
