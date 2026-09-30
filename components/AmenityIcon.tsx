import type { ComponentType, SVGProps } from "react";
import type { AmenityKey } from "@/data/properties";
import {
  IconAc,
  IconBbq,
  IconBeach,
  IconCrib,
  IconGarden,
  IconKayak,
  IconKitchen,
  IconParking,
  IconPets,
  IconPool,
  IconSeaView,
  IconSnorkel,
  IconTerrace,
  IconTv,
  IconWasher,
  IconWifi,
} from "./Icons";

const map: Record<AmenityKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  wifi: IconWifi,
  pool: IconPool,
  "sea-view": IconSeaView,
  beach: IconBeach,
  ac: IconAc,
  kitchen: IconKitchen,
  parking: IconParking,
  terrace: IconTerrace,
  bbq: IconBbq,
  washer: IconWasher,
  crib: IconCrib,
  pets: IconPets,
  kayak: IconKayak,
  snorkeling: IconSnorkel,
  garden: IconGarden,
  tv: IconTv,
};

export default function AmenityIcon({
  name,
  className,
}: {
  name: AmenityKey;
  className?: string;
}) {
  const Component = map[name];
  return <Component className={className} aria-hidden="true" />;
}
