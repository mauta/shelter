const names = ['Bella', 'Coco', 'Max', 'Buddy', 'Daisy', 'Lola', 'Angel', 'Luna', 'Lucy ', 'Harley ', 'Charlie ', 'Pepper ', 'Shadow ', 'Gracie ', 'Jack ', 'Milo ', 'Rocky ',
  'Sadie ', 'Stella ', 'Nala ', 'Oliver ', 'Penny ', 'Ruby ', 'Chloe', 'Cleo ', 'Duke ', 'Ginger ', 'Molly ', 'Sophie ', 'Baby ', 'Bear ', 'Bailey ', 'Maggie ', 'Marley ', 'Oscar',
  'Peanut ', 'Lucky ', 'Abby ', 'Cooper ', 'Dexter ', 'Loki ', 'Oreo ', 'Sammy ', 'Tucker ', 'Belle ', 'Leo ', 'Louie ', 'Romeo ', 'Sam ', 'Sasha ', 'Bandit ', 'Emma ', 'Finn ',
  'Jake ', 'Jasper ', 'Kiwi ', 'Mia ', 'Scout ', 'Sunny ', 'Teddy ', 'Toby ', 'Willow ', 'Ariel ', 'Athena ', 'Bruce ', 'Dakota ', 'Diesel', 'Gizmo ', 'Honey ', 'Jax ', 'Lady ',
  'Minnie', 'Murphy ', 'Piper ', 'Rosie ', 'Simba ', 'Spike ', 'Sunshine ', 'Zeus ', 'Ziggy ', 'Ace ', 'Apollo ', 'Buster ', 'Cookie ', 'Frankie ', 'George ', 'Henry ', 'Izzy ',
  'Jackson ', 'Lulu ', 'Riley ', 'Thor ', 'Zoe  ', 'Barney ', 'Bentley ', 'Bruno ', 'Dixie ', 'Hank ', 'Hazel', 'Jade'
]

const types = ['Cat', 'Dog']

const breeds = ['Maine Coon', 'British Shorthair', 'Labrador', 'Doberman', 'Jack Russell Terrier']

const inoculations = ['bordetella bronchiseptica', 'none', 'none', 'none', 'none', 'none', 'leptospirosis', 'rabies', 'calicivirus', 'viral rhinotracheitis', 'panleukopenia', 'parainfluenza', 'none', 'parvovirus', 'adenovirus', 'distemper']

const diseases = ['deafness', 'blindness', 'none', 'kidney stones', 'none', 'none', 'none', 'none', 'none', 'none', 'none']

const parasites = ['lice', 'fleas', 'none', 'none', 'none', 'none', 'none', 'none']

const descriptions = [
  'This cute gay likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. He has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.',
  'I am a little shy at first, but very sweet when I am warms up. I like playing with shoe strings and bottle caps. I am quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.',
  'I am loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. I am a lot to say and wants a person to share his thoughts with.',
  'KI am a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.',
  'I am a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.',
  'I am a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.',
  'I am here and I am looking for my forever home to live out the best years of my life. I am full of energy. Everyday I am learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.', 'Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but would not hesitate to play up a storm in the house if she has all of her favorite toys.',
  'He’s mild mannered and really just wants to spend his time outside or laying next to you being pet. He is extremely low energy but has a lot of..',
  'She is the perfect combination of silly and sweet. She is eager to please, loves her human and dog companions, and believes she is a professional MMA wrestler in her spare time.',
  'I am a handsome sweetheart who loves people and melts for chin scratches!',
  'I am a friendly and laid back senior who enjoys chatting and being pet!'

]

let pets = []

for (let i = 1; i < 50; i++) {
  let pet = {}
  pet.id = `pet_${i}`
  pet.name = names[Math.floor(Math.random() * (names.length))]
  pet.breed = breeds[Math.floor(Math.random() * (breeds.length))]
  pet.description = descriptions[Math.floor(Math.random() * (descriptions.length))]
  pet.inoculations = inoculations[Math.floor(Math.random() * (inoculations.length))]
  pet.diseases = diseases[Math.floor(Math.random() * (diseases.length))]
  pet.parasites = parasites[Math.floor(Math.random() * (parasites.length))]
  pet.age = `${Math.floor(Math.random() * 5)} years ${Math.floor(Math.random() * 10)+1} months`
  pets.push(pet)
}

pets.map(el => (['Labrador', 'Doberman', 'Jack Russell Terrier'].indexOf(el.breed) !== -1 ? el.type = 'Dog' : el.type = 'Cat'))

pets.map(el => {
  switch (el.breed) {
    case 'Maine Coon':
      el.img = `../../assets/images/maine_${Math.floor(Math.random() *6)+1}.jpg`
      break
    case 'British Shorthair':
      el.img = `../../assets/images/british_${Math.floor(Math.random() *6)+1}.jpg`
      break
    case 'Labrador':
      el.img = `../../assets/images/labrador_${Math.floor(Math.random() *6)+1}.jpg`
      break
    case 'Doberman':
      el.img = `../../assets/images/doberman_${Math.floor(Math.random() *6)+1}.jpg`
      break
    case 'Jack Russell Terrier':
      el.img = `../../assets/images/jack_${Math.floor(Math.random() *6)+1}.jpg`
      break
  }
})

pets.map(el => el.age.includes('0 years') ? el.age = el.age.slice(7) : el.age = el.age)

let petsJSON = JSON.stringify(pets)



console.log(petsJSON)