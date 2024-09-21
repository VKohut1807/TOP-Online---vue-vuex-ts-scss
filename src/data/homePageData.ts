import {ref, Ref} from "vue";
import {Card} from "@/types/card-type";

export const cardData: Ref<Card[]> = ref([
  {
    index: 1,
    "class-name": "Voy",
    title: "Lance Voy",
    description:
      "In the fantastical world of Piratia, Lance Voy, a daring and intrepid explorer, navigates treacherous seas and uncharted lands in search of legendary treasures. Known for his unyielding courage and unmatched sailing skills, Lance uncovers ancient secrets and battles fearsome foes, all while forging alliances with mystical creatures and unraveling the mysteries of a forgotten era. His journey is a thrilling quest for both glory and truth, where every wave brings a new challenge and every discovery adds a chapter to his legendary saga.",
    route: "home",
    img: {
      src: "/images/lance-voy.webp",
      alt: "lance voy",
    },
  },
  {
    index: 2,
    "class-name": "Crusader",
    title: "Phyllis Crusader",
    description:
      "Phyllis Crusader, a fierce and cunning pirate with a heart as vast as the ocean, roams the treacherous waters of Piratia. Once a noble knight in a distant land, she turned to piracy after a betrayal that cost her everything. Now, she commands her ship with unparalleled skill, seeking vengeance and treasure while protecting her ragtag crew. Her reputation as both a savior and a fearsome adversary makes her a legend among pirates and a shadowy figure to those who cross her path.",
    route: "home",
    img: {
      src: "/images/phyllis-crusader.webp",
      alt: "phyllis crusader",
    },
  },
  {
    index: 3,
    "class-name": "Ami",
    title: "Ami Herbalist",
    description:
      "Ami, the skilled herbalist of Piratia, spent her days in the dense jungle, where the air was thick with the scent of wildflowers and ancient trees. With her knowledge of rare plants, she crafted powerful remedies that could heal even the gravest of wounds. One evening, as the sun set over the horizon, Ami discovered a mysterious glowing herb deep within the jungle. Sensing its immense power, she knew it could either be a cure for the island's growing darkness or a weapon in the wrong hands. Determined, she set off to protect it, unaware of the dangers lurking in the shadows.",
    route: "home",
    img: {
      src: "/images/ami-herbalist.webp",
      alt: "ami-herbalist",
    },
  },
]);
