/**
 * Site imagery. All photos below are real Call Me Gone Junk Removal jobs,
 * served from /public/photos.
 */

export const IMAGES = {
  // Real photo — Gus, sales/manager at Call Me Gone Junk Removal.
  founder: {
    src: "/photos/gus.jpg",
    alt: "Gus Morales of Call Me Gone Junk Removal",
  },
} as const;

/**
 * Before/after job examples for the comparison slider — all real jobs.
 */
export const BEFORE_AFTER = [
  {
    // Real job — garage cleanout.
    label: "Garage Cleanout",
    beforeSrc: "/photos/garage-before.png",
    afterSrc: "/photos/garage-after.png",
    beforeAlt: "Garage packed with clutter before Call Me Gone Junk Removal cleared it out",
    afterAlt: "The same garage cleared out and clean after Call Me Gone Junk Removal",
  },
  {
    // Real job — storage unit cleanout.
    label: "Storage Unit Cleanout",
    beforeSrc: "/photos/storage-before.png",
    afterSrc: "/photos/storage-after.png",
    beforeAlt: "Storage unit packed with furniture and boxes before Call Me Gone Junk Removal cleared it out",
    afterAlt: "The same storage unit completely empty and clean after Call Me Gone Junk Removal",
  },
  {
    // Real job — yard cleanout.
    label: "Yard Debris Haul",
    beforeSrc: "/photos/yard-before.png",
    afterSrc: "/photos/yard-after.png",
    beforeAlt: "Yard covered in branches and storm debris before haul-away",
    afterAlt: "Clean, cleared yard after Call Me Gone Junk Removal hauled off the debris",
  },
] as const;
