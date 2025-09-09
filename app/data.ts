export type AccordionItemType = {
  id: string;
  title: string;
  description: string;
  imagePath?: string;
  colors?: { name: string; code: string }[];
};

export const data: AccordionItemType[] = [
  {
    id: "colours",
    title: "Colours",
    description: "Available in four breathtaking colours. iPhone Air shown in",
    colors: [
      {
        name: "Sky Blue",
        code: "#edf8ff",
      },
      {
        name: "Light Gold",
        code: "#fffcf2",
      },
      {
        name: "Cloud White",
        code: "#ffffff",
      },
      {
        name: "Space Black",
        code: "#000000",
      },
    ],
  },
  {
    id: "titanium-frame",
    title: "Titanium frame",
    description:
      "A Grade 5 titanium frame built with 80 per cent recycled titanium makes iPhone Air as strong as it is stunning.",
  },
  {
    id: "innovative-internal-design",
    title: "Innovative internal design",
    description:
      "Multiple technologies are housed in the plateau of iPhone Air, maximising performance and creating space for a large, high‑density battery.",
    imagePath: "/images/internal-design.jpg",
  },
  {
    id: "immersive-pro-display",
    title: "Immersive pro display",
    description:
      "6.5‑inch Super Retina XDR display — our best ever.4 3,000 nits peak brightness. ProMotion up to 120Hz. And better anti‑reflection.",
  },
  {
    id: "ceramic-shield",
    title: "Ceramic Shield",
    description:
      "Protects the back of iPhone Air, making it 4x more resistant to cracks. New Ceramic Shield on the front has 3x better scratch resistance.",
  },
  {
    id: "camera-control",
    title: "Camera Control",
    description:
      "Instantly take a photo, record video, adjust settings and more. So you never miss a moment.",
  },
  {
    id: "action-button",
    title: "Action button",
    description:
      "A customisable fast track to your favourite feature. Long press to launch the action you want — Silent mode, Translation, Shortcuts and more.",
  },
  {
    id: "acces­sories",
    title: "Acces­sories",
    description:
      "The new Crossbody Strap lets you wear your iPhone Air hands‑free so you can go with the float.",
  },
] as const;
