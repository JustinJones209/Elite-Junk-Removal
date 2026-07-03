/**
 * Site imagery. Real Elite Junk Removal photos live in /public/photos; the
 * remaining Unsplash entries are temporary placeholders awaiting real photos.
 */

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  // Real photo — Gus, owner of Elite Junk Removal.
  founder: {
    src: "/photos/gus.jpg",
    alt: "Gus Morales, owner of Elite Junk Removal",
  },
} as const;

/**
 * Before/after job examples for the comparison slider. The first pair (real
 * garage cleanout photos) also doubles as the hero image up top.
 * [PLACEHOLDER: replace the remaining pairs with real before/after job photos.]
 */
export const BEFORE_AFTER = [
  {
    // Real job — garage cleanout.
    label: "Garage Cleanout",
    beforeSrc: "/photos/garage-before.png",
    afterSrc: "/photos/garage-after.png",
    beforeAlt: "Garage packed with clutter before Elite Junk Removal cleared it out",
    afterAlt: "The same garage cleared out and clean after Elite Junk Removal",
  },
  {
    label: "Living Room Cleanout",
    beforeSrc: unsplash("1416879595882-3373a0480b5b", 1000),
    afterSrc: unsplash("1493809842364-78817add7ffb", 1000),
    beforeAlt: "Room filled with unwanted furniture and clutter before removal",
    afterAlt: "Bright, tidy living room after junk removal",
  },
  {
    // Real job — yard cleanout.
    label: "Yard Debris Haul",
    beforeSrc: "/photos/yard-before.png",
    afterSrc: "/photos/yard-after.png",
    beforeAlt: "Yard covered in branches and storm debris before haul-away",
    afterAlt: "Clean, cleared yard after Elite Junk Removal hauled off the debris",
  },
] as const;
