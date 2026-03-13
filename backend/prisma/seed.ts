import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// DiceBear Adventurer stili — karakter ismine göre deterministik avatar üretiyor,
// yani aynı isim her zaman aynı görseli veriyor
function avatarUrl(name: string): string {
  return `https://api.dicebear.com/9.x/adventurer/png?seed=${encodeURIComponent(name)}&size=256`;
}

const characters = [
  // ALIVE + MALE
  { name: 'Aldric Stormborn', status: 'ALIVE', gender: 'MALE', description: 'A fierce warrior from the northern highlands who commands lightning in battle.' },
  { name: 'Kael Ironforge', status: 'ALIVE', gender: 'MALE', description: 'Master blacksmith who forges enchanted weapons for the royal army.' },
  { name: 'Rylan Swiftblade', status: 'ALIVE', gender: 'MALE', description: 'A rogue duelist known for his unmatched speed and cunning tactics.' },

  // ALIVE + FEMALE
  { name: 'Seraphina Dawnlight', status: 'ALIVE', gender: 'FEMALE', description: 'High priestess of the Sun Temple who heals the wounded and shields the weak.' },
  { name: 'Elara Nightwhisper', status: 'ALIVE', gender: 'FEMALE', description: 'An elven ranger who moves silently through ancient forests tracking dark creatures.' },
  { name: 'Valeria Ashborne', status: 'ALIVE', gender: 'FEMALE', description: 'A fire mage whose flames have turned the tide of countless battles.' },

  // ALIVE + UNKNOWN gender
  { name: 'Zyx the Wanderer', status: 'ALIVE', gender: 'UNKNOWN', description: 'A shapeshifting entity from beyond the stars, observing mortal civilizations.' },
  { name: 'Orin Tidewalker', status: 'ALIVE', gender: 'UNKNOWN', description: 'An ancient water spirit who guards the coastal villages from sea monsters.' },

  // DEAD + MALE
  { name: 'Theron Blackwood', status: 'DEAD', gender: 'MALE', description: 'A fallen knight whose ghost still patrols the ruins of his castle.' },
  { name: 'Dorin Stonehammer', status: 'DEAD', gender: 'MALE', description: 'A dwarven king who perished defending the deep mines from a dragon invasion.' },
  { name: 'Fenn Greymantle', status: 'DEAD', gender: 'MALE', description: 'A court wizard who sacrificed himself to seal a portal to the shadow realm.' },

  // DEAD + FEMALE
  { name: 'Morgana Frostweave', status: 'DEAD', gender: 'FEMALE', description: 'An ice sorceress who fell in the final battle against the Flame Tyrant.' },
  { name: 'Liora Sunveil', status: 'DEAD', gender: 'FEMALE', description: 'A bard whose last song rallied the defenders before the walls were breached.' },

  // DEAD + UNKNOWN gender
  { name: 'Nebula Driftborn', status: 'DEAD', gender: 'UNKNOWN', description: 'A cosmic traveler whose essence scattered across the void after a failed ritual.' },
  { name: 'Quilyx the Silent', status: 'DEAD', gender: 'UNKNOWN', description: 'An ancient golem that shattered after completing its final directive.' },

  // UNKNOWN status + MALE
  { name: 'Phantom Wraith', status: 'UNKNOWN', gender: 'MALE', description: 'A shadowy figure seen in the borderlands whose true identity remains a mystery.' },
  { name: 'Corvin Ashfall', status: 'UNKNOWN', gender: 'MALE', description: 'A wandering scholar who disappeared after the great volcano erupted.' },

  // UNKNOWN status + FEMALE
  { name: 'Mirael the Veiled', status: 'UNKNOWN', gender: 'FEMALE', description: 'A masked oracle who appears at crossroads offering cryptic prophecies to travelers.' },
  { name: 'Sylvara Moonpetal', status: 'UNKNOWN', gender: 'FEMALE', description: 'A mysterious herbalist in the enchanted grove whose age and origins are debated.' },
  { name: 'Nyx Shadowmere', status: 'UNKNOWN', gender: 'FEMALE', description: 'A dark elf assassin whose allegiance shifts like the phases of the moon.' },

  // UNKNOWN status + UNKNOWN gender
  { name: 'The Architect', status: 'UNKNOWN', gender: 'UNKNOWN', description: 'A being of pure energy that designs impossible structures in the void between worlds.' },
  { name: 'Echo of Eternity', status: 'UNKNOWN', gender: 'UNKNOWN', description: 'A resonance in spacetime that manifests as a humanoid figure during cosmic events.' },

  // Extra characters for variety
  { name: 'Gareth Wolfclaw', status: 'ALIVE', gender: 'MALE', description: 'A lycanthrope hunter who uses his curse to protect villagers from feral beasts.' },
  { name: 'Isolde Thornheart', status: 'ALIVE', gender: 'FEMALE', description: 'A druid who communicates with plants and commands thorny vines in combat.' },
  { name: 'Prism Voidecho', status: 'ALIVE', gender: 'UNKNOWN', description: 'A crystalline being that refracts magical energy into devastating prismatic attacks.' },
];

async function main() {
  // her seed'de temiz başla — idempotent olması için
  await prisma.character.deleteMany();

  for (const char of characters) {
    await prisma.character.create({
      data: {
        ...char,
        image: avatarUrl(char.name),
      },
    });
  }

  console.log(`Seeded ${characters.length} characters`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
