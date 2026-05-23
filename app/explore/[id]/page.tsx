'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleData {
  id: string;
  title: string;
  category: string;
  image: string;
  fullContent: string;
  overview: string;
}

const ARTICLE_DATA: Record<string, ArticleData> = {
  'mercury-atmosphere': {
    id: 'mercury-atmosphere',
    title: 'Mercury: Atmosphere',
    category: 'Planet',
    image: '/mercury-circle.jpg',
    overview: 'Mercury has virtually no atmosphere.',
    fullContent: `Mercury is often surprising when discussing atmospheres because it has virtually no atmosphere. Any gases present are quickly lost to space due to Mercury's low gravity and proximity to the Sun.

Mercury's surface is constantly bombarded by solar wind and cosmic rays because there is no protective atmosphere to shield it. The exosphere of Mercury consists only of scattered atoms blown away from the surface by the solar wind.

The lack of atmosphere means Mercury has no weather patterns, no erosion from wind, and extreme temperature variations between its day and night sides. During the day, temperatures can reach 427°C (800°F), while at night they plummet to -173°C (-280°F).

This extreme environment makes Mercury one of the most hostile planets in our solar system for any form of life as we know it.`,
  },
  'mercury-temperature': {
    id: 'mercury-temperature',
    title: 'Mercury: Temperature Extremes',
    category: 'Planet',
    image: '/mercury-circle.jpg',
    overview: 'Mercury has extreme temperature variations.',
    fullContent: `Mercury exhibits the most extreme temperature variations of any planet in our solar system. This is primarily due to its lack of atmosphere to distribute heat and its close proximity to the Sun.

During Mercury's day side, which faces the Sun for extended periods, temperatures reach approximately 427°C (800°F). This is hot enough to melt lead. In contrast, the night side, which faces away from the Sun, plummets to -173°C (-280°F).

The reason for these extreme variations is Mercury's unique orbital and rotational characteristics. Mercury rotates very slowly - one Mercury day lasts 176 Earth days. Additionally, Mercury's orbit is highly elliptical, meaning its distance from the Sun varies significantly throughout its orbit.

These temperature extremes create a harsh environment where no known form of life could survive. The intense heat and radiation on the day side would destroy most materials, while the frigid temperatures on the night side would freeze most liquids.`,
  },
  'venus-surface': {
    id: 'venus-surface',
    title: 'Venus: Surface Conditions',
    category: 'Planet',
    image: '/venus-circle.jpg',
    overview: 'Venus has a surface temperature hot enough to melt lead.',
    fullContent: `Venus has the hottest surface temperature of any planet in our solar system, making it hotter than Mercury despite being farther from the Sun. The surface temperature on Venus is approximately 465°C (869°F), which is hot enough to melt lead.

This extreme heat is caused by a runaway greenhouse effect. Venus's thick atmosphere, composed mainly of carbon dioxide with clouds of sulfuric acid, traps heat from the Sun and prevents it from escaping back into space.

The atmospheric pressure on Venus's surface is approximately 92 times that of Earth's atmosphere at sea level. This crushing pressure, combined with the extreme heat, creates one of the most hostile environments in the solar system.

Despite its proximity to the Sun, Mercury is actually cooler than Venus on average. This demonstrates how atmospheric composition plays a crucial role in planetary temperatures. Venus serves as an extreme example of how greenhouse gases can trap heat and create uninhabitable conditions.`,
  },
  'venus-rotation': {
    id: 'venus-rotation',
    title: 'Venus: Retrograde Rotation',
    category: 'Planet',
    image: '/venus-circle.jpg',
    overview: 'Venus rotates backwards and slower than it orbits.',
    fullContent: `Venus exhibits one of the most unusual rotational characteristics in our solar system. It rotates backwards (retrograde) compared to most other planets, and it rotates so slowly that a single day on Venus is longer than a Venusian year.

Venus rotates in a retrograde direction, meaning it spins from east to west, opposite to the direction it orbits around the Sun. This is unique among the terrestrial planets. Scientists believe this may have resulted from a massive collision early in Venus's history.

One complete rotation of Venus takes approximately 243 Earth days, while one orbit around the Sun takes only 225 Earth days. This means that a day on Venus is actually 18 Earth days longer than its year.

Additionally, Venus rotates extremely slowly - so slowly that the Sun appears to move backwards across the sky from Venus's perspective. These unique characteristics make Venus one of the most fascinating planets to study and demonstrate the diverse ways planets can form and evolve.`,
  },
  'earth-biosphere': {
    id: 'earth-biosphere',
    title: 'Earth: The Biosphere',
    category: 'Planet',
    image: '/earth-circle.jpg',
    overview: 'Earth is home to millions of species.',
    fullContent: `Earth is the only known planet to harbor life, and its biosphere is incredibly diverse. Earth is home to millions of species, from microscopic bacteria to massive whales, representing an incredible variety of life forms.

The biosphere encompasses all living organisms and their interactions with each other and the physical environment. It includes the atmosphere, hydrosphere, and lithosphere where life exists. Life on Earth exists in nearly every environment, from the deepest ocean trenches to the highest mountains, from scorching deserts to frozen tundras.

Earth's biodiversity is the result of billions of years of evolution. Species have adapted to virtually every environment on the planet. This diversity is crucial for the stability and resilience of Earth's ecosystems.

However, human activity has significantly impacted Earth's biosphere in recent centuries. Deforestation, pollution, climate change, and habitat destruction have led to what many scientists call the sixth mass extinction event. Protecting Earth's biosphere and its incredible diversity is one of the greatest challenges facing humanity today.`,
  },
  'earth-moon': {
    id: 'earth-moon',
    title: 'Earth: Our Moon',
    category: 'Planet',
    image: '/earth-circle.jpg',
    overview: 'The Moon influences our tides and climate.',
    fullContent: `Earth has one natural satellite: the Moon, which has played a crucial role in Earth's development and continues to influence our planet today. The Moon is the fifth largest moon in the solar system and is only slightly smaller than Mercury.

The Moon was likely formed from a giant impact between Earth and a Mars-sized object early in our solar system's history. Over billions of years, the Moon has gradually moved away from Earth and continues to recede at a rate of about 3.8 centimeters per year.

The Moon's gravitational influence on Earth creates the tides. It also stabilizes Earth's axial tilt, which is crucial for maintaining relatively stable climate conditions. Without the Moon, Earth's climate would be much more extreme and potentially unable to support life as we know it.

The Moon has been a source of fascination and inspiration for humanity throughout history. It was the destination for the Apollo missions, which represent one of humanity's greatest achievements. Today, the Moon remains an important focus for future space exploration and potential settlement.`,
  },
  'mars-exploration': {
    id: 'mars-exploration',
    title: 'Mars: Exploration & Discovery',
    category: 'Planet',
    image: '/mars-circle.jpg',
    overview: 'Mars has been explored by numerous rovers and orbiters.',
    fullContent: `Mars has become the primary focus of planetary exploration in recent decades. Numerous rovers and orbiters have been sent to Mars to search for signs of past microbial life and to study the planet's geology and climate.

The Mars rovers, including NASA's Curiosity and Perseverance rovers, have provided invaluable data about Mars's surface composition, geology, and potential for past habitability. Curiosity has been exploring Mars since 2012, far exceeding its original mission duration. Perseverance, which landed in 2021, carries a small helicopter called Ingenuity and is collecting samples for potential future return to Earth.

These rovers have provided strong evidence that water once flowed on Mars's surface and that the planet may have once had conditions suitable for microbial life. This has made Mars a prime candidate in the search for extraterrestrial life.

Future missions to Mars are being planned by both government agencies like NASA and ESA, as well as private companies like SpaceX. The goal of many of these missions is to establish a human presence on Mars, potentially leading to permanent settlements. Mars represents the next frontier for human space exploration.`,
  },
  'mars-moons': {
    id: 'mars-moons',
    title: 'Mars: The Two Moons',
    category: 'Planet',
    image: '/mars-circle.jpg',
    overview: 'Mars has two small moons named Phobos and Deimos.',
    fullContent: `Mars has two small natural satellites: Phobos and Deimos. These moons are named after the Greek gods of fear and panic, children of Ares (Mars).

Phobos is the larger of the two moons and is remarkable for several reasons. It is only about 22 kilometers across at its widest point. Phobos orbits Mars so closely that it completes three orbits around Mars in a single Martian day. More remarkably, Phobos is gradually spiraling toward Mars and is expected to break apart within the next 50 million years, likely forming a ring around Mars.

Deimos is much smaller than Phobos, measuring only about 12 kilometers across. It orbits Mars at a much greater distance and takes about 30 Earth hours to complete one orbit. Deimos appears to move slowly across the Martian sky due to its distant orbit.

Both moons are believed to be captured asteroids rather than objects that formed with Mars. Their irregular shapes and cratered surfaces support this hypothesis. These two moons have fascinated astronomers for centuries and continue to be important targets for study by Mars-orbiting spacecraft.`,
  },
  'jupiter-redspot': {
    id: 'jupiter-redspot',
    title: 'Jupiter: The Great Red Spot',
    category: 'Gas Giant',
    image: '/jupiter-circle.jpg',
    overview: 'A storm larger than Earth that has persisted for centuries.',
    fullContent: `The Great Red Spot is one of the most distinctive features of Jupiter and the solar system. It is a persistent anticyclonic storm (high-pressure system) that is larger than Earth. The Great Red Spot has been observed for at least 350 years, making it one of the longest-lived storms in the solar system.

The Great Red Spot is approximately 16,000 kilometers wide at its current size, though it has been shrinking over time. It was larger during the 19th century, when it was observed to be about 40,000 kilometers across. The cause of the reddish color remains somewhat mysterious, though it is thought to be caused by chemical compounds in Jupiter's atmosphere.

Wind speeds within the Great Red Spot can exceed 360 kilometers per hour. The storm is confined by powerful jet streams on its northern and southern edges that help maintain its structure and prevent it from dissipating.

The Great Red Spot represents an ongoing system of atmospheric circulation on Jupiter. Studying this storm helps scientists understand atmospheric dynamics not only on Jupiter but also on Earth. Future missions to Jupiter will continue to monitor this fascinating phenomenon and help us understand how storms can persist for such extended periods.`,
  },
  'jupiter-moons': {
    id: 'jupiter-moons',
    title: 'Jupiter: The Galilean Moons',
    category: 'Gas Giant',
    image: '/jupiter-circle.jpg',
    overview: 'Jupiter has at least 79 known moons including four major ones.',
    fullContent: `Jupiter has the most extensive moon system of any planet in our solar system, with at least 79 known moons. The four largest moons, known as the Galilean moons, were discovered by Galileo Galilei in 1610 and are among the most geologically interesting bodies in the solar system.

The four Galilean moons are Io, Europa, Ganymede, and Callisto. Io is the most volcanically active body in the solar system, with hundreds of active volcanoes constantly reshaping its surface. Europa is particularly interesting because it is believed to harbor a subsurface ocean of liquid water beneath its icy crust, making it a prime candidate for the search for extraterrestrial life.

Ganymede is the largest moon of Jupiter and is actually larger than the planet Mercury. It also appears to have a subsurface ocean. Callisto is heavily cratered and geologically less active than the other three Galilean moons, but it too may harbor subsurface water.

The smaller moons of Jupiter are believed to be captured asteroids. Their discovery has been ongoing, with new moons being found regularly as telescope technology improves. The Jovian moon system serves as a complex miniature solar system, with diverse bodies exhibiting different geological processes and potentially diverse environments.`,
  },
};

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const router = useRouter();

  useEffect(() => {
    params.then(({ id }) => {
      const data = ARTICLE_DATA[id];
      if (data) {
        setArticle(data);
      }
    });
  }, [params]);

  if (!article) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-foreground/70">Article not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Back Button */}
        <div className="sticky top-0 bg-background/80 backdrop-blur z-10 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Link href="/explore">
              <Button variant="outline" className="gap-2">
                ← Back to Explore
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-96 w-full">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-8">
            <span className="text-primary font-semibold">{article.category}</span>
            <h1 className="text-5xl font-bold mt-4 mb-6 text-balance">{article.title}</h1>
            <p className="text-xl text-foreground/80 mb-8 text-balance">{article.overview}</p>
          </div>

          {/* Full Content */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              {article.fullContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-foreground/90 leading-relaxed mb-6 last:mb-0 text-balance">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Back to Explore CTA */}
          <div className="mt-12 text-center">
            <Link href="/explore">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore More Topics
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
