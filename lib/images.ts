/**
 * Site imagery, served from /public/photos.
 */

export const IMAGES = {
  // Portrait of Gus Morales, sales/manager at Call Me Gone Junk Removal.
  founder: {
    src: "/photos/gus.jpg",
    alt: "Gus Morales of Call Me Gone Junk Removal",
    width: 2048,
    height: 2048,
  },
} as const;

/**
 * Before/after comparison photos for the slider.
 */
export const BEFORE_AFTER = [
  {
    label: "Garage Cleanout",
    beforeSrc: "/photos/garage-before.png",
    afterSrc: "/photos/garage-after.png",
    beforeAlt: "Garage packed with clutter, before a cleanout",
    afterAlt: "The same garage emptied and swept after a cleanout",
    width: 1672,
    height: 941,
  },
  {
    label: "Storage Unit Cleanout",
    beforeSrc: "/photos/storage-before.png",
    afterSrc: "/photos/storage-after.png",
    beforeAlt: "Storage unit packed with furniture and boxes, before a cleanout",
    afterAlt: "The same storage unit emptied after a cleanout",
    width: 1536,
    height: 1024,
  },
  {
    label: "Yard Debris Haul",
    beforeSrc: "/photos/yard-before.png",
    afterSrc: "/photos/yard-after.png",
    beforeAlt: "Yard covered in branches and storm debris, before haul-off",
    afterAlt: "The same yard cleared after the debris was hauled off",
    width: 1536,
    height: 1024,
  },
] as const;
