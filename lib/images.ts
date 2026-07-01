/**
 * Site imagery. Real Elite Junk Removal photos live in /public/photos; the
 * remaining Unsplash entries are temporary placeholders awaiting real photos.
 */

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  // TODO(launch): PLACEHOLDER — replace with a real photo of Gus / the crew
  // loading the truck (drop it at /public/photos/hero.jpg and swap this line).
  hero: {
    src: unsplash("1558618666-fcd25c85cd64", 1400),
    alt: "Elite Junk Removal crew loading a hauling truck on a Tyler, Texas driveway",
  },
  // Real photo — Gus, owner of Elite Junk Removal.
  founder: {
    src: "/photos/gus.jpg",
    alt: "Gus Morales, owner of Elite Junk Removal",
  },
} as const;

/**
 * Before/after job examples for the comparison slider.
 * [PLACEHOLDER: replace each pair with real before/after job photos.]
 */
export const BEFORE_AFTER = [
  {
    // Real job — garage cleanout in East Texas.
    label: "Garage Cleanout — Tyler, TX",
    beforeSrc: "/photos/garage-before.png",
    afterSrc: "/photos/garage-after.png",
    beforeAlt: "Garage packed with clutter before Elite Junk Removal cleared it out",
    afterAlt: "The same garage cleared out and clean after Elite Junk Removal",
  },
  {
    label: "Living Room Cleanout — Whitehouse, TX",
    beforeSrc: unsplash("1416879595882-3373a0480b5b", 1000),
    afterSrc: unsplash("1493809842364-78817add7ffb", 1000),
    beforeAlt: "Room filled with unwanted furniture and clutter before removal",
    afterAlt: "Bright, tidy living room after junk removal",
  },
  {
    label: "Yard Debris Haul — Lindale, TX",
    beforeSrc: unsplash("1567016432779-094069958ea5", 1000),
    afterSrc: unsplash("1484154218962-a197022b5858", 1000),
    beforeAlt: "Yard covered in branches and storm debris before haul-away",
    afterAlt: "Clean, cleared yard after Elite Junk Removal hauled off the debris",
  },
] as const;
