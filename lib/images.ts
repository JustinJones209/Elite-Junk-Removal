/**
 * Site imagery, served from /public/photos.
 */

export const IMAGES = {
  // Portrait of Gus Morales, sales/manager at Call Me Gone Junk Removal.
  founder: {
    src: "/photos/gus.jpg",
    alt: "Gus Morales of Call Me Gone Junk Removal",
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
  },
  {
    label: "Storage Unit Cleanout",
    beforeSrc: "/photos/storage-before.png",
    afterSrc: "/photos/storage-after.png",
    beforeAlt: "Storage unit packed with furniture and boxes, before a cleanout",
    afterAlt: "The same storage unit emptied after a cleanout",
  },
  {
    label: "Yard Debris Haul",
    beforeSrc: "/photos/yard-before.png",
    afterSrc: "/photos/yard-after.png",
    beforeAlt: "Yard covered in branches and storm debris, before haul-off",
    afterAlt: "The same yard cleared after the debris was hauled off",
  },
] as const;
